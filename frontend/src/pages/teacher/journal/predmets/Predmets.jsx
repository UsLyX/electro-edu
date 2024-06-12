import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Predmets = () => {

  const params = useParams()

  return (
    <div>
      Predmets {params.class}
    </div>
  )
}

export default Predmets
