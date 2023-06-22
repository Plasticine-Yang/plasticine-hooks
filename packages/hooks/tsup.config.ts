import fg from 'fast-glob'
import { defineConfig, type Options } from 'tsup'

const sharedConfig: Options = {
  format: ['cjs', 'esm'],
  clean: true,
  shims: true,
}

const mainConfig: Options = {
  entry: ['src/index.ts'],
  outDir: 'dist',
  ...sharedConfig,
}

export default defineConfig(async () => {
  const hookNameRegex = /use\w+/

  const hookSourceList = await fg('src/**/use*/index.ts')
  const hookConfigList = hookSourceList
    .map((hookSource) => {
      const hookNameMatch = hookSource.match(hookNameRegex)

      if (hookNameMatch) {
        const hookName = hookNameMatch.at(0)

        if (hookName !== undefined && hookName.startsWith('use')) {
          return {
            entry: [hookSource],
            outDir: `dist/${hookName}`,
            ...sharedConfig,
          }
        }
      }

      return null
    })
    .filter((hookConfig) => hookConfig !== null) as Options[]

  return [mainConfig, ...hookConfigList]
})
