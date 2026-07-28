"use client";

/**
 * Configuração do Studio embutido em /studio.
 *
 * Mora na raiz do projeto porque é também onde a CLI do Sanity procura o
 * arquivo (`npx sanity deploy`, `npx sanity dataset`, etc.).
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

/** Tipos que só podem existir uma vez no dataset. */
const SINGLETON_TYPES = new Set(["siteSettings"]);

export default defineConfig({
  name: "default",
  title: "Alysia Germani",
  basePath: "/studio",
  projectId,
  dataset,

  schema: {
    types: schemaTypes,
    // Some da lista de "criar novo" — o singleton é acessado pelo menu lateral.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    // No singleton, criar/duplicar/apagar produziria um segundo documento de
    // configurações — só publicar e descartar alterações fazem sentido ali.
    actions: (input, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? input.filter(
            ({ action }) =>
              action && ["publish", "discardChanges", "restore"].includes(action),
          )
        : input,
  },

  plugins: [
    structureTool({ structure }),
    // Vision permite testar consultas GROQ direto no Studio.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
