import { notFound } from "next/navigation";
import { getUndangan } from "@/lib/storage";
import ViewClient from "./ViewClient";

interface Props {
  params: { id: string };
}

export default async function ViewPage({ params }: Props) {
  const data = await getUndangan(params.id);
  if (!data) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const url = `${baseUrl}/v/${params.id}`;

  return <ViewClient data={data} url={url} />;
}
