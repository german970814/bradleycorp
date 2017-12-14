function ProductDetailTabsException (error) {
  this.name = 'ProductDetailTabsException'
  this.message = `Error getting product details tabs. Failed with message ${error}`
}

export default ProductDetailTabsException
