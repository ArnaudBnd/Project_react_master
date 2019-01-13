import React from 'react'
import './index.css'

const LeftArrow = (props) => {
  const { goToPrevSlide } = props

  return (
    <div className="backArrow arrow" onClick={goToPrevSlide} />
  )
}

export default LeftArrow
