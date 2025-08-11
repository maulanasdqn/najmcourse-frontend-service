/// <reference types='vitest' />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { nxCopyAssetsPlugin } from "@nx/vite/plugins/nx-copy-assets.plugin";
import { VitePWA } from "vite-plugin-pwa";
// import path from "path";

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/apps/backoffice",
  server: {
    port: 3001,
    host: "localhost",
  },
  preview: {
    port: 3001,
    host: "localhost",
  },
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(["*.md"]),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        clientsClaim: true,
        skipWaiting: true,
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "NAJM Course Backoffice",
        short_name: "NAJM",
        description:
          "NAJM Course Backoffice is a free and open source project to manage your courses",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  build: {
    outDir: "../../dist/apps/backoffice",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    // resolve: {
    //   alias: {
    //     "@/shared/apis": path.resolve(__dirname, "../../shared/apis/src"),
    //   },
    // },
    watch: false,
    globals: true,
    setupFiles: ["../../vitest.setup.ts"],
    environment: "jsdom",
    include: [
      // Include backoffice app tests
      "{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      // Include shared API integration tests relevant to backoffice
      "../../shared/apis/src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],
    reporters: ["default"],
    coverage: {
      reportsDirectory: "../../coverage/apps/backoffice",
      provider: "v8" as const,
      include: [
        "src/**/*.{js,ts,jsx,tsx}",
        "../../shared/apis/src/**/*.{js,ts,jsx,tsx}",
      ],
      exclude: [
        "**/*.{test,spec}.{js,ts,jsx,tsx}",
        "**/__tests__/**",
        "**/__mocks__/**",
      ],
    },
  },
}));
