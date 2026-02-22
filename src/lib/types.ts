export interface KeluargaEntry {
  nama: string;
  hubungan: string;
}

export interface UndanganData {
  id: string;
  nama: string;
  usia: number;
  alamatRumah: string;   // Alamat lengkap almarhum (dusun, RT/RW, desa, kec, kab)
  // Info wafat
  hari: string;
  pasaran: string;
  tanggal: string;
  jam: string;
  lokasiDuka: string;    // Tempat persemayaman / rumah duka
  // Info pemakaman
  hariMakam: string;
  pasaranMakam: string;
  tanggalMakam: string;
  jamMakam: string;
  lokasiMakam: string;   // Nama makam
  // Template
  template: "klasik" | "modern";
  // Keluarga
  keluarga: KeluargaEntry[];
  createdAt: string;
}

export const PASARAN = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"] as const;
export type Pasaran = (typeof PASARAN)[number];

export const TEMPLATES = [
  { id: "klasik" as const, label: "Klasik", desc: "Tampilan polos tradisional" },
  { id: "modern" as const, label: "Modern", desc: "Dengan border dekoratif" },
] as const;
