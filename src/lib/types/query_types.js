type DateQuery = {
  // 4 digit
  year?: number,
  // 1 - 12
  month?: number,
  // 0 - 53
  week?: number,
  // 1 - 31
  day?: number,
  // 0 - 23
  hour?: number,
  // 0 - 59
  minute?: number,
  // 0 -59
  second?: number,
  after?: string | {| year: string, month: string, day: string |},
  before?: string | {| year: string, month: string, day: string |},
  // For after/before, whether exact value should be matched or not
  inclusive?: boolean,
  // See WP_Date_Query::get_compare()
  compare?: string,
  // Column to query against. Default: 'post_date'.
  column?: string,
  relation?: 'OR' | 'AND'
}

export type { DateQuery }
