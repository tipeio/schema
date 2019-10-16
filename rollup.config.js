import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { main, browser, module, dependencies } from './package.json'
import { terser } from 'rollup-plugin-terser'
const whiteList = {
  'lodash.flatten': true,
  'lodash.map': true,
  'fastest-validator': true
}

const plugins = [
  resolve({
    customResolveOptions: {
      moduleDirectory: 'node_modules'
    }
  }),
  commonjs(),
  json()
]

export default [
  {
    input: 'src/index.js',
    plugins: [...plugins, terser()],
    output: {
      file: module,
      format: 'umd',
      name: 'tipe-validator',
      esModule: false,
      exports: 'named'
    }
  },
  {
    input: 'src/index.js',
    plugins,
    output: [
      {
        file: browser,
        format: 'esm',
        exports: 'named'
      },
      {
        file: main,
        format: 'cjs',
        exports: 'named'
      }
    ],
    external: [
      ...Object.keys(dependencies).filter(dep => !whiteList[dep] || {})
    ]
  }
]