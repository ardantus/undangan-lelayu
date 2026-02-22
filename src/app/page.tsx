"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import type { UndanganData, KeluargaEntry } from "@/lib/types";
import { PASARAN, TEMPLATES } from "@/lib/types";

const TemplateKlasik = dynamic(() => import("@/components/TemplateKlasik"), {
  ssr: false,
});

const TemplateModern = dynamic(() => import("@/components/TemplateModern"), {
  ssr: false,
});

const TemplateIndo = dynamic(() => import("@/components/TemplateIndo"), {
  ssr: false,
});

const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

interface FormState {
  nama: string;
  namaPengirim: string;
  usia: string;
  alamatRumah: string;
  hari: string;
  pasaran: string;
  tanggal: string;
  jam: string;
  lokasiDuka: string;
  hariMakam: string;
  pasaranMakam: string;
  tanggalMakam: string;
  jamMakam: string;
  lokasiMakam: string;
  template: "klasik" | "modern" | "indo";
}

const emptyForm: FormState = {
  nama: "",
  namaPengirim: "",
  usia: "",
  alamatRumah: "",
  hari: HARI[5], // Sabtu
  pasaran: PASARAN[1], // Pahing
  tanggal: "",
  jam: "",
  lokasiDuka: "",
  hariMakam: HARI[6], // Minggu
  pasaranMakam: PASARAN[2], // Pon
  tanggalMakam: "",
  jamMakam: "",
  lokasiMakam: "",
  template: "klasik",
};

const emptyKeluarga: KeluargaEntry = { nama: "", hubungan: "" };

