
import { Button } from '@mui/material'
import React from 'react'

const BUTTON_TYPE_CLASSES = {
  outlined:"outlined-button",
  filled:"filled-button",
}


const CommonButton = ({children,buttonType,props}) => {
  return (
    <>
        <Button className={`common-btn ${BUTTON_TYPE_CLASSES[buttonType]}`} {...props}>{children}</Button>
    </>
  )
}

export default CommonButton