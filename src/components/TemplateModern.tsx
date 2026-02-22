"use client";

import type { UndanganData } from "@/lib/types";

interface Props {
    data: UndanganData;
    url: string;
}

function formatTanggal(dateStr: string): string {
    if (!dateStr) return "...............";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function TemplateModern({ data, url }: Props) {
    void url;

    return (
        <div
            id="template-modern"
            style={{
                width: "210mm",
                height: "297mm",
                padding: "10mm 16mm",
                boxSizing: "border-box",
                fontFamily: "'Georgia', 'Noto Serif', 'Times New Roman', serif",
                fontSize: "12pt",
                lineHeight: "1.4",
                color: "#1a1a1a",
                background: "#fff",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Decorative border */}
            <div
                style={{
                    position: "absolute",
                    inset: "8mm",
                    border: "2pt solid #333",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: "10mm",
                    border: "0.5pt solid #666",
                    pointerEvents: "none",
                }}
            />

            {/* Content inside border */}
            <div style={{ position: "relative", padding: "6mm 8mm" }}>
                {/* ===== HEADER ===== */}
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "8pt",
                        borderBottom: "1pt solid #999",
                        paddingBottom: "6pt",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "22pt",
                            fontWeight: "bold",
                            letterSpacing: "6pt",
                            margin: "0 0 2pt 0",
                            textTransform: "uppercase",
                        }}
                    >
                        Pawartos Lelayu
                    </h1>
                    <p
                        style={{
                            margin: 0,
                            fontSize: "10pt",
                            color: "#666",
                            letterSpacing: "3pt",
                        }}
                    >
                        ✦ ✦ ✦
                    </p>
                </div>

                {/* Alamat tujuan (kanan) */}
                <div
                    style={{
                        textAlign: "right",
                        marginBottom: "8pt",
                        fontStyle: "italic",
                    }}
                >
                    <p style={{ margin: 0 }}>
                        Bpk/Ibu/Sdr. .........................................
                    </p>
                    <p style={{ margin: 0 }}>
                        Wonten ing ...............................................
                    </p>
                </div>

                {/* ===== SALAM PEMBUKA ===== */}
                <div style={{ marginBottom: "4pt" }}>
                    <p
                        style={{
                            margin: "0 0 2pt 0",
                            fontStyle: "italic",
                            fontSize: "13pt",
                        }}
                    >
                        Assalamu&apos;alaikum Wr. Wb.
                    </p>
                    <p style={{ margin: "0 0 2pt 0", textAlign: "justify" }}>
                        Nyuwun kawigotosanipun dumateng wargo ..........
                    </p>
                    <p style={{ margin: "0 0 2pt 0", textAlign: "justify" }}>
                        Pawartos Lelayu puniko kakintun saking{" "}
                        {data.namaPengirim ? (
                            <strong>{data.namaPengirim}</strong>
                        ) : (
                            <>
                                {data.usia > 0 && Number(data.usia) >= 0 ? (
                                    data.nama.toLowerCase().startsWith("ny") ||
                                        data.nama.toLowerCase().startsWith("ibu") ? "Ibu" : "Bpk"
                                ) : "Bpk/Ibu"}{" "}
                                <strong>{data.nama}</strong>
                            </>
                        )}{" "}
                        ingkang pidalem wonten ing dusun{" "}
                        <strong>{data.alamatRumah || ".............................................."}</strong>
                    </p>
                    <p style={{ margin: "0 0 2pt 0" }}>
                        Menggah isinipun pawartos lelayu
                    </p>
                </div>

                {/* ===== INNALILLAHI ===== */}
                <div
                    style={{
                        textAlign: "center",
                        margin: "6pt 0",
                        padding: "4pt 0",
                        borderTop: "0.5pt solid #ccc",
                        borderBottom: "0.5pt solid #ccc",
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            fontSize: "12pt",
                            fontWeight: "bold",
                            letterSpacing: "2pt",
                        }}
                    >
                        INNALILLAHI WAINNA ILLAIHI ROJI&apos;UN
                    </p>
                </div>

                {/* ===== KALIMAT KAPUNDHUT ===== */}
                <p style={{ margin: "4pt 0", textAlign: "justify" }}>
                    Sampun Kapundhut wangsul dumateng Ngarso dalem Allah SWT,
                    panjenenganipun :
                </p>

                {/* ===== NAMA ALMARHUM ===== */}
                <div
                    style={{
                        textAlign: "center",
                        margin: "8pt 0",
                        padding: "6pt 0",
                        background: "#f8f8f8",
                        border: "0.5pt solid #ddd",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "20pt",
                            fontWeight: "bold",
                            textDecoration: "underline",
                            margin: "0 0 4pt 0",
                            letterSpacing: "2pt",
                        }}
                    >
                        {data.nama || "....................."}
                    </h2>
                    <p style={{ margin: "0", fontSize: "13pt" }}>
                        Yuswo : {data.usia || "..."} tahun
                    </p>
                </div>

                {/* ===== DETAIL WAFAT ===== */}
                <table style={{ marginLeft: "20pt", marginBottom: "6pt", fontSize: "12pt" }}>
                    <tbody>
                        <tr>
                            <td style={{ width: "90pt", paddingRight: "8pt" }}>Dinten</td>
                            <td style={{ width: "12pt" }}>:</td>
                            <td>
                                {data.hari} {data.pasaran}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "8pt" }}>Tanggal</td>
                            <td>:</td>
                            <td>{formatTanggal(data.tanggal)}</td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "8pt" }}>Jam</td>
                            <td>:</td>
                            <td>{data.jam || "--:--"} WIB</td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "8pt" }}>Wonten</td>
                            <td>:</td>
                            <td>{data.lokasiDuka || "............."}</td>
                        </tr>
                    </tbody>
                </table>

                {/* ===== DETAIL PEMAKAMAN ===== */}
                <div style={{ marginBottom: "6pt" }}>
                    <p style={{ margin: "0 0 2pt 0" }}>Jenazah badhe kasareaken :</p>
                    <table style={{ marginLeft: "20pt", fontSize: "12pt" }}>
                        <tbody>
                            <tr>
                                <td style={{ width: "90pt", paddingRight: "8pt" }}>Dinten</td>
                                <td style={{ width: "12pt" }}>:</td>
                                <td>
                                    {data.hariMakam} {data.pasaranMakam}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ paddingRight: "8pt" }}>Tanggal</td>
                                <td>:</td>
                                <td>{formatTanggal(data.tanggalMakam)}</td>
                            </tr>
                            <tr>
                                <td style={{ paddingRight: "8pt" }}>Jam</td>
                                <td>:</td>
                                <td>{data.jamMakam || "--:--"} WIB</td>
                            </tr>
                            <tr>
                                <td style={{ paddingRight: "8pt" }}>Ing Makam</td>
                                <td>:</td>
                                <td>{data.lokasiMakam || "............."}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ===== PARAGRAF PENUTUP ===== */}
                <p style={{ margin: "6pt 0", textAlign: "justify" }}>
                    Kanthi pawartos lelayu meniko, dumateng Bpk/Ibu/Sederek sedaya kasuwun
                    paring panjurung do&apos;a saha paring pakurmatan ingkang pungkasan
                    dumateng Almarhum.
                </p>

                {/* ===== SALAM PENUTUP ===== */}
                <p style={{ margin: "4pt 0 6pt 0" }}>
                    <em>Wassalamu&apos;alaikum Wr. Wb.</em>
                </p>

                {/* ===== DAFTAR KELUARGA ===== */}
                <div style={{ marginTop: "4pt" }}>
                    <p style={{ margin: "0 0 4pt 0" }}>Ingkang nandang sungkowo :</p>
                    {data.keluarga && data.keluarga.length > 0 ? (
                        <table style={{ fontSize: "12pt", width: "100%" }}>
                            <tbody>
                                {data.keluarga.map((k, i) => (
                                    <tr key={i}>
                                        <td style={{ width: "20pt", verticalAlign: "top" }}>
                                            {i + 1}.
                                        </td>
                                        <td style={{ verticalAlign: "top" }}>
                                            {typeof k === "string" ? k : k.nama}
                                        </td>
                                        <td
                                            style={{
                                                textAlign: "right",
                                                verticalAlign: "top",
                                                paddingLeft: "16pt",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            ( {typeof k === "string" ? "" : k.hubungan} )
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>{data.keluarga.length + 1}.</td>
                                    <td colSpan={2}>Segenap Keluarga</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ marginLeft: "20pt" }}>1. Segenap Keluarga</p>
                    )}
                </div>
            </div>
        </div>
    );
}
