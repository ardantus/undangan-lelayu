import { NextRequest, NextResponse } from "next/server";
import { generateId } from "@/lib/nanoid";
import { saveUndangan, getUndangan } from "@/lib/storage";
import type { UndanganData } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const required = [
      "nama", "namaPengirim", "usia", "alamatRumah",
      "hari", "pasaran", "tanggal", "jam", "lokasiDuka",
      "hariMakam", "pasaranMakam", "tanggalMakam", "jamMakam", "lokasiMakam",
    ] as const;
    for (const field of required) {
      if (body[field] === undefined || body[field] === null || body[field] === "") {
        return NextResponse.json(
          { error: `Field '${field}' diperlukan` },
          { status: 400 }
        );
      }
    }
    const usia = Number(body.usia);
    if (isNaN(usia) || usia < 0 || usia > 150) {
      return NextResponse.json({ error: "Usia tidak valid" }, { status: 400 });
    }

    const id = generateId();
    const data: UndanganData = {
      id,
      nama: String(body.nama),
      usia,
      alamatRumah: String(body.alamatRumah),
      hari: String(body.hari),
      pasaran: String(body.pasaran),
      tanggal: String(body.tanggal),
      jam: String(body.jam),
      lokasiDuka: String(body.lokasiDuka),
      hariMakam: String(body.hariMakam),
      pasaranMakam: String(body.pasaranMakam),
      tanggalMakam: String(body.tanggalMakam),
      jamMakam: String(body.jamMakam),
      lokasiMakam: String(body.lokasiMakam),
      namaPengirim: body.namaPengirim ? String(body.namaPengirim) : undefined,
      keluarga: Array.isArray(body.keluarga) ? body.keluarga : [],
      template: body.template === "modern" ? "modern" : body.template === "indo" ? "indo" : "klasik",
      createdAt: new Date().toISOString(),
    };
    await saveUndangan(data);
    return NextResponse.json({ id });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Gagal menyimpan data";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID diperlukan" }, { status: 400 });
  }
  try {
    const data = await getUndangan(id);
    if (!data) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Gagal mengambil data";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
