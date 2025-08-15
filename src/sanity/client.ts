import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "ldn41n1i",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});