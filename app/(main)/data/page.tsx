'use client';

import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const STORAGE_KEY = "registrosParticipantes";

type RegistroData = {
  userId: string;
  nombre: string;
  score: number;
  createdAt: string;
};

const RegistrosPage = () => {
  const [registros, setRegistros] = useState<RegistroData[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        try {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed)) {
            setRegistros(parsed);
          }
        } catch (err) {
          console.error('Error parsing registros:', err);
        }
      }
    }
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(registros);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registros');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'registros_participantes.xlsx');
  };

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Registros de Participantes</h1>
        {registros.length === 0 ? (
            <p>No hay registros disponibles.</p>
            ) : (
            <>
                <div className="max-h-[600px] overflow-y-auto rounded-md shadow-inner border border-gray-700">
                <table className="min-w-full bg-gray-800">
                    <thead className="sticky top-0 bg-gray-700 z-10">
                    <tr>
                        <th className="px-4 py-2 border border-gray-600">#</th>
                        <th className="px-4 py-2 border border-gray-600">Nombre</th>
                        <th className="px-4 py-2 border border-gray-600">User ID</th>
                        <th className="px-4 py-2 border border-gray-600">Score</th>
                        <th className="px-4 py-2 border border-gray-600">Fecha</th>
                    </tr>
                    </thead>
                    <tbody>
                    {registros.map((registro, index) => (
                        <tr key={registro.userId} className="hover:bg-gray-700">
                        <td className="px-4 py-2 border border-gray-600">{index + 1}</td>
                        <td className="px-4 py-2 border border-gray-600">{registro.nombre}</td>
                        <td className="px-4 py-2 border border-gray-600">{registro.userId}</td>
                        <td className="px-4 py-2 border border-gray-600">{registro.score}</td>
                        <td className="px-4 py-2 border border-gray-600">
                            {new Date(registro.createdAt).toLocaleString()}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>

                <button
                onClick={exportToExcel}
                className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
                >
                Descargar Excel
                </button>
            </>
            )}


    </div>
  );
};

export default RegistrosPage;
