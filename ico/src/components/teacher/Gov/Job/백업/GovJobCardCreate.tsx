import React from 'react'
import GovJobCard from './GovJobCard'

function GovJobCardCreate({inputState}: {inputState?: any}) {
  return (
    <GovJobCard job={inputState.title} wage={inputState.sub.wage} backgroundColor={inputState.sub.backgroundColor} imgUrl={inputState.sub.imgUrl} />
  )
}

export default GovJobCardCreate