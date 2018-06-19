// @flow
import * as React from 'react'
import type { WPTerm } from '../../types/term_types'
import type {
  BimProductAndVariantsFromModelIdsResponse,
  BimProductVariant
} from '../../../api/bradley-apis/documentPackager_client'
import DocumentPackagerApiClient from '../../../api/bradley-apis/documentPackager_client'
import BIMRevitOption from './BIMRevitOption/BIMRevitOption'
import Loading from '../../components/Loading/Loading'
import NoResults from '../../components/NoResults/NoResults'
import style from './BimRevitDownloader.scss'

type Props = {
  bimRevitTermIds: Array<string>,
  showProductPageLinks?: boolean
}

type State = {
  loading: boolean,
  productVariants: Array<BimProductVariant>,
  selected: Array<number>
}

class BimRevitDownloader extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      loading: false,
      productVariants: [
        {
          id: 304,
          name: 'AV30',
          description: null,
          product: {
            id: 274,
            imageUrl:
              '/image/6015/lavatories-bradley_corp-advocate-av30.jpg?size=w100_h100_f',
            name: '1-Station Advocate Lavatory System',
            description: ''
          }
        },
        {
          id: 305,
          name: 'AV60',
          description: null,
          product: {
            id: 275,
            imageUrl:
              '/image/6014/lavatories-bradley_corp-advocate-av60.jpg?size=w100_h100_f',
            name: '2-Station Advocate Lavatory System',
            description: ''
          }
        }
      ],
      selected: []
    }
  }

  componentDidMount () {
    // this.getBimProductVariants()
  }

  componentDidUpdate (prevProps: Props) {
    if (
      this.props.bimRevitTermIds !== prevProps.bimRevitTermIds ||
      this.props.showProductPageLinks !== prevProps.showProductPageLinks
    ) {
      // this.getBimProductVariants()
    }
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
    const allIds = this.state.productVariants.reduce((ids, productVariant) => {
      return [...ids, productVariant.id]
    }, [])
    this.setState({ selected: allIds })
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
        <button className={`${style.download}`}>{'DOWNLOAD SELECTED'}</button>
        <button className={`${style.downloadAll}`}>{'DOWNLOAD ALL'}</button>
      </div>
    )
  }

  render () {
    console.log(this.state)
    return this.state.loading ? (
      <Loading />
    ) : this.state.productVariants.length === 0 ? (
      <NoResults message={'No related BIM files found.'} />
    ) : (
      <div className={`row ${style.BimRevit}`}>
        <div>{this.renderBimRevitOptions()}</div>
        {this.renderButtons()}
      </div>
    )
  }

  async getBimProductVariants () {
    this.setState({ loading: true })

    try {
      const client = new DocumentPackagerApiClient()
      const response = await client.getBimProductsAndVariantsFromModelIds(
        this.props.bimRevitTermIds
      )

      const productVariants: Array<BimProductVariant> =
        response.data.bimProductVariants

      return this.setState({ productVariants, loading: false })
    } catch (err) {
      console.log(err)
      this.setState({ loading: false })
    }
  }
}

export default BimRevitDownloader
