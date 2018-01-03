import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../globals'
import ScrollableList from '../ScrollableList/ScrollableList'
import ButtonNext from './ButtonNext'
import ButtonPrev from './ButtonPrev'
import ButtonLeft from './ButtonLeft'
import ButtonRight from './ButtonRight'
import style from './SimpleSlider.scss'

class SimpleSlider extends Component {
  constructor (props) {
    super(props)

    this.renderTitle = this.renderTitle.bind(this)
  }

  renderTitle () {
    if (this.props.title !== undefined &&
    this.props.title !== '') {
      return (
        <h2
          className={style.title} >
          {this.props.title}
        </h2>
      )
    }
  }

  render () {
    const buttonUpMobile = this.props.nextPrevButtonsForMobile
      ? <ButtonPrev />
      : <ButtonLeft />

    const buttonDownMobile = this.props.nextPrevButtonsForMobile
      ? <ButtonNext />
      : <ButtonRight />

    return (
      <React.Fragment>

        {this.renderTitle()}

        <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
          {match =>
            match ? (
              // mobile
              <ScrollableList
                numberToDisplay={this.props.numberMobile}
                buttonUp={buttonUpMobile}
                buttonDown={buttonDownMobile}
                positionButtonsBelow={this.props.nextPrevButtonsForMobile}
                reverseScroll={true}
                ulClassName={[style.sliderUlTablet, this.props.ulClassName].join(' ')}
                listItemClassName={[style.listItem, this.props.listItemClassName].join(' ')}
                buttonUpContainerClassName={style.buttonUpContainer}
                buttonDownContainerClassName={style.buttonDownContainer}
                buttonsBelowClassName={style.buttonsBelow} >
                {this.props.children}
              </ScrollableList>
            ) : (
              <Media query={{ minWidth: TABLETMAXWIDTH }}>
                {match =>
                  match ? (
                    // desktop
                    <ScrollableList
                      numberToDisplay={this.props.numberDesktop}
                      buttonUp={<ButtonLeft />}
                      buttonDown={<ButtonRight />}
                      positionButtonsBelow={false}
                      reverseScroll={true}
                      wrapperClassName={[style.sliderTabletDesktop, this.props.desktopWrapperClassName].join(' ')}
                      ulClassName={[style.sliderUlTablet, this.props.ulClassName].join(' ')}
                      listItemClassName={[style.listItem, this.props.listItemClassName].join(' ')}
                      buttonUpContainerClassName={style.buttonUpContainer}
                      buttonDownContainerClassName={style.buttonDownContainer}
                      buttonsBelowClassName={style.buttonsBelow} >
                      {this.props.children}
                    </ScrollableList>
                  ) : (
                    // tablet
                    <ScrollableList
                      numberToDisplay={this.props.numberTablet}
                      buttonUp={<ButtonLeft />}
                      buttonDown={<ButtonRight />}
                      positionButtonsBelow={false}
                      reverseScroll={true}
                      wrapperClassName={[style.sliderTabletDesktop, this.props.desktopWrapperClassName].join(' ')}
                      ulClassName={[style.sliderUlTablet, this.props.ulClassName].join(' ')}
                      listItemClassName={[style.listItem, this.props.listItemClassName].join(' ')}
                      buttonUpContainerClassName={style.buttonUpContainer}
                      buttonDownContainerClassName={style.buttonDownContainer}
                      buttonsBelowClassName={style.buttonsBelow} >
                      {this.props.children}
                    </ScrollableList>
                  )
                }
              </Media>
            )
          }
        </Media>

      </React.Fragment>
    )
  }
}

SimpleSlider.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  numberMobile: PropTypes.number.isRequired,
  numberTablet: PropTypes.number.isRequired,
  numberDesktop: PropTypes.number.isRequired,
  nextPrevButtonsForMobile: PropTypes.bool.isRequired,
  desktopWrapperClassName: PropTypes.string,
  ulClassName: PropTypes.string,
  listItemClassName: PropTypes.string
}

export default SimpleSlider
