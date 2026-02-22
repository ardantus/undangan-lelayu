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

export default function TemplateIndo({ data, url }: Props) {
    void url; // reserved for future QR usage

    return (
        <div
            id="template-indo"
            style={{
                width: "210mm",
                height: "297mm",
                padding: "12mm 16mm 12mm 16mm",
                boxSizing: "border-box",
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "12.5pt",
                lineHeight: "1.3",
                color: "#000",
                background: "#fff",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* ===== HEADER ===== */}
            <div style={{ textAlign: "center", marginBottom: "6pt" }}>
                <h1
                    style={{
                        fontSize: "18pt",
                        fontWeight: "bold",
                        letterSpacing: "2pt",
                        margin: "0 0 4pt 0",
                        textDecoration: "underline"
                    }}
                >
                    BERITA LELAYU
                </h1>
                <p style={{ margin: 0, fontSize: "12pt", fontWeight: "bold" }}>
                    ASSALAMU&apos;ALAIKUM WARAHMATULLAHI WABARAKATUH
                </p>
            </div>

            {/* Kepada yg terhormat */}
            <div style={{ marginTop: "8pt", marginBottom: "12pt" }}>
                <p style={{ margin: 0 }}>Kepada :</p>
                <p style={{ margin: "4pt 0 0 0" }}>...........................................................</p>
                <p style={{ margin: "4pt 0 0 0" }}>...........................................................</p>
            </div>

            {/* ===== INNALILLAHI ===== */}
            <div
                style={{
                    textAlign: "center",
                    margin: "12pt 0 16pt 0",
                }}
            >
                <p
                    style={{
                        fontSize: "24pt",
                        margin: "0 0 4pt 0",
                        fontFamily: "Amiri, serif",
                        direction: "rtl"
                    }}
                >
                    إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
                </p>
                <p
                    style={{
                        margin: 0,
                        fontSize: "12pt",
                        fontStyle: "italic",
                        fontWeight: "bold",
                        letterSpacing: "1pt"
                    }}
                >
                    ( INNALILLAHI WA INNA ILAIHI ROJI&apos;UN )
                </p>
            </div>

            {/* ===== KALIMAT KAPUNDHUT ===== */}
            <p style={{ margin: "8pt 0", textAlign: "left" }}>
                Telah meninggal dunia dengan tenang :
            </p>

            {/* ===== NAMA ALMARHUM ===== */}
            <div style={{ textAlign: "center", margin: "12pt 0 16pt 0" }}>
                <h2
                    style={{
                        fontSize: "18pt",
                        fontWeight: "bold",
                        textDecoration: "underline",
                        margin: "0 0 4pt 0",
                        letterSpacing: "2pt",
                        textTransform: "uppercase"
                    }}
                >
                    {data.nama || "....................."}
                </h2>
                <p style={{ margin: "0", fontSize: "13pt", fontWeight: "bold" }}>
                    Umur {data.usia || "..."} Tahun
                </p>
            </div>

            {/* ===== DETAIL WAFAT ===== */}
            <table style={{ marginLeft: "40pt", marginBottom: "16pt", fontSize: "13pt" }}>
                <tbody>
                    <tr>
                        <td style={{ width: "90pt", paddingBottom: "4pt" }}>Pada Hari</td>
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
                        <td style={{ paddingBottom: "4pt" }}>Pukul</td>
                        <td style={{ paddingBottom: "4pt" }}>:</td>
                        <td style={{ paddingBottom: "4pt" }}>{data.jam || "--:--"} WIB</td>
                    </tr>
                    <tr>
                        <td style={{ paddingBottom: "4pt" }}>Di</td>
                        <td style={{ paddingBottom: "4pt" }}>:</td>
                        <td style={{ paddingBottom: "4pt" }}>......................................................</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: "top", paddingTop: "2pt" }}>Rumah Duka</td>
                        <td style={{ verticalAlign: "top", paddingTop: "2pt" }}>:</td>
                        <td style={{ verticalAlign: "top", paddingTop: "2pt" }}>{data.lokasiDuka || "............."}</td>
                    </tr>
                </tbody>
            </table>

            {/* ===== DETAIL PEMAKAMAN ===== */}
            <div style={{ marginBottom: "16pt" }}>
                <p style={{ margin: "0 0 6pt 0" }}>Jenazah akan dimakamkan pada :</p>
                <table style={{ marginLeft: "40pt", fontSize: "13pt" }}>
                    <tbody>
                        <tr>
                            <td style={{ width: "90pt", paddingBottom: "4pt" }}>Hari</td>
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
                            <td style={{ paddingBottom: "4pt" }}>Pukul</td>
                            <td style={{ paddingBottom: "4pt" }}>:</td>
                            <td style={{ paddingBottom: "4pt" }}>{data.jamMakam || "--:--"} WIB</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: "top", paddingTop: "2pt" }}>Di Makam</td>
                            <td style={{ verticalAlign: "top", paddingTop: "2pt" }}>:</td>
                            <td style={{ verticalAlign: "top", paddingTop: "2pt", fontStyle: "italic", fontWeight: "bold" }}>
                                &quot;{data.lokasiMakam || "............."}&quot;
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* ===== PARAGRAF PENUTUP ===== */}
            <p style={{ margin: "12pt 0", textAlign: "left" }}>
                Berita lelayu ini mohon disebarluaskan kepada sanak keluarga /sahabat handaitaulan
            </p>

            {/* ===== DAFTAR KELUARGA ===== */}
            <div style={{ marginTop: "16pt", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "70%" }}>
                    <p style={{ margin: "0 0 8pt 0" }}>Kami yang berduka cita :</p>
                    {data.keluarga && data.keluarga.length > 0 ? (
                        <table style={{ fontSize: "13pt", width: "100%" }}>
                            <tbody>
                                {data.keluarga.map((k, i) => (
                                    <tr key={i}>
                                        <td style={{ width: "20pt", verticalAlign: "top", paddingBottom: "2pt" }}>
                                            {i + 1}.
                                        </td>
                                        <td style={{ verticalAlign: "top", paddingBottom: "2pt" }}>
                                            {typeof k === "string" ? k : k.nama}
                                        </td>
                                        <td
                                            style={{
                                                textAlign: "right",
                                                verticalAlign: "top",
                                                paddingLeft: "16pt",
                                                whiteSpace: "nowrap",
                                                paddingBottom: "2pt"
                                            }}
                                        >
                                            ( {typeof k === "string" ? "" : k.hubungan} )
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td style={{ verticalAlign: "top", paddingTop: "2pt" }}>{data.keluarga.length + 1}.</td>
                                    <td colSpan={2} style={{ verticalAlign: "top", paddingTop: "2pt" }}>Dan Segenap Keluarga</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ marginLeft: "20pt" }}>1. Dan Segenap Keluarga</p>
                    )}
                </div>
            </div>
        </div>
    );
}
