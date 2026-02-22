"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import type { UndanganData } from "@/lib/types";

const TemplateKlasik = dynamic(() => import("@/components/TemplateKlasik"), {
  ssr: false,
});

const TemplateModern = dynamic(() => import("@/components/TemplateModern"), {
  ssr: false,
});

interface Props {
  data: UndanganData;
  url: string;
}

export default function ViewClient({ data, url }: Props) {
  const SelectedTemplate =
    data.template === "modern" ? TemplateModern : TemplateKlasik;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Berita Lelayu: ${data.nama}`,
          text: `Telah berpulang ke Rahmatullah: ${data.nama}. Berikut informasi lelayu:`,
          url: url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link berhasil disalin ke clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
        alert("Gagal menyalin link");
      }
    }
  };

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
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="bg-blue-600 text-white font-semibold text-sm px-4 py-1.5 rounded hover:bg-blue-700 transition-colors"
          >
            🔗 Bagikan
          </button>
          <button
            onClick={() => window.print()}
            className="bg-white text-gray-800 font-semibold text-sm px-4 py-1.5 rounded hover:bg-gray-100 transition-colors"
          >
            🖨 Cetak / Simpan PDF
          </button>
        </div>
      </div>

      {/* Print area */}
      <div className="print-area flex justify-center bg-gray-200 min-h-screen py-6">
        <SelectedTemplate data={data} url={url} />
      </div>
    </>
  );
}
