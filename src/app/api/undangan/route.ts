import { NextRequest, NextResponse } from "next/server";
import { generateId } from "@/lib/nanoid";
import { saveUndangan, getUndangan } from "@/lib/storage";
import type { UndanganData } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const required = ["nama", "usia", "hari", "pasaran", "tanggal", "jam", "lokasi"] as const;
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
      hari: String(body.hari),
      pasaran: String(body.pasaran),
      tanggal: String(body.tanggal),
      jam: String(body.jam),
      lokasi: String(body.lokasi),
      keluarga: Array.isArray(body.keluarga) ? body.keluarga : [],
      createdAt: new Date().toISOString(),
    };
    await saveUndangan(data);
    return NextResponse.json({ id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
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
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}
