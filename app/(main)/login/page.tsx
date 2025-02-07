"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loader from "@/components/loader";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { configVariables } from "@/configVariables";
import { useRouter } from "next/navigation";

export default function RegisterExperiencePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(1);
  const { push } = useRouter();

  const [formData, setFormData] = useState({ id1: "", id2: "", score: "" });
  const [eventParams, setEventParams] = useState(null);

  const { toast } = useToast();

  const [isReadyId, setIsReadyId] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const id1Ref = useRef(null);
  const id2Ref = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    if (value.length > 3) return;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value.toUpperCase() };

      if (name === "id1" && value.length === 3) {
        id2Ref.current?.focus();
      }

      return updatedData;
    });
  }

  useEffect(() => {
    if (currentScreen === 1) {
      id1Ref.current?.focus();
    }
  }, [currentScreen]);

  useEffect(() => {
    if (formData.id1 !== "" && formData.id2 !== "") setIsReadyId(true);

    const allFieldsFilled = Object.values(formData).every(
      (field) => field.trim() !== ""
    );
    setIsReady(allFieldsFilled);
  }, [formData]);

  useEffect(() => {
    async function getEventParams() {
      const eventParams = await axios.get(
        `${configVariables.baseUrl}/api/events/check/${configVariables.databaseId}`
      );

      setEventParams(eventParams.data);
    }

    getEventParams();
  }, []);

  function resetForm() {
    setFormData({ id1: "", id2: "", score: "" });
  }

  async function registerUserScore() {
    setIsLoading(true);

    await axios.post(
      `${configVariables.baseUrl}/api/users/participation/${configVariables.databaseId}/${configVariables.eventName}`,
      {
        userId: formData.id1 + formData.id2,
        newScore: parseInt(formData.score),
        experienceName: "trivia",
      }
    );

    setCurrentScreen(0);
    resetForm();
    setIsLoading(false);
  }

  async function checkUserParticipation() {
    try {
      setIsLoading(true);

      const checkUser = await axios.post(
        `${configVariables.baseUrl}/api/users/check/${configVariables.databaseId}/${configVariables.eventName}`,
        {
          userId: formData.id1 + formData.id2,
          experienceName: "trivia",
        }
      );

      setIsLoading(false);

      if (checkUser.data.notRegistered) {
        toast({
          title: "Este ID no existe",
          description: "Por favor registrate en el evento",
        });

        return;
      }

      if (checkUser.data.alreadyRegistered) {
        toast({
          title: "Parece que ya participaste en esta experiencia. ¡Gracias!",
        });
      } else {
        if (
          eventParams &&
          eventParams.participationExperiences.includes("trivia")
        ) {
          await axios.post(
            `${configVariables.baseUrl}/api/users/participation/${configVariables.databaseId}/${configVariables.eventName}`,
            {
              userId: formData.id1 + formData.id2,
              newScore: eventParams.participationScore,
              experienceName: "trivia",
            }
          );
          setCurrentScreen(0);
          resetForm();
          return;
        }

        push("/trivia");
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Ups algo salió mal",
        description: "Intenta nuevamente",
      });
      return;
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {currentScreen !== 0 && (
        <div className="score-background w-screen h-screen flex justify-center items-center">
          <div className="flex flex-col">
            {currentScreen === 1 && (
              <div className="flex flex-col justify-center items-center">
                <h2 className="telegraf-bold text-white text-[120px]">
                  Agrega ID
                </h2>
                <div className="telegraf-bold flex items-center text-[#DEF44B] text-[80px] gap-3 mb-10">
                  <input
                    type="text"
                    id="id1"
                    name="id1"
                    autoComplete="off"
                    value={formData.id1}
                    className="w-[230px] bg-white/30 border-[3px] rounded-[16px] text-center pt-3"
                    onChange={handleChange}
                    ref={id1Ref}
                    maxLength={3}
                  />
                  <img src="/dash.svg" className="w-[36px] h-[10px]" alt="" />
                  <input
                    type="text"
                    id="id2"
                    name="id2"
                    autoComplete="off"
                    value={formData.id2}
                    className="w-[230px] bg-white/30 border-[3px] rounded-[16px] text-center pt-3"
                    onChange={handleChange}
                    ref={id2Ref}
                    maxLength={3}
                  />
                </div>
                <button
                  className="relative top-[60px] w-[850px] h-[100px] text-[50px] bg-transparent "
                  disabled={!isReadyId}
                  onClick={checkUserParticipation}
                ></button>
              </div>
            )}
            {/* {currentScreen === 2 && (
              <div className="flex flex-col justify-center items-center">
                <h2 className="telegraf-bold text-white text-[100px]">
                  ¡Agrega tu puntaje!
                </h2>
                <div className="telegraf-bold flex items-center text-[#DEF44B] text-[80px] gap-3 mb-10">
                  <input
                    type="number"
                    id="score"
                    name="score"
                    autoComplete="off"
                    value={formData.score}
                    className="w-[381px] bg-white/30 border-[3px] rounded-[16px] text-center pt-3"
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="telegraf-bold text-[38px] w-[346px] rounded-[16px] bg-[#DEF44B] py-1"
                  disabled={!isReady}
                  onClick={registerUserScore}
                >
                  Guardar
                </button>
              </div>
            )} */}
          </div>
        </div>
      )}
      {isLoading && <Loader />}
      <Toaster />
    </div>
  );
}
