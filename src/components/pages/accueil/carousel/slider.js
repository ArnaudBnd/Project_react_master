import React, { Component } from 'react'
import Slide from './slide'
import LeftArrow from './leftArrow'
import RightArrow from './rightArrow'
import imgFoot from '../img/foot.png'
import imgtennis from '../img/tennis.png'

import './index.css'

class Slider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: [
        imgtennis,
        imgFoot
      ],
      currentIndex: 0,
      translateValue: 0
    }

    this.goToPrevSlide = this.goToPrevSlide.bind(this)
    this.goToNextSlide = this.goToNextSlide.bind(this)
    this.slideWidth = this.slideWidth.bind(this)
  }

  goToPrevSlide() {
    const { currentIndex } = this.state
    console.log(currentIndex)
    if (currentIndex === 0) {
      return
    }

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue + this.slideWidth()
    }))
  }

  goToNextSlide() {
    const { currentIndex, images } = this.state

    if (currentIndex === images.length - 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      })
    }

    return this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue + -(this.slideWidth())
    }))
  }

  slideWidth() {
    return document.querySelector('.slide').clientWidth
  }

  render() {
    const { images, translateValue } = this.state

    return (
      <div className="slider">
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(${translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}
        >
          {
              images.map((image, i) => (
                <Slide key={i} image={image} />
              ))
            }
        </div>

        <LeftArrow goToPrevSlide={this.goToPrevSlide} />
        <RightArrow goToNextSlide={this.goToNextSlide} />
      </div>
    )
  }
}

export default Slider
