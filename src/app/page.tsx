"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import type { UndanganData } from "@/lib/types";
import { PASARAN } from "@/lib/types";

const TemplateKlasik = dynamic(() => import("@/components/TemplateKlasik"), {
  ssr: false,
});

const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

const emptyForm = {
  nama: "",
  usia: "",
  hari: HARI[0],
  pasaran: PASARAN[0],
  tanggal: "",
  jam: "",
  lokasi: "",
  keluargaRaw: "",
};

export default function HomePage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const previewData: UndanganData = {
    id: "preview",
    nama: form.nama || "Nama Almarhum",
    usia: Number(form.usia) || 0,
    hari: form.hari,
    pasaran: form.pasaran,
    tanggal: form.tanggal || "",
    jam: form.jam || "--:--",
    lokasi: form.lokasi || "Lokasi pemakaman",
    keluarga: form.keluargaRaw ? form.keluargaRaw.split("\n").filter(Boolean) : [],
    createdAt: new Date().toISOString(),
  };

  const previewUrl =
    typeof window !== "undefined" ? window.location.origin + "/v/preview" : "/v/preview";

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const keluarga = form.keluargaRaw.split("\n").filter(Boolean);
      const res = await fetch("/api/undangan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, keluarga }),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");
      const { id } = await res.json();
      router.push(`/v/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Generator Lelayu
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Data Almarhum/Almarhumah
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={labelClass}>
                    Nama Almarhum / Almarhumah *
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    required
                    placeholder="Nama lengkap"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Usia *</label>
                  <input
                    type="number"
                    name="usia"
                    value={form.usia}
                    onChange={handleChange}
                    required
                    min={0}
                    max={150}
                    placeholder="Usia dalam tahun"
                    className={inputClass}
                  />
                </div>

                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className={labelClass}>Hari *</label>
                    <select
                      name="hari"
                      value={form.hari}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      {HARI.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className={labelClass}>Pasaran *</label>
                    <select
                      name="pasaran"
                      value={form.pasaran}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      {PASARAN.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Tanggal *</label>
                  <input
                    type="date"
                    name="tanggal"
                    value={form.tanggal}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Jam *</label>
                  <input
                    type="time"
                    name="jam"
                    value={form.jam}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Lokasi *</label>
                  <input
                    type="text"
                    name="lokasi"
                    value={form.lokasi}
                    onChange={handleChange}
                    required
                    placeholder="Alamat pemakaman / tempat"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Daftar Keluarga{" "}
                    <span className="text-gray-400 font-normal">
                      (satu per baris)
                    </span>
                  </label>
                  <textarea
                    name="keluargaRaw"
                    value={form.keluargaRaw}
                    onChange={handleChange}
                    rows={4}
                    placeholder={"Contoh:\nBapak Sutrisno (Suami)\nRina Dewi (Anak)"}
                    className={inputClass}
                  />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  {loading ? "Menyimpan..." : "Simpan & Lihat Undangan"}
                </button>
              </form>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:flex-1 overflow-hidden">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Pratinjau
              </h2>
              <div className="overflow-auto">
                <div
                  style={{
                    transformOrigin: "top left",
                    transform: "scale(0.65)",
                    width: "210mm",
                  }}
                >
                  <TemplateKlasik data={previewData} url={previewUrl} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
