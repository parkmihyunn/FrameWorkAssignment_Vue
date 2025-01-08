import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const base = {
    plugins: [vue()],
  };

  /**
   * build command 일 때는 base 설정만 사용 합니다.
   */
  if ("build" === command) {
    return base;
  }

  /**
   * 개발 환경에서는 proxy를 사용 합니다.
   */
  const env = loadEnv(mode, process.cwd(), "");
  return {
    ...base,
    server: {
      proxy: {
        "/proxy": {
          target: env.VITE_FAKE_STORE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy/, ""),
          secure: false,
          ws: true,
        },
      },
    },
    plugins: [vue()],

    css: {
      postcss: {
        plugins: [],
      },
    },
  };
});
