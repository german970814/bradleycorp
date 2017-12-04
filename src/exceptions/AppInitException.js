function AppInitException (error) {
  this.name = 'AppInitException'
  this.message = `App init network requests failed with message ${error}`
}

export default AppInitException
