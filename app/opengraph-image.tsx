import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagem de prévia gerada em build, herdada por todas as rotas que não
 * definem a sua própria. Usa a paleta Rosé Pine Moon para que o link
 * compartilhado já pareça o site.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#232136",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9ccfd8",
          }}
        >
          {siteConfig.role}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 96,
            fontWeight: 700,
            color: "#e0def4",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            width: 120,
            height: 4,
            marginTop: 32,
            backgroundColor: "#c4a7e7",
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 32,
            maxWidth: 900,
            fontSize: 34,
            lineHeight: 1.4,
            color: "#908caa",
          }}
        >
          Segurança da informação, dados e proteção no setor bancário
        </div>
      </div>
    ),
    size,
  );
}
