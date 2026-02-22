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

export default function TemplateKlasik2({ data, url }: Props) {
    void url; // reserved for future QR usage

    return (
        <div
            id="template-klasik2"
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
                        textDecoration: "underline"
                    }}
                >
                    PAWARTOS LELAYU
                </h1>
            </div>

            {/* Katur Dumatheng */}
            <div style={{ marginBottom: "20pt", fontSize: "12pt", display: "flex", justifyContent: "flex-end" }}>
                <div style={{ width: "200pt" }}>
                    <p style={{ margin: "0 0 4pt 0" }}>Katur Dumateng : .....................</p>
                    <p style={{ margin: "4pt 0 4pt 0" }}>................................................</p>
                    <p style={{ margin: "4pt 0 0 0" }}>................................................</p>
                </div>
            </div>

            {/* ===== SALAM ======= */}
            <div style={{ textAlign: "center", marginBottom: "12pt", fontWeight: "bold" }}>
                Assalamu&apos;alaikum Wr. Wb
            </div>

            {/* ===== PARAGRAF PEMBUKA ======= */}
            <div style={{ marginBottom: "16pt" }}>
                <p style={{ margin: "0 0 2pt 0", textAlign: "justify" }}>
                    Pawartos lelayu meniko kakintun saking{" "}
                    {data.namaPengirim ? (
                        <strong>{data.namaPengirim}</strong>
                    ) : (
                        <>
                            {data.usia > 0 && Number(data.usia) >= 0 ? (
                                data.nama.toLowerCase().startsWith("ny") ||
                                    data.nama.toLowerCase().startsWith("ibu") ? "Ibu" : "Bapak"
                            ) : "Bapak/Ibu"}{" "}
                            <strong>{data.nama}</strong>
                        </>
                    )}{" "}
                    ingkang pidalem wonten {data.alamatRumah || "................................................"}
                </p>
            </div>

            {/* ===== INNALILLAHI ===== */}
            <div style={{ textAlign: "center", marginBottom: "16pt" }}>
                <h2 style={{
                    fontSize: "13pt",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    margin: 0
                }}>
                    Innalillahi Wa Inna Ilaihi Roji&apos;un
                </h2>
            </div>

            <div style={{ marginBottom: "16pt" }}>
                <p style={{ margin: "0 0 8pt 0" }}>
                    Sampun katimbalan sowan wonten ngarso dalem Allah SWT, Panjenenganipun :
                </p>
            </div>

            {/* ===== NAMA ALMARHUM ===== */}
            <div style={{ textAlign: "center", marginBottom: "20pt" }}>
                <h2
                    style={{
                        fontSize: "18pt",
                        fontWeight: "bold",
                        textDecoration: "underline",
                        textTransform: "uppercase",
                        margin: "0 0 4pt 0",
                    }}
                >
                    {data.nama || "....................."}
                </h2>
                <p style={{ margin: "0", fontSize: "14pt", fontWeight: "bold" }}>
                    Yuswo: {data.usia || "..."} tahun
                </p>
            </div>

            {/* ===== SEDO RIKOLO ===== */}
            <div style={{ marginBottom: "16pt" }}>
                <p style={{ margin: "0 0 6pt 0" }}>Sedo rikolo :</p>
                <table style={{ marginLeft: "0", fontSize: "12.5pt", width: "100%" }}>
                    <tbody>
                        <tr>
                            <td style={{ width: "80pt", paddingBottom: "4pt" }}>Dinten</td>
                            <td style={{ width: "16pt", paddingBottom: "4pt" }}>:</td>
                            <td style={{ paddingBottom: "4pt" }}>
                                {data.hari} {data.pasaran}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingBottom: "4pt" }}>Tanggal</td>
                            <td style={{ paddingBottom: "4pt" }}>:</td>
                            <td style={{ paddingBottom: "4pt" }}>{formatTanggal(data.tanggal)}</td>
                        </tr>
                        <tr>
                            <td style={{ paddingBottom: "4pt" }}>Wanci</td>
                            <td style={{ paddingBottom: "4pt" }}>:</td>
                            <td style={{ paddingBottom: "4pt" }}>Tabuh {data.jam || "--:--"} WIB</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: "top", paddingTop: "2pt", paddingBottom: "4pt" }}>Wonten ing</td>
                            <td style={{ verticalAlign: "top", paddingTop: "2pt", paddingBottom: "4pt" }}>:</td>
                            <td style={{ verticalAlign: "top", paddingTop: "2pt", paddingBottom: "4pt", lineHeight: "1.5" }}>
                                {data.lokasiDuka || "............."}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* ===== PEMAKAMAN ===== */}
            <div style={{ marginBottom: "24pt" }}>
                <p style={{ margin: "0 0 6pt 0" }}>Jenazah badhe kasarekaken :</p>
                <table style={{ marginLeft: "0", fontSize: "12.5pt", width: "100%" }}>
                    <tbody>
                        <tr>
                            <td style={{ width: "80pt", paddingBottom: "4pt" }}>Dinten</td>
                            <td style={{ width: "16pt", paddingBottom: "4pt" }}>:</td>
                            <td style={{ paddingBottom: "4pt" }}>
                                {data.hariMakam} {data.pasaranMakam}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingBottom: "4pt" }}>Tanggal</td>
                            <td style={{ paddingBottom: "4pt" }}>:</td>
                            <td style={{ paddingBottom: "4pt" }}>{formatTanggal(data.tanggalMakam)}</td>
                        </tr>
                        <tr>
                            <td style={{ paddingBottom: "4pt" }}>Wanci</td>
                            <td style={{ paddingBottom: "4pt" }}>:</td>
                            <td style={{ paddingBottom: "4pt" }}>Tabuh {data.jamMakam || "--:--"} WIB</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: "top", paddingTop: "2pt" }}>Wonten</td>
                            <td style={{ verticalAlign: "top", paddingTop: "2pt" }}>:</td>
                            <td style={{ verticalAlign: "top", paddingTop: "2pt" }}>
                                {data.lokasiMakam || "............."}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* ===== PARAGRAF PENUTUP ===== */}
            <p style={{ margin: "0 0 24pt 0", textAlign: "justify", lineHeight: "1.5" }}>
                Saking sedaya keluarga duka ngantu-antu kerawuhan panjenengan sami saperlu paring pakurmatan ingkang pungkasan dateng almarhum. Mekaten pawartos lelayumenika kula aturaken, mugi andadosna ing pamriksa.
            </p>

            {/* ===== SALAM PENUTUP ===== */}
            <div style={{ textAlign: "center", marginBottom: "24pt", fontWeight: "bold" }}>
                Wassalamu&apos;alaikum Wr. Wb.
            </div>

            {/* ===== DAFTAR KELUARGA ===== */}
            <div style={{ marginTop: "0" }}>
                <p style={{ margin: "0 0 8pt 0" }}>Ingkang nandang dukito :</p>
                {data.keluarga && data.keluarga.length > 0 ? (
                    <table style={{ fontSize: "12.5pt", width: "100%", marginLeft: "20pt" }}>
                        <tbody>
                            {data.keluarga.map((k, i) => (
                                <tr key={i}>
                                    <td style={{ width: "20pt", verticalAlign: "top", paddingBottom: "4pt" }}>
                                        {i + 1}.
                                    </td>
                                    <td style={{ verticalAlign: "top", paddingBottom: "4pt", width: "200pt" }}>
                                        {typeof k === "string" ? k : k.nama}
                                    </td>
                                    <td style={{ verticalAlign: "top", paddingBottom: "4pt" }}>
                                        {typeof k !== "string" && k.hubungan && `(${k.hubungan})`}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{ marginLeft: "20pt" }}>1. Segenap Keluarga</p>
                )}
            </div>
        </div>
    );
}
