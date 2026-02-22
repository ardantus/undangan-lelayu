import { notFound } from "next/navigation";
import { getUndangan } from "@/lib/storage";
import ViewClient from "./ViewClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = await getUndangan(id);
  if (!data) {
    return { title: "Undangan Tidak Ditemukan" };
  }

  const formattedName = data.nama.trim().replace(/\s+/g, '-');
  return {
    title: `${id}-${formattedName}`,
  };
}

export default async function ViewPage({ params }: Props) {
  const { id } = await params;
  const data = await getUndangan(id);
  if (!data) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const url = `${baseUrl}/v/${id}`;

  return <ViewClient data={data} url={url} />;
}
