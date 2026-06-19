import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const staticSource = path.resolve(rootDir, "assets/static");
const staticRoute = "/ShreyasProfile-V2/static/";

const staticAssetsPlugin = () => ({
  name: "copy-v2-static-assets",
  configureServer(server) {
    server.middlewares.use(staticRoute, (req, res) => {
      const requestedPath = req.url?.split("?")[0] || "";
      const relativePath = decodeURIComponent(requestedPath).replace(/^\/+/, "");
      const filePath = path.resolve(staticSource, relativePath);

      if (!filePath.startsWith(staticSource)) {
        res.statusCode = 403;
        res.end("Forbidden");
        return;
      }

      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        res.statusCode = 404;
        res.end("Not found");
        return;
      }

      fs.createReadStream(filePath).pipe(res);
    });
  },
  closeBundle() {
    if (fs.existsSync(staticSource)) {
      fs.cpSync(staticSource, path.resolve(rootDir, "dist/static"), {
        recursive: true,
      });
    }
  },
});

const resolveGlslIncludes = (code, id, seen = new Set()) =>
  code.replace(/#include\s+([^\s]+)/g, (match, includePath) => {
    if (includePath.startsWith("<")) {
      return match;
    }

    const includeFile = path.resolve(path.dirname(id), includePath);

    if (seen.has(includeFile)) {
      return "";
    }

    seen.add(includeFile);
    const includeCode = fs.readFileSync(includeFile, "utf8");
    return resolveGlslIncludes(includeCode, includeFile, seen);
  });

const glslPlugin = () => ({
  name: "glsl",
  transform(code, id) {
    if (!id.endsWith(".glsl")) {
      return null;
    }

    return {
      code: `export default ${JSON.stringify(resolveGlslIncludes(code, id))}`,
      map: null,
    };
  },
});

export default defineConfig({
  base: "/ShreyasProfile-V2/",
  publicDir: "assets/public",
  plugins: [react(), glslPlugin(), staticAssetsPlugin()],
  resolve: {
    alias: {
      "@project-media": path.resolve(rootDir, "assets/media/projects"),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
