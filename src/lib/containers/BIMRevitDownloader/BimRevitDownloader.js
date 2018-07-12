// @flow
import * as React from 'react'
import type { BimProductVariant } from '../../../api/bradley-apis/documentPackager_client'
import DocumentPackagerApiClient from '../../../api/bradley-apis/documentPackager_client'
import BIMRevitOption from './BIMRevitOption/BIMRevitOption'
import Loading from '../../components/Loading/Loading'
import NoResults from '../../components/Error/NoResults/NoResults'
import style from './BimRevitDownloader.scss'

/**
 * A micro app for displaying, selecting, and downloading BIM files.
 *
 * Given some bim revit term ids (called model IDs in Bradley's system),
 * we query the documentPackager to get meta data
 * for the avilable bim files of all related product variants.
 * (preview thumbnail, title, id etc).
 *
 * The relation is like so:
 * Bim Revit Term ID (one) => (many) Product Variants
 *
 * We display these in a small app, allowing the user to select the files
 * they'd like to download.
 *
 * We send the selected product variant ids off to the documentPackager,
 * which returns a link to download the actual BIM files packaged up as a zip
 */

type Props = {
  /**
   * These actually relate to 'model IDs' in Bradley's system,
   * but for us they're usually input to the CMS as bim revit tags
   * (eg on the product post type)
   */
  bimRevitTermIds: Array<string>,
  /**
   * Show a 'Product Page' link in each displayed bim revit file option
   */
  showProductPageLinks?: boolean
}

type State = {
  loading: boolean,
  /**
   * Once we get the requested product variants from the documentPackager
   * we store them here on state
   */
  productVariants: Array<BimProductVariant>,
  /**
   * Store the IDs of the selected product variants in an array
   */
  selected: Array<number>
}

class BimRevitDownloader extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      loading: false,
      productVariants: [],
      selected: []
    }
  }

  componentDidMount () {
    this.getBimProductVariants()
  }

  componentDidUpdate (prevProps: Props) {
    if (this.props.bimRevitTermIds !== prevProps.bimRevitTermIds) {
      this.getBimProductVariants()
    }
  }

  downloadAll () {
    this.downloadFiles(this.getAllIds())
  }

  downloadSelected () {
    this.downloadFiles(this.state.selected)
  }

  toggleSelect (id: number) {
    const index = this.state.selected.indexOf(id)

    if (index === -1) {
      // if it doest exist then we add it
      return this.setState({ selected: [...this.state.selected, id] })
    } else {
      // otherwise we remove it
      const selected = [...this.state.selected]
      selected.splice(index, 1)

      this.setState({ selected })
    }
  }

  selectAll () {
    this.setState({ selected: this.getAllIds() })
  }

  unselectAll () {
    this.setState({ selected: [] })
  }

  renderBimRevitOptions () {
    return this.state.productVariants.map((productVariant, index) => {
      return (
        <BIMRevitOption
          key={index}
          productVariant={productVariant}
          toggleSelect={this.toggleSelect.bind(this)}
          downloadFiles={this.downloadFiles.bind(this)}
          selected={this.state.selected.includes(productVariant.id)}
          showProductPageLinks={this.props.showProductPageLinks}
        />
      )
    })
  }

  renderButtons () {
    return (
      <div className={`col1 ${style.buttons}`}>
        <button
          className={`button-border-dark-gray ${style.select}`}
          onClick={this.selectAll.bind(this)}>
          {'SELECT ALL'}
        </button>
        <button
          className={`button-border-red ${style.unselect}`}
          onClick={this.unselectAll.bind(this)}>
          {'UNSELECT ALL'}
        </button>
        <button
          className={`${style.download}`}
          onClick={this.downloadSelected.bind(this)}>
          {'DOWNLOAD SELECTED'}
        </button>
        <button
          className={`${style.downloadAll}`}
          onClick={this.downloadAll.bind(this)}>
          {'DOWNLOAD ALL'}
        </button>
      </div>
    )
  }

  render () {
    console.log(this.state)
    return this.state.loading ? (
      <Loading />
    ) : this.state.productVariants.length === 0 ? (
      <NoResults message={'No related BIM files found.'} hideCTA />
    ) : (
      <div className={`row ${style.BimRevit}`}>
        <div>{this.renderBimRevitOptions()}</div>
        {this.renderButtons()}
      </div>
    )
  }

  getAllIds () {
    return this.state.productVariants.reduce((ids, productVariant) => {
      return [...ids, productVariant.id]
    }, [])
  }

  async getBimProductVariants () {
    this.setState({ loading: true })

    try {
      const client = new DocumentPackagerApiClient()
      const response = await client.getBimProductsAndVariantsFromModelIds(
        this.props.bimRevitTermIds
      )

      console.log(response)

      const productVariants: Array<BimProductVariant> =
        response.data.bimProductVariants

      return this.setState({ productVariants, loading: false })
    } catch (err) {
      console.log(err)
      this.setState({ loading: false })
    }
  }

  downloadFiles (variantIds: Array<number>, name?: string): Promise<void> {
    const client = new DocumentPackagerApiClient()
    return client.downloadFiles(variantIds, name)
  }
}

export default BimRevitDownloader
