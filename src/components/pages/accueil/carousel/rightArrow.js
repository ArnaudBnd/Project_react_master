import React from 'react'
import './index.css'

const RightArrow = (props) => {
  const { goToNextSlide } = props

  return (
    <div className="nextArrow arrow" onClick={goToNextSlide} />
  )
}

export default RightArrow
