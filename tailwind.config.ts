import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  corePlugins: {
    // antd v5 provides its own reset; Tailwind preflight breaks antd button backgrounds
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: "#6574FF",
        navbar: "#343D55",
        sidebar: "#272E40",
        warning: "#FAAD14",
        "status-draft": "#8B8E95",
      },
    },
  },
  plugins: [],
};

export default config;
