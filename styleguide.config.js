const functional = [
  '**/BCorpLink/**',
  '**/VerticalAlignHelper/**',
  '**/ContainerMediaQuery/**',
  '**/Touch/**'
]

module.exports = {
  components: './src/lib/+(components|containers)/**/*.js',
  ignore: [
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts',
    '**/PDFDownloadLink/*.js',
    '**/WordDownloadLink/*.js',
    '**/Modules/**',
    '**/Pages/**',
    '**/Templates/**',
    '**/Widgets/**',
    ...functional
  ]
}
