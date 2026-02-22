"use client";

import Link from "next/link";
import TemplateKlasik from "@/components/TemplateKlasik";
import type { UndanganData } from "@/lib/types";

interface Props {
  data: UndanganData;
  url: string;
}

export default function ViewClient({ data, url }: Props) {
  return (
    <>
      {/* Toolbar - hidden when printing */}
      <div className="no-print bg-gray-800 text-white p-3 flex items-center justify-between gap-4">
        <Link href="/" className="text-sm hover:underline">
          ← Buat Undangan Baru
        </Link>
        <span className="text-sm opacity-70 hidden sm:block">
          ID: {data.id}
        </span>
        <button
          onClick={() => window.print()}
          className="bg-white text-gray-800 font-semibold text-sm px-4 py-1.5 rounded hover:bg-gray-100 transition-colors"
        >
          🖨 Cetak / Simpan PDF
        </button>
      </div>

      {/* Print area */}
      <div className="print-area flex justify-center bg-gray-200 min-h-screen py-6">
        <TemplateKlasik data={data} url={url} />
      </div>
    </>
  );
}
