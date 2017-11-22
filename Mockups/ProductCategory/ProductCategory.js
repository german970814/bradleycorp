//Product Category container will hold state relevant to both filters and the products

class ProductCategory extends Component {
  // initialise state with empty filters object
  constructor(props) {
    super(props)

    this.state = { filters: {} }
  }

  // send a network request to get the category filters for this product category and set the initial state
  // filters object contains page and object of 'categories' to include in filters
  // expects a top level category to be given in props
  componentWillMount() {
    let filters = {}

    filters.topLevelCat = this.props.category
    filters.categories = getCategoryFilters()

    this.setState({ filters })
  }

  // when filters are changed in the sidebar this will be run to update the filter state
  // therefore changing both filter ui and products shown
  handler(e, filters) {
    e.preventDefault()

    this.setState({ filters })
  }

  //Product Category Page render function
  render() {
    return (
      <div>

        <h1>Propduct Category Name</h1>

        <ProductFilters
          filters={this.state.filters}
          handler={this.handler.bind(this)} /> //bind handler to this and pass it to child so child can change parent state

        <Products
          filters={this.state.filters} />

      </div>
    )
  }
}



<ProductCategory />
//this page will hold the top level filters state and pass it as props

<ProductFilters />
// this is the container displaying the filters sidebar
// this can update the top level filters via the handler passed to it as props

<Products />
// includes the paging at the top and bottom
// responsible for AJAX requests to get and display the product data given the filters
// we can get up to 100 products at a time with wp query, but only display 20.
// we can do a lazy load where the first 20 are requested then the next 80



filters: {
  topLevelCat: //top level category,
  categories: [
    cat1: {

    }
  ]
}
