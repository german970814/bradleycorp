function TechnicalInfoException (error) {
  this.name = 'TechnicalInfoException'
  this.message = `Error getting technical info. Failed with message ${error}`
}

export default TechnicalInfoException
