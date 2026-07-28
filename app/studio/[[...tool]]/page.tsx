import type { Metadata } from "next";
import { NextStudio } from "next-sanity/studio";
import { metadata as studioMetadata } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export { viewport } from "next-sanity/studio";

export const metadata: Metadata = {
  // studioMetadata traz `robots: noindex` — o painel de edição não deve ser
  // indexado. O título entra no template do layout raiz ("%s — Alysia Germani").
  ...studioMetadata,
  title: "Studio",
};

function SetupPendente() {
  return (
    <div className="mx-auto flex h-full max-w-xl flex-col justify-center px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">
        Studio ainda não configurado
      </h1>
      <p className="mt-4 leading-relaxed text-subtle">
        Falta apontar este site para um projeto do Sanity. Crie o projeto, copie
        o <code className="font-mono text-foam">projectId</code> e defina as
        variáveis abaixo em <code className="font-mono text-foam">.env.local</code>{" "}
        (e no painel da Vercel, para o site publicado):
      </p>
      <pre className="surface-card mt-6 overflow-x-auto p-4 font-mono text-sm text-subtle">
        {`NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id
NEXT_PUBLIC_SANITY_DATASET=production`}
      </pre>
      <p className="mt-6 text-sm text-muted">
        O passo a passo completo está no README, na seção “Configurar o Sanity”.
      </p>
    </div>
  );
}

export default function StudioPage() {
  // Sem projectId o Studio quebraria ao montar. Trocar por instruções mantém o
  // site publicável antes do CMS existir — que é a ordem natural do setup.
  if (!isSanityConfigured) return <SetupPendente />;

  return <NextStudio config={config} />;
}
