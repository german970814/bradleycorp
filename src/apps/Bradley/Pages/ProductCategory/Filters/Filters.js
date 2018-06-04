// @flow
import * as React from 'react'
import type { FiltersType, ActiveFilterType } from '../ProductCategory'
import LeftSidebarCheckboxGroup from '../../../../../lib/components/BCorpFilterField/LeftSidebarCheckboxGroup/LeftSidebarCheckboxGroup'
import style from './Filters.scss'

type Props = {
  filters: FiltersType,
  activeFilters: ActiveFilterType,
  catParentTitle?: string,
  catSlug: string,
  updateMetaProductAttributesActiveFilters: (
    attName: string,
    newValues: Array<string>
  ) => void,
  updateMetaOtherActiveFilters: (newFilters: Array<string>) => void,
  updateTaxActiveFilters: (tax: string, newFilters: Array<string>) => void
}

class Filters extends React.Component<Props> {
  renderMetaFilters () {
    const { filters } = this.props
    const { activeFilters } = this.props

    if (!filters || !filters.metaFilters) {
      return null
    }

    let MetaFiltersElements = []

    // we have to do each meta filter as a special case
    // since it isnt just a case of listing all of them
    //
    // each one needs its own title and option
    if (filters.metaFilters.product_new_until) {
      const option = {
        product_new_until: this.createLabelWithCount(
          'New Product',
          filters.metaFilters['product_new_until']
        )
      }

      const filterState =
        activeFilters.metaFilters &&
        activeFilters.metaFilters.other &&
        activeFilters.metaFilters.other.includes('product_new_until')
          ? ['product_new_until']
          : []

      MetaFiltersElements = [
        ...MetaFiltersElements,
        <LeftSidebarCheckboxGroup
          key={'New'}
          className={style.checkbox}
          options={option}
          title={'New'}
          filterState={filterState}
          updateFilters={this.props.updateMetaOtherActiveFilters}
        />
      ]
    }

    // product attributes
    if (filters.metaFilters.product_attributes) {
      const productAttributes = filters.metaFilters.product_attributes

      Object.keys(productAttributes).forEach(attName => {
        const options = {}

        if (productAttributes[attName]) {
          Object.keys(productAttributes[attName]).forEach(attValue => {
            options[attValue] = this.createLabelWithCount(
              attValue,
              productAttributes[attName][attValue]
            )
          })
        }

        const filterState =
          activeFilters.metaFilters &&
          activeFilters.metaFilters.product_attributes &&
          activeFilters.metaFilters.product_attributes[attName]
            ? activeFilters.metaFilters.product_attributes[attName]
            : []

        MetaFiltersElements = [
          ...MetaFiltersElements,
          <LeftSidebarCheckboxGroup
            key={attName}
            className={style.checkbox}
            options={options}
            title={attName}
            filterState={filterState}
            updateFilters={newFilters => {
              this.props.updateMetaProductAttributesActiveFilters(
                attName,
                newFilters
              )
            }}
          />
        ]
      })
    }

    return MetaFiltersElements
  }

  renderTaxFilters () {
    const { filters } = this.props
    const { activeFilters } = this.props

    if (!filters || !filters.taxFilters) {
      return null
    }

    return (
      <React.Fragment>
        {this.props.catParentTitle && (
          <h6 className={style.parentTitle}>{this.props.catParentTitle}</h6>
        )}
        {Object.keys(filters.taxFilters).map((taxName, index) => {
          const options = {}

          if (filters.taxFilters[taxName].terms.length === 0) {
            return null
          }

          Object.keys(filters.taxFilters[taxName].terms).forEach(term => {
            // no need to show filter for actual category
            if (taxName === 'product_category' && term === this.props.catSlug) {
              return
            }

            const termObj = filters.taxFilters[taxName].terms[term]
            options[term] = this.createLabelWithCount(
              termObj.name,
              termObj.count
            )
          })

          return (
            <LeftSidebarCheckboxGroup
              key={index}
              className={style.checkbox}
              options={options}
              title={filters.taxFilters[taxName].name}
              filterState={activeFilters.taxFilters[taxName] || []}
              updateFilters={newFilters => {
                this.props.updateTaxActiveFilters(taxName, newFilters)
              }}
            />
          )
        })}
      </React.Fragment>
    )
  }

  render () {
    return (
      <div className={style.filters}>
        {this.renderMetaFilters()}
        {this.renderTaxFilters()}
      </div>
    )
  }

  createLabelWithCount (text: string, count: number): string {
    return `${text} <span class="checkbox-filter-count">(${count.toString()})</span>`
  }
}

export default Filters