export default function HomePage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [keluarga, setKeluarga] = useState<KeluargaEntry[]>([
    { ...emptyKeluarga },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(0.5);

  // A4 dimensions in px at 96dpi: 210mm ≈ 793.7px, 297mm ≈ 1122.5px
  const A4_WIDTH_PX = 793.7;
  const A4_RATIO = 297 / 210;

  useEffect(() => {
    const container = previewContainerRef.current;
    if (!container) return;
    const updateScale = () => {
      const containerWidth = container.clientWidth;
      // Cap at 0.75 so the entire A4 page is visible within the panel
      setPreviewScale(Math.min(containerWidth / A4_WIDTH_PX, 0.75));
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const previewData: UndanganData = {
    id: "preview",
    nama: form.nama || "Nyai. PAIJEM / MONTOREJO",
    namaPengirim: form.namaPengirim || "Kel. Bpk. Sugeng / Segenap Keluarga",
    usia: Number(form.usia) || 78,
    alamatRumah:
      form.alamatRumah ||
      "Ngelosari RT 05 Srimulyo, Piyungan, Bantul",
    hari: form.hari,
    pasaran: form.pasaran,
    tanggal: form.tanggal || "",
    jam: form.jam || "16.45",
    lokasiDuka:
      form.lokasiDuka ||
      "Griyo dugito, Ngelosari, Srimulyo, Piyungan, Bantul",
    hariMakam: form.hariMakam,
    pasaranMakam: form.pasaranMakam,
    tanggalMakam: form.tanggalMakam || "",
    jamMakam: form.jamMakam || "11.00",
    lokasiMakam:
      form.lokasiMakam ||
      "Makam Ngelosari, Srimulyo, Piyungan, Bantul",
    keluarga:
      keluarga.filter((k) => k.nama).length > 0
        ? keluarga.filter((k) => k.nama)
        : [
          { nama: "Rubicon / Sugeng Jerony", hubungan: "Anak/Menantu" },
          { nama: "Supraptinah", hubungan: "Anak" },
          { nama: "Suwitaningsih / Duryudono", hubungan: "Anak/Menantu" },
          { nama: "Zenal / Wiwit Sasih", hubungan: "Anak/Menantu" },
        ],
    template: form.template,
    createdAt: new Date().toISOString(),
  };

  const previewUrl =
    typeof window !== "undefined"
      ? window.location.origin + "/v/preview"
      : "/v/preview";

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

  const handleKeluargaChange = (
    index: number,
    field: keyof KeluargaEntry,
    value: string
  ) => {
    setKeluarga((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addKeluarga = () =>
    setKeluarga((prev) => [...prev, { ...emptyKeluarga }]);

  const removeKeluarga = (index: number) =>
    setKeluarga((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/undangan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          keluarga: keluarga.filter((k) => k.nama),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan");
      router.push(`/v/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const sectionTitle = "text-base font-semibold text-gray-800 mb-3 mt-5 border-b pb-1";

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Generator Pawartos Lelayu
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Data Almarhum/Almarhumah
              </h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Template Selection */}
                <div>
                  <label className={labelClass}>Pilih Template *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TEMPLATES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, template: t.id }))}
                        className={`border rounded-lg p-3 text-left transition-all ${form.template === t.id
                          ? "border-gray-800 bg-gray-50 ring-2 ring-gray-800"
                          : "border-gray-200 hover:border-gray-400"
                          }`}
                      >
                        <div className="font-semibold text-sm">{t.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Nama */}
                <div>
                  <label className={labelClass}>Nama Almarhum *</label>
                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Nyai. PAIYEM / MITROREJO"
                    className={inputClass}
                  />
                </div>

                {/* Nama Pengirim */}
                <div>
                  <label className={labelClass}>Nama Pengirim Surat Lelayu *</label>
                  <input
                    type="text"
                    name="namaPengirim"
                    value={form.namaPengirim}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Kel. Bpk. Sugeng / Segenap Keluarga"
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-500 mt-1">Yang mengirim surat lelayu saking ingkang pidalem</p>
                </div>

                {/* Usia */}
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

                {/* Alamat Rumah */}
                <div>
                  <label className={labelClass}>Alamat Rumah Almarhum *</label>
                  <input
                    type="text"
                    name="alamatRumah"
                    value={form.alamatRumah}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Ngelosari RT 05 Srimulyo, Piyungan, Bantul"
                    className={inputClass}
                  />
                </div>

                {/* ===== SECTION: Info Wafat ===== */}
                <h3 className={sectionTitle}>Info Wafat</h3>

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
                  <label className={labelClass}>Tanggal Wafat *</label>
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
                  <label className={labelClass}>Jam Wafat *</label>
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
                  <label className={labelClass}>Lokasi Rumah Duka *</label>
                  <input
                    type="text"
                    name="lokasiDuka"
                    value={form.lokasiDuka}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Griyo dugito, Ngelosari, Srimulyo, Piyungan, Bantul"
                    className={inputClass}
                  />
                </div>

                {/* ===== SECTION: Info Pemakaman ===== */}
                <h3 className={sectionTitle}>Info Pemakaman</h3>

                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className={labelClass}>Hari Makam *</label>
                    <select
                      name="hariMakam"
                      value={form.hariMakam}
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
                      name="pasaranMakam"
                      value={form.pasaranMakam}
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
                  <label className={labelClass}>Tanggal Pemakaman *</label>
                  <input
                    type="date"
                    name="tanggalMakam"
                    value={form.tanggalMakam}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Jam Pemakaman *</label>
                  <input
                    type="time"
                    name="jamMakam"
                    value={form.jamMakam}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Lokasi Makam *</label>
                  <input
                    type="text"
                    name="lokasiMakam"
                    value={form.lokasiMakam}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Makam Ngelosari, Srimulyo, Piyungan, Bantul"
                    className={inputClass}
                  />
                </div>

                {/* ===== SECTION: Keluarga ===== */}
                <h3 className={sectionTitle}>Daftar Keluarga</h3>

                {keluarga.map((k, i) => (
                  <div key={i} className="flex gap-2 items-end">
                    <div className="flex-1">
                      {i === 0 && (
                        <label className={labelClass}>Nama</label>
                      )}
                      <input
                        type="text"
                        value={k.nama}
                        onChange={(e) =>
                          handleKeluargaChange(i, "nama", e.target.value)
                        }
                        placeholder="Nama / Nama Pasangan"
                        className={inputClass}
                      />
                    </div>
                    <div className="w-32">
                      {i === 0 && (
                        <label className={labelClass}>Hubungan</label>
                      )}
                      <input
                        type="text"
                        value={k.hubungan}
                        onChange={(e) =>
                          handleKeluargaChange(i, "hubungan", e.target.value)
                        }
                        placeholder="Anak/Menantu"
                        className={inputClass}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeKeluarga(i)}
                      className="text-red-500 hover:text-red-700 text-lg pb-2"
                      title="Hapus"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addKeluarga}
                  className="text-sm text-blue-600 hover:underline"
                >
                  + Tambah Keluarga
                </button>

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
              <div
                ref={previewContainerRef}
                style={{
                  position: "relative",
                  width: "100%",
                  height: `${previewScale * A4_WIDTH_PX * A4_RATIO}px`,
                  maxHeight: "85vh",
                  overflowY: "auto",
                  overflowX: "hidden",
                  background: "#e5e7eb",
                  borderRadius: "4px",
                }}
              >
                <div
                  style={{
                    transformOrigin: "top left",
                    transform: `scale(${previewScale})`,
                    width: "210mm",
                    position: "absolute",
                    top: 0,
                    left: `${Math.max(0, ((previewContainerRef.current?.clientWidth ?? 0) - previewScale * A4_WIDTH_PX) / 2)}px`,
                  }}
                >
                  {form.template === "modern" ? (
                    <TemplateModern data={previewData} url={previewUrl} />
                  ) : form.template === "indo" ? (
                    <TemplateIndo data={previewData} url={previewUrl} />
                  ) : (
                    <TemplateKlasik data={previewData} url={previewUrl} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
