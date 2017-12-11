function ProductDetailException (error) {
  this.name = 'ProductDetailException'
  this.message = `Error getting product details. Failed with message ${error}`
}

export default ProductDetailException
