function LightboxException (type, info) {
  this.name = 'LightboxException'

  switch (type) {
    case 'number children':
      this.message = `Lightbox component expects exactly two children, ${info} given`
  }
}

export default LightboxException
