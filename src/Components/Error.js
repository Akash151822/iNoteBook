import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate(-1)
    }, 1000);
  })
  return (
    <div className='App'>
      Error Page 404
    </div>
  )
}

export default Error
