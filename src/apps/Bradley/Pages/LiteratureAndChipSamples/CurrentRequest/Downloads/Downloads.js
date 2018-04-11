// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost
} from '../../../../../../lib/types/cpt_types'
import BCorpWidget from '../../../../../../lib/containers/Widgets/BCorpWidget'
import style from './Downloads.scss'

type Props = {
  literature?: Array<LiteraturePost>
}

class Downloads extends React.Component<Props> {
  render () {
    return (
      <BCorpWidget
        title={'Your Downloads'}
        className={'col1 col2-tablet col1-desktop'}
        twoColsOnTablet>
        {'content'}
      </BCorpWidget>
    )
  }
}

export default Downloads
