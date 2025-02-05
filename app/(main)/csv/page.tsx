"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getRecords } from "@/utils/db";
import { Record } from "@/utils/types";
import Loader from "@/components/loader";

export default function CSV() {
  const { push } = useRouter();

  const convertToCSV = (data: Record[]) => {
    if (data.length === 0) return "";

    // Obtener los encabezados
    const headers = Object.keys(data[0]);

    // Crear filas de datos
    const rows = data.map((item) =>
      headers
        .map((header) => {
          let value = item[header];
          // Escapar comillas y manejar valores especiales
          value = String(value).replace(/"/g, '""');
          return `"${value}"`;
        })
        .join(",")
    );

    // Combinar encabezados y filas
    return [headers.join(","), ...rows].join("\n");
  };

  const downloadCSV = (csvContent: string, filename = "data.csv") => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    async function getData() {
      const data: Record[] = JSON.parse(localStorage.getItem("data-local"));
      // const data = await getRecords();
      downloadCSV(convertToCSV(data));
      push("/");
    }

    getData();
  }, []);

  return (
    <>
      <Loader />
    </>
  );
}
