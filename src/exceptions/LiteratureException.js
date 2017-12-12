function LiteratureException (error) {
  this.name = 'LiteratureException'
  this.message = `Error getting literature. Failed with message ${error}`
}

export default LiteratureException
