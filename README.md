# lunalith-portfolio

Site pessoal da Alysia — portfólio e blog. Next.js 16 (App Router) + TypeScript
+ Tailwind CSS v4, com Sanity como CMS e Studio embutido em `/studio`.

## Rodando localmente

```bash
npm install
npm run dev
```

O site sobe em <http://localhost:3000>. Ele funciona sem o Sanity configurado:
as seções institucionais vêm do código e o blog mostra um estado vazio.

| Comando             | O que faz                          |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento        |
| `npm run build`     | Build de produção                  |
| `npm run start`     | Sobe o build de produção           |
| `npm run lint`      | ESLint                             |
| `npm run typecheck` | `tsc --noEmit`                     |

## Estrutura

```
app/
  (site)/            páginas públicas (home, blog) — navbar e rodapé
  studio/            Studio do Sanity, fora do layout do site
components/          componentes de UI
lib/                 configuração, textos das seções e helpers
sanity/              schemas, cliente e consultas GROQ
```

## Onde editar cada coisa

| O quê                                | Onde                                  |
| ------------------------------------ | ------------------------------------- |
| Nome, tagline, contatos, menu        | `lib/site.ts`                         |
| Textos de Sobre, Habilidades e Trajetória | `lib/content.ts`                 |
| Posts do blog                        | `/studio` (Sanity)                    |
| Bio, contatos e cores de destaque    | `/studio` → Configurações do site     |
| Paleta e tokens de design            | `app/globals.css`                     |

Valores preenchidos no Sanity têm prioridade; quando um campo fica vazio, o
site usa o padrão de `lib/site.ts`.

### Pendências deixadas de propósito

- **Currículo em PDF.** O botão "Baixar currículo" aponta para
  `public/curriculo-alysia.pdf`, que ainda não existe. Coloque o arquivo com
  esse nome em `public/` (ou mude `resumeUrl` em `lib/site.ts`).
- **Seção de Projetos.** Está pronta e desligada. Para ativar: preencha a lista
  `projects` em `components/Projects.tsx`, descomente `<Projects />` em
  `app/(site)/page.tsx` e o item "Projetos" em `lib/site.ts`.

## Configurar o Sanity

1. Crie o projeto em <https://sanity.io/manage> (plano gratuito serve). Anote o
   **Project ID** e use o dataset `production`.
2. Copie o template e preencha:

   ```bash
   cp .env.example .env.local
   ```

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

3. Reinicie o `npm run dev` e abra <http://localhost:3000/studio>. Faça login
   com a mesma conta do Sanity.
4. Em **Configurações do site**, preencha bio, contatos e cores — é um
   documento único, criado no primeiro salvamento.
5. Em **Posts**, publique o primeiro texto.

O `.env.local` está no `.gitignore` e nunca deve ser commitado. As variáveis
`NEXT_PUBLIC_*` do Sanity são públicas por natureza: identificam um dataset de
leitura pública e não dão acesso de escrita — quem edita entra no `/studio`
autenticado.

### CORS

Para o Studio funcionar, cada origem precisa estar liberada em
**sanity.io/manage → API → CORS origins**, com _Allow credentials_ ligado:

- `http://localhost:3000`
- a URL de produção da Vercel
- o domínio próprio, se houver

## Fluxo de trabalho no Git

O repositório é <https://github.com/lunalith/lunalith-portfolio>, com `origin`
via SSH.

Os commits seguem [Conventional Commits](https://www.conventionalcommits.org/)
(`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`, `test:`) e cada
funcionalidade vive numa branch própria, que entra na `main` por Pull Request.
A `main` fica sempre deployável.

```bash
git checkout -b feature/nome-da-funcionalidade
# ... commits pequenos e atômicos ...
git push -u origin feature/nome-da-funcionalidade
gh pr create --base main
gh pr merge --merge
```

Use `--merge` (e não squash) para preservar os commits individuais no
histórico — é o que mostra o raciocínio passo a passo de cada mudança.

## Deploy na Vercel

1. Em <https://vercel.com/new>, importe o repositório. O Next.js é detectado
   sozinho — não é preciso mudar build command nem output directory.
2. Em **Environment Variables**, adicione (para Production, Preview e
   Development):

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID
   NEXT_PUBLIC_SANITY_DATASET
   NEXT_PUBLIC_SITE_URL
   ```

   `NEXT_PUBLIC_SITE_URL` é o domínio final, com `https://` e sem barra no fim.
   Ele monta as URLs absolutas de Open Graph e do sitemap.

3. Deploy. Depois volte ao Sanity e libere a URL da Vercel em CORS origins.

Cada push na `main` gera um deploy de produção; pull requests ganham deploy de
preview.

## Notas de implementação

- **Tema.** O escuro (Rosé Pine Moon) é o padrão e vive em `:root`, então o
  HTML do servidor já vem escuro e não há flash branco. O claro (Rosé Pine
  Dawn) entra sob `.light`, aplicado pelo `next-themes`.
- **Cuidado com `text-base`.** Como a paleta define `--color-base`, a classe
  `text-base` vira **cor**, não tamanho de fonte. Para texto sobre um
  preenchimento de destaque, use `text-on-accent`.
- **Falha do CMS não derruba a página.** As consultas caem para um fallback e
  registram o erro no log do servidor.
- **Revalidação.** O conteúdo do Sanity é revalidado a cada 60 segundos.
