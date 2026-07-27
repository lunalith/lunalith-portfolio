import { ArrowUpRightIcon, DownloadIcon } from "@/components/Icons";
import { getResolvedSettings } from "@/lib/settings";
import { siteConfig } from "@/lib/site";

export async function Hero() {
  const { bio, github } = await getResolvedSettings();

  return (
    <section className="mx-auto w-full max-w-3xl px-6 pb-8 pt-20 sm:pt-28">
      <p className="font-mono text-sm text-accent-2">{siteConfig.role}</p>

      <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
        {siteConfig.name}
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-subtle">
        {bio}
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
        >
          Ver GitHub
          <ArrowUpRightIcon className="h-4 w-4" />
        </a>

        {/*
          O PDF ainda não existe: coloque o arquivo em public/ com o nome
          definido em siteConfig.resumeUrl para o botão passar a baixar de fato.
        */}
        <a
          href={siteConfig.resumeUrl}
          download
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-overlay bg-surface px-5 py-3 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
        >
          Baixar currículo
          <DownloadIcon className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
