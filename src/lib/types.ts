export interface UndanganData {
  id: string;
  nama: string;
  usia: number;
  hari: string;
  pasaran: string;
  tanggal: string;
  jam: string;
  lokasi: string;
  keluarga: string[];
  createdAt: string;
}

export const PASARAN = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"] as const;
export type Pasaran = (typeof PASARAN)[number];
