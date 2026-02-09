import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import tailwindcssPostcss from "@tailwindcss/postcss";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Force Vite to ignore external postcss.config.js and avoid using Tailwind as a PostCSS plugin
  css: {
    postcss: {
      plugins: [tailwindcssPostcss()],
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // استخدام code splitting بسيط - فصل React فقط
        manualChunks: (id) => {
          // فصل React و React DOM فقط
          if (id.includes('react-dom')) {
            return 'react-dom';
          }
          if (id.includes('react/') || id.includes('react\\')) {
            return 'react';
          }
          // كل شيء آخر في vendor chunk واحد
          // هذا يضمن أن Radix UI و Supabase يتم تحميلهما بعد React
        },
        // استخدام أسماء ثابتة للـ chunks
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // تحسين ترتيب التحميل
        format: 'es',
      },
      // التأكد من أن React يتم تحميله أولاً
      external: [],
    },
    chunkSizeWarningLimit: 2000, // زيادة الحد لأننا نضع كل شيء في vendor
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    // تحسين البناء
    minify: 'esbuild',
    sourcemap: false,
    // تحسين أداء البناء
    target: 'esnext',
    modulePreload: {
      polyfill: true,
    },
  },
}));
