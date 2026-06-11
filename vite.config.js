import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const staticSource = path.resolve(__dirname, 'static')
const staticRoute = '/ShreyasProfile/static/'

const staticAssetsPlugin = () => ({
  name: 'static-assets',
  configureServer(server) {
    server.middlewares.use(staticRoute, (req, res) => {
      const relativePath = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '')
      const filePath = path.resolve(staticSource, relativePath)

      if (!filePath.startsWith(staticSource)) {
        res.statusCode = 403
        res.end('Forbidden')
        return
      }

      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        res.statusCode = 404
        res.end('Not found')
        return
      }

      fs.createReadStream(filePath).pipe(res)
    })
  },
  closeBundle() {
    if (fs.existsSync(staticSource)) {
      fs.cpSync(staticSource, path.resolve(__dirname, 'dist/static'), {
        recursive: true,
      })
    }
  },
})

const resolveGlslIncludes = (code, id, seen = new Set()) =>
  code.replace(/#include\s+([^\s]+)/g, (match, includePath) => {
    if (includePath.startsWith('<')) {
      return match
    }

    const includeFile = path.resolve(path.dirname(id), includePath)

    if (seen.has(includeFile)) {
      return ''
    }

    seen.add(includeFile)
    const includeCode = fs.readFileSync(includeFile, 'utf8')
    return resolveGlslIncludes(includeCode, includeFile, seen)
  })

const glslPlugin = () => ({
  name: 'glsl',
  transform(code, id) {
    if (id.endsWith('.glsl')) {
      const resolvedCode = resolveGlslIncludes(code, id)

      return {
        code: `export default ${JSON.stringify(resolvedCode)}`,
        map: null,
      }
    }

    return null
  },
})

// https://vite.dev/config/
export default defineConfig({
  base: '/ShreyasProfile/',
  plugins: [react(), glslPlugin(), staticAssetsPlugin()],
  server: {
    host: true,
    port: 5173
  }
})
