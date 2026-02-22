import { notFound } from "next/navigation";
import { getUndangan } from "@/lib/storage";
import ViewClient from "./ViewClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ViewPage({ params }: Props) {
  const { id } = await params;
  const data = await getUndangan(id);
  if (!data) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const url = `${baseUrl}/v/${id}`;

  return <ViewClient data={data} url={url} />;
}
