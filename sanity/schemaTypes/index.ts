import type { SchemaTypeDefinition } from "sanity";
import { post } from "./post";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [post, siteSettings];
