import React from 'react'
import PropTypes from 'prop-types'
import ScrollableList from './ScrollableList'
import Lightbox from '../Lightbox/Lightbox'
import fitLightbox from '../Lightbox/fitLightbox'
import style from './ScrollableList.scss'

class ScrollableListOpensInLightbox extends ScrollableList {
  // NOTE: pass as children a React.Fragment element with two children
  // first child is to be displayed normally, second is to be displayed in lightbox

  renderButtonUpLightbox () {
    if (!this.props.positionButtonsBelow) {
      return this.buttonUpLightbox()
    }
  }

  buttonUpLightbox () {
    return (
      <div
        className={[style.buttonUpLightbox, this.props.buttonUpContainerClassName].join(' ')}
        onClick={ (e) => { this.moveList(e, 1) } } >
        {this.props.buttonUp}
      </div>
    )
  }

  renderButtonDownLightbox () {
    if (!this.props.positionButtonsBelow) {
      return this.buttonDownLightbox()
    }
  }

  buttonDownLightbox () {
    return (
      <div
        className={[style.buttonDownLightbox, this.props.buttonDownContainerClassName].join(' ')}
        onClick={ (e) => { this.moveList(e, -1) } } >
        {this.props.buttonDown}
      </div>
    )
  }

  renderChildren () {
    const LightboxScrollerContentFitsLightbox = fitLightbox(LightboxScrollerContent)

    const displayChildren = this.getChildrenToDisplay()
    const displayChildrenSorted = this.sortChildrenByPosition(displayChildren)

    return displayChildrenSorted.map((child, index) => {
      const components = React.Children.toArray(child.component.props.children)

      return (
        <li
          key={index}
          className={this.props.listItemClassName} >

          <Lightbox>

            {components[0]}

            <LightboxScrollerContentFitsLightbox
              renderButtonUp={this.renderButtonUpLightbox.bind(this)}
              renderButtonDown={this.renderButtonDownLightbox.bind(this)}
              wrapperClassName={this.props.wrapperClassName}
              ulClassName={this.props.ulClassName} >
              {components[1]}
            </LightboxScrollerContentFitsLightbox>

          </Lightbox>

        </li>
      )
    })
  }

  render () {
    return super.render()
  }
}

// we need this so we can combine props passed from both the parent ScrollableList and parent Lightbox
const LightboxScrollerContent = props => {
  const LightboxCloseButton = props.lightboxCloseButton

  const dims = {
    width: props.style.width,
    height: props.style.height
  }

  return (
    <div
      style={dims}
      className={props.wrapperClassName} >

      {props.renderButtonUp()}

      <div
        className={[props.ulClassName, style.inheritHeight].join(' ')} >
        {props.children}
      </div>

      {props.renderButtonDown()}

      <LightboxCloseButton
        onClick={props.lightboxCloseButtonOnClick} />

    </div>
  )
}

LightboxScrollerContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  renderButtonUp: PropTypes.func.isRequired,
  renderButtonDown: PropTypes.func.isRequired,
  wrapperClassName: PropTypes.string,
  ulClassName: PropTypes.string,
  // from lightbox
  lightboxCloseButton: PropTypes.func,
  lightboxCloseButtonOnClick: PropTypes.func,
  style: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  })
}

export default ScrollableListOpensInLightbox
