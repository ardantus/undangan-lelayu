"use client";

import { QRCodeSVG } from "qrcode.react";
import type { UndanganData } from "@/lib/types";

interface Props {
  data: UndanganData;
  url: string;
}

export default function TemplateKlasik({ data, url }: Props) {
  return (
    <div
      id="template-klasik"
      className="relative bg-white text-gray-900 font-serif"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "20mm 18mm",
        boxSizing: "border-box",
        fontSize: "12pt",
        lineHeight: "1.6",
      }}
    >
      {/* Header ornament */}
      <div className="text-center mb-6">
        <div className="text-3xl mb-1">✦ ✦ ✦</div>
        <div className="text-xs uppercase tracking-widest text-gray-500">
          Innalillahi Wa Inna Ilaihi Raji&apos;un
        </div>
      </div>

      <hr className="border-gray-400 mb-6" />

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-wider mb-1">
          Berita Duka Cita
        </h1>
        <p className="text-sm text-gray-600">
          Dengan penuh keikhlasan kami menyampaikan bahwa telah berpulang ke
          Rahmatullah
        </p>
      </div>

      {/* Almarhum name */}
      <div className="text-center mb-8">
        <p className="text-base text-gray-700 mb-1">Almarhum / Almarhumah</p>
        <h2 className="text-3xl font-bold uppercase tracking-wide border-b-2 border-gray-400 inline-block pb-1 px-4">
          {data.nama}
        </h2>
        <p className="mt-2 text-gray-600">Usia {data.usia} Tahun</p>
      </div>

      {/* Details */}
      <div className="bg-gray-50 border border-gray-300 rounded p-4 mb-8">
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="py-1 pr-4 text-gray-600 w-36">Hari / Pasaran</td>
              <td className="py-1 pr-2">:</td>
              <td className="py-1 font-medium">
                {data.hari}, {data.pasaran}
              </td>
            </tr>
            <tr>
              <td className="py-1 pr-4 text-gray-600">Tanggal</td>
              <td className="py-1 pr-2">:</td>
              <td className="py-1 font-medium">
                {data.tanggal
                  ? new Date(data.tanggal).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Pilih tanggal"}
              </td>
            </tr>
            <tr>
              <td className="py-1 pr-4 text-gray-600">Pukul</td>
              <td className="py-1 pr-2">:</td>
              <td className="py-1 font-medium">{data.jam} WIB</td>
            </tr>
            <tr>
              <td className="py-1 pr-4 text-gray-600">Lokasi</td>
              <td className="py-1 pr-2">:</td>
              <td className="py-1 font-medium">{data.lokasi}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Family */}
      {data.keluarga.length > 0 && (
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-2 font-semibold uppercase tracking-wide">
            Yang Ditinggalkan:
          </p>
          <ul className="list-none pl-0 space-y-1">
            {data.keluarga.map((k, i) => (
              <li key={i} className="text-sm text-gray-800">
                {k}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Closing */}
      <div className="text-center mt-8 mb-4">
        <p className="text-sm text-gray-600 italic">
          &ldquo;Semoga Allah SWT menerima segala amal ibadahnya dan memberikan
          kelapangan di alam barzah.&rdquo;
        </p>
      </div>

      <hr className="border-gray-300 mt-4" />

      {/* QR Code */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center">
        <QRCodeSVG value={url} size={72} />
        <p className="text-xs text-gray-400 mt-1">Scan untuk detail</p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-8 text-xs text-gray-400">
        <p>ID: {data.id}</p>
      </div>
    </div>
  );
}
