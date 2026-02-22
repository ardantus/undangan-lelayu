"use client";

import type { UndanganData } from "@/lib/types";

interface Props {
    data: UndanganData;
    url: string;
}

function formatTanggal(dateStr: string): string {
    if (!dateStr) return "......................";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function TemplateSimpel({ data, url }: Props) {
    void url; // reserved for future QR usage

    return (
        <div
            id="template-simpel"
            style={{
                width: "210mm",
                height: "297mm",
                padding: "16mm 20mm 16mm 20mm",
                boxSizing: "border-box",
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "12.5pt",
                lineHeight: "1.4",
                color: "#000",
                background: "#fff",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* ===== HEADER ===== */}
            <div style={{ textAlign: "center", marginBottom: "16pt" }}>
                <h1
                    style={{
                        fontSize: "16pt",
                        fontWeight: "bold",
                        letterSpacing: "1pt",
                        margin: "0 0 8pt 0",
                    }}
                >
                    PAWARTOS LELAYU
                </h1>
            </div>

            {/* Katur Dumatheng */}
            <div style={{ marginBottom: "20pt", fontSize: "12pt" }}>
                <p style={{ margin: "0 0 4pt 0" }}>Katur Dumatheng</p>
                <div style={{ display: "flex", marginBottom: "4pt" }}>
                    <div style={{ width: "80pt" }}>Bapak / Ibu</div>
                    <div>: ..............................................................</div>
                </div>
                <div style={{ display: "flex", marginBottom: "4pt" }}>
                    <div style={{ width: "80pt" }}>Pidalem ing</div>
                    <div>: ..............................................................</div>
                </div>
            </div>

            {/* ===== INNALILLAHI ===== */}
            <div style={{ textAlign: "center", marginBottom: "16pt" }}>
                <h2 style={{
                    fontSize: "13pt",
                    fontWeight: "bold",
                    margin: 0
                }}>
                    &quot;INNALILLAHI WA INNA ILAIHI ROJI&apos;UN&quot;
                </h2>
            </div>

            {/* ===== SALAM & PEMBUKA ===== */}
            <div style={{ marginBottom: "16pt" }}>
                <p style={{ margin: "0 0 8pt 0", fontWeight: "bold" }}>
                    Assalamu&apos;alaikum Wr. Wb.
                </p>
                <p style={{ margin: "0 0 8pt 0" }}>
                    Sampun katimbalan sowan wonten ngarsanipun ALLOH SWT Panjenenganipun :
                </p>
            </div>

            {/* ===== NAMA ALMARHUM ===== */}
            <div style={{ textAlign: "center", marginBottom: "20pt" }}>
                <h2
                    style={{
                        fontSize: "20pt",
                        fontWeight: "bold",
                        textDecoration: "underline",
                        margin: "0 0 4pt 0",
                    }}
                >
                    {data.nama || "....................."}
                </h2>
                <p style={{ margin: "0", fontSize: "12pt", fontWeight: "bold", textDecoration: "underline" }}>
                    Yuswo: {data.usia || "..."} Tahun
                </p>
            </div>

            {/* ===== INGKANG PIDALEM ===== */}
            <div style={{ marginBottom: "16pt" }}>
                <p style={{ margin: 0 }}>
                    Ingkang Pidalem Wonten Ing : {data.alamatRumah || "................................................"}
                </p>
            </div>

            {/* ===== SEDO RIKOLO ===== */}
            <div style={{ marginBottom: "16pt" }}>
                <p style={{ margin: "0 0 6pt 0", fontWeight: "bold" }}>Sedo Rikolo,</p>
                <table style={{ marginLeft: "0", fontSize: "12.5pt", width: "100%" }}>
                    <tbody>
                        <tr>
                            <td style={{ width: "100pt", paddingBottom: "4pt" }}>Dinten</td>
                            <td style={{ width: "16pt", paddingBottom: "4pt" }}>:</td>
                            <td style={{ paddingBottom: "4pt" }}>
                                {data.hari} {data.pasaran} , {formatTanggal(data.tanggal)}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingBottom: "4pt" }}>Wanci Jam</td>
                            <td style={{ paddingBottom: "4pt" }}>:</td>
                            <td style={{ paddingBottom: "4pt" }}>{data.jam || "--:--"} WIB.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: "top", paddingTop: "2pt", paddingBottom: "4pt" }}>Wonten Ing</td>
                            <td style={{ verticalAlign: "top", paddingTop: "2pt", paddingBottom: "4pt" }}>:</td>
                            <td style={{ verticalAlign: "top", paddingTop: "2pt", paddingBottom: "4pt", lineHeight: "1.5" }}>
                                {data.lokasiDuka || "............."}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingBottom: "4pt" }}>Yuswo</td>
                            <td style={{ paddingBottom: "4pt" }}>:</td>
                            <td style={{ paddingBottom: "4pt" }}>{data.usia || "..."} Tahun</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* ===== PEMAKAMAN ===== */}
            <div style={{ marginBottom: "24pt" }}>
                <p style={{ margin: "0 0 6pt 0", fontWeight: "bold" }}>Jenazah Bade Kasareaken,</p>
                <table style={{ marginLeft: "0", fontSize: "12.5pt", width: "100%" }}>
                    <tbody>
                        <tr>
                            <td style={{ width: "100pt", paddingBottom: "4pt" }}>Dinten</td>
                            <td style={{ width: "16pt", paddingBottom: "4pt" }}>:</td>
                            <td style={{ paddingBottom: "4pt" }}>
                                {data.hariMakam} {data.pasaranMakam} , {formatTanggal(data.tanggalMakam)}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingBottom: "4pt" }}>Wanci Jam</td>
                            <td style={{ paddingBottom: "4pt" }}>:</td>
                            <td style={{ paddingBottom: "4pt" }}>{data.jamMakam || "--:--"} WIB.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: "top", paddingTop: "2pt" }}>Wonten Ing Makam</td>
                            <td style={{ verticalAlign: "top", paddingTop: "2pt" }}>:</td>
                            <td style={{ verticalAlign: "top", paddingTop: "2pt" }}>
                                {data.lokasiMakam || "............."}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* ===== PARAGRAF PENUTUP ===== */}
            <p style={{ margin: "0 0 20pt 0", textAlign: "left", lineHeight: "1.5" }}>
                Dumateng sanak kadang mitro pitepangan mugi pawartos lelayu puniko andadosno ing pamrikso.
            </p>

            {/* ===== SALAM PENUTUP ===== */}
            <p style={{ margin: "0 0 24pt 0", fontWeight: "bold", textAlign: "left" }}>
                Wassalamu&apos;alaikum Wr. Wb.
            </p>

            {/* ===== DAFTAR KELUARGA ===== */}
            <div style={{ marginTop: "0" }}>
                <p style={{ margin: "0 0 8pt 0", fontWeight: "bold" }}>Panadhang duhkito :</p>
                {data.keluarga && data.keluarga.length > 0 ? (
                    <table style={{ fontSize: "12.5pt", width: "100%", marginLeft: "12pt" }}>
                        <tbody>
                            {data.keluarga.map((k, i) => (
                                <tr key={i}>
                                    <td style={{ width: "20pt", verticalAlign: "top", paddingBottom: "4pt" }}>
                                        {i + 1}.
                                    </td>
                                    <td style={{ verticalAlign: "top", paddingBottom: "4pt" }}>
                                        {typeof k === "string" ? k : k.nama}
                                        {typeof k !== "string" && k.hubungan && ` (${k.hubungan})`}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td style={{ verticalAlign: "top", paddingTop: "4pt" }}>{data.keluarga.length + 1}.</td>
                                <td style={{ verticalAlign: "top", paddingTop: "4pt" }}>Segenap Keluarga</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p style={{ marginLeft: "20pt" }}>1. Segenap Keluarga</p>
                )}
            </div>
        </div>
    );
}
