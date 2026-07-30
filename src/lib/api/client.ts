import axios from "axios";

/**
 * Main backend instance. Base URL comes from the environment so the same build
 * can point at different backends.
 */
export const mainClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_MAIN_URL ?? "",
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
});
