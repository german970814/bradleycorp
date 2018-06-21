// @flow

type TreeType = {
  parents:
    | false
    | {
        [string]: string
      },
  children:
    | false
    | {
        [string]: string
      }
}

export type { TreeType }
