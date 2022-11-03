import { TextareaAutosize } from '@mui/material'
import React from 'react'

const INPUT_TYPE_CLASSES = {
    outlined:'outlined-input',
    borderBottom:'border-bottom-input',
}

const CommonTextarea = ({props,children,inputType}) => {
  return (
    <>
        <TextareaAutosize className={`common-input ${INPUT_TYPE_CLASSES[inputType]}`} {...props}/>
    </>
  )
}

export default CommonTextarea