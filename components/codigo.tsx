// ✅ ESTE archivo NO tiene 'use client'
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CodigoPage() {
    const searchParams = useSearchParams();
    const codigo = searchParams.get('code');
  return (
       <div
                    className="oracle-regular font-normal text-[60px] h-[100px] w-full px-6 text-black bg-[url('/assets/CampoVacio.png')] bg-no-repeat bg-center bg-cover rounded-3xl border-[2px] border-black mt-[10px] flex items-center">
                    {codigo || "TU ID"}
                </div>
  );
}
