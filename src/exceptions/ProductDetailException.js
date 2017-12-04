function ProductDetailException (error) {
  this.name = 'ProductDetailException'
  this.message = `Error getting product details. Network requests failed with message ${error}`
}

export default ProductDetailException
