const functional = [
  '**/BCorpLink/**',
  '**/VerticalAlignHelper/**',
  '**/ContainerMediaQuery/**',
  '**/AutoGrowShrinkAnimation/**',
  '**/Touch/**',
  '**/ScrollableListTrack.js'
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
    '**/LightboxCloseButton.js',
    '**/lightboxVars.js',
    '**/ProductScrollerProduct/**',
    '**/PositionCircle/**',
    '**/ButtonLeft.js',
    '**/ButtonRight.js',
    '**/ButtonPrev.js',
    '**/ButtonNext.js',
    '**/Modules/**',
    '**/Pages/**',
    '**/Templates/**',
    '**/Widgets/**',
    ...functional
  ]
}
