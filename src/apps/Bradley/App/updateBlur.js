// @flow

export function updateBlur (shouldBlur: boolean): void {
  const body = document.getElementById('body')
  const app = document.getElementById('app')

  if (body) {
    // prevent scrolling behind the lightbox
    if (shouldBlur) {
      body.style.position = 'relative'
      body.style.overflow = 'hidden'
    } else {
      body.style.position = ''
      body.style.overflow = ''
    }
  } else {
    console.warn('couldnt find body node to update blur')
  }

  if (app) {
    // blur background
    app.style.transition = 'filter 2s'

    if (shouldBlur) {
      app.style.filter = 'blur(10px)'
    } else {
      app.style.filter = 'blur(0px)'
      app.style.transition = ''
    }
  } else {
    console.warn('couldnt find app node to update blur')
  }
}
