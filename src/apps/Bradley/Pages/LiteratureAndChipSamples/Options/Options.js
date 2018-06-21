// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost
} from '../../../../../lib/types/cpt_types'
import type {
  OptionsTypes,
  FiltersTypes,
  PostTypeOptions
} from '../LiteratureAndChipSamples'
import { sortAlphabeticallyArrayOfTwoLevelObjects } from '../../../../../lib/bcorpArray'
import {
  productLineFilterDefault,
  languageFilterDefault,
  materialTypeFilterDefault
} from '../LiteratureAndChipSamples'
import { sortIntoRows } from '../../../../../lib/bcorpJSX'
import {
  filterPostsByTerm,
  filterPostsByMeta
} from '../../../../../lib/bcorpPost'
import Loading from '../../../../../lib/components/Loading/Loading'
import NoResults from '../../../../../lib/components/NoResults/NoResults'
import Option from './Option/Option'
import style from './Options.scss'

type Props = {
  options: OptionsTypes,
  filters: FiltersTypes,
  selected: PostTypeOptions,
  addToShipment: (postToAdd: LiteraturePost | ChipSamplePost) => void,
  addToDownloads: (postToAdd: LiteraturePost) => void,
  isMobile: boolean,
  isLoading: boolean
}

/**
 * Class responsible for applying the filters to and rendering the options
 */
class Options extends React.Component<Props> {
  renderLiterature () {
    let literature = this.props.options.literature

    if (!literature || !literature.length) {
      return this.renderNoLiteratureMessage()
    }

    if (
      this.props.filters.literature.productLine !== productLineFilterDefault
    ) {
      literature = filterPostsByTerm(
        literature,
        'product_line',
        this.props.filters.literature.productLine
      )

      if (!literature || !literature.length) {
        return this.renderNoLiteratureMessage()
      }
    }

    if (this.props.filters.literature.language !== languageFilterDefault) {
      literature = filterPostsByTerm(
        literature,
        'language',
        this.props.filters.literature.language
      )
    }

    return literature && literature.length
      ? sortIntoRows(
        literature.map((literature, index) => {
          return (
            <Option
              key={index}
              post={literature}
              addToShipment={this.props.addToShipment}
              addToDownloads={this.props.addToDownloads}
              isMobile={this.props.isMobile}
            />
          )
        }),
        2
      )
      : this.renderNoLiteratureMessage()
  }

  getFilteredAndSortedChipSamples () {
    let chipSamples = this.props.options.chipSamples

    if (!chipSamples || !chipSamples.length) {
      return false
    }

    if (
      this.props.filters.chipSamples.materialType !== materialTypeFilterDefault
    ) {
      chipSamples = filterPostsByTerm(
        chipSamples,
        'material_type',
        this.props.filters.chipSamples.materialType,
        true
      )
    }

    if (!chipSamples || !chipSamples.length) {
      return false
    }

    chipSamples = filterPostsByMeta(
      chipSamples,
      'chip_cant_send_by_mail',
      '1',
      'NOTEQUAL'
    )

    if (!chipSamples || !chipSamples.length) {
      return false
    }

    return this.sortChipSamples(chipSamples)
  }

  renderChipSamples () {
    const chipSamplesGrouped = this.getFilteredAndSortedChipSamples()

    if (!chipSamplesGrouped) {
      return this.renderNoChipMessage()
    }

    return (
      <React.Fragment>
        <div className={`row ${style.group}`}>
          {sortIntoRows(
            chipSamplesGrouped.noChild.map((chipSample, index) => {
              return (
                <Option
                  key={index}
                  post={chipSample}
                  addToShipment={this.props.addToShipment}
                  addToDownloads={this.props.addToDownloads}
                  isMobile={this.props.isMobile}
                />
              )
            }),
            2
          )}
        </div>
        {Object.keys(chipSamplesGrouped).map((chipSampleGroupName, index) => {
          if (chipSampleGroupName === 'noChild') {
            return
          }

          if (
            chipSamplesGrouped[chipSampleGroupName] &&
            chipSamplesGrouped[chipSampleGroupName].length
          ) {
            return (
              <div key={index} className={`row ${style.group}`}>
                <h5 className={style.groupTitle}>{chipSampleGroupName}</h5>
                {sortIntoRows(
                  chipSamplesGrouped[chipSampleGroupName].map(
                    (chipSample, index) => {
                      return (
                        <Option
                          key={index}
                          post={chipSample}
                          addToShipment={this.props.addToShipment}
                          addToDownloads={this.props.addToDownloads}
                          isMobile={this.props.isMobile}
                        />
                      )
                    }
                  ),
                  2
                )}
              </div>
            )
          }
        })}
      </React.Fragment>
    )
  }

  renderNoLiteratureMessage () {
    return (
      <NoResults
        message={'No literature matched your filter selections'}
        className={style.noResults}
      />
    )
  }

  renderNoChipMessage () {
    return (
      <NoResults
        message={'No chip samples matched your filter selections'}
        className={style.noResults}
      />
    )
  }

  render () {
    if (this.props.isLoading) {
      return <Loading />
    }

    return (
      <div className={'row'}>
        {this.props.selected === 'literature'
          ? this.renderLiterature()
          : this.renderChipSamples()}
      </div>
    )
  }

  sortChipSamples (
    chipSamples: Array<ChipSamplePost>
  ): {
    noChild: Array<ChipSamplePost>,
    [string]: ?Array<ChipSamplePost>
  } {
    // we're going to construct an object consisting of
    // a noChild key, which will hold chip samples with no other child material types
    // and a key for each child category we have
    // the key will be the same, and the value will be an array of chip samples
    const sortedChipSamples = {
      noChild: []
    }

    const parentTermID = this.props.filters.chipSamples.materialType

    // if we havent filtered by material type we just return them all in noChild
    if (parentTermID === materialTypeFilterDefault) {
      console.log(chipSamples)
      sortedChipSamples.noChild = sortAlphabeticallyArrayOfTwoLevelObjects(
        'post',
        'post_title',
        chipSamples
      )
      return sortedChipSamples
    }

    chipSamples.forEach(chipSample => {
      if (
        !chipSample.terms.material_type ||
        !chipSample.terms.material_type.length
      ) {
        return
      }

      // counter to let us know if it has been added to any child categories,
      // if it remains at 0, we'll add it to the noChild array
      let counter = 0
      chipSample.terms.material_type.forEach(materialType => {
        // if we have a material type on the chip sample
        // which has a parent equal to the filtered material type
        // then we add that material type to the object (if it doosnt exist)
        // and add the chip sample to the array associated to it
        if (materialType.parent === parentTermID) {
          if (Object.keys(sortedChipSamples).includes(materialType.name)) {
            sortedChipSamples[materialType.name] = [
              ...sortedChipSamples[materialType.name],
              chipSample
            ]
          } else {
            sortedChipSamples[materialType.name] = [chipSample]
          }
          counter += 1
        }
      })

      if (counter === 0) {
        sortedChipSamples.noChild = [...sortedChipSamples.noChild, chipSample]
      }
    })

    // sort chip samples within each category
    Object.keys(sortedChipSamples).forEach(materialType => {
      sortedChipSamples[
        materialType
      ] = sortAlphabeticallyArrayOfTwoLevelObjects(
        'post',
        'post_title',
        sortedChipSamples[materialType]
      )
    })

    return sortedChipSamples
  }
}

export default Options
