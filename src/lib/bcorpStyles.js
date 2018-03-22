import variables from '../scss/partials/_variables.scss'

export function lookupColor (color) {
  switch (color) {
    case 'black':
      return variables.Black

    case 'white':
      return '#fff'

    case 'green':
      return variables.Green

    case 'navy':
    case 'blue':
      return variables.Navy

    case 'red':
      return variables.Red

    case 'orange':
      return variables.Orange

    case 'light-gray':
      return variables.LightGray

    case 'gray':
      return variables.Gray

    case 'dark-gray':
      return variables.DarkGray

    case 'silver':
      return variables.Silver

    case 'slate-grey':
      return variables.SlateGrey

    case 'steel-grey':
      return variables.SteelGrey

    case 'charcoal-grey':
      return variables.CharcoalGrey

    case 'brown':
      return variables.Brown
  }
}
