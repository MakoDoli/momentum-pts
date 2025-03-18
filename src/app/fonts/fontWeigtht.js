import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const thinFont = localFont({
  src: "./firago-latin-300-normal.ttf",
  fallback: ["sans-serif"],
});

export const slimFont = localFont({
  src: "./firago-latin-400-normal.ttf",
  fallback: ["sans-serif"],
});

export const boldFont = localFont({
  src: "./firago-latin-600-normal.ttf",
  fallback: ["sans-serif"],
});

export const mediumFont = localFont({
  src: "./firago-latin-500-normal.ttf",
  fallback: ["sans-serif"],
});

export const interFont = Inter({ subsets: ["latin"] }, { weight: "600" });
