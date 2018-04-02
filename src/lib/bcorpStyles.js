// @flow

import variables from '../scss/partials/_variables.scss'
import type { BCorpColor } from './types/styleguide_types'

export const styleguideColors: { [key: BCorpColor]: string } = {
  black: variables.Black,
  white: '#fff',
  green: variables.Green,
  navy: variables.Navy,
  blue: variables.Navy,
  red: variables.Red,
  orange: variables.Orange,
  'light-gray': variables.LightGray,
  gray: variables.Gray,
  'dark-gray': variables.DarkGray,
  silver: variables.Silver,
  'slate-grey': variables.SlateGrey,
  'steel-grey': variables.SteelGrey,
  'charcoal-grey': variables.CharcoalGrey,
  brown: variables.Brown
}

export function lookupColor (color?: BCorpColor) {
  if (!color) {
    return undefined
  }
  if (styleguideColors && styleguideColors.hasOwnProperty(color)) {
    return styleguideColors[color]
  } else {
    console.log(`Couldnt find color ${color} in styleguideColors`)
    console.log(styleguideColors)
    return undefined
  }
}
