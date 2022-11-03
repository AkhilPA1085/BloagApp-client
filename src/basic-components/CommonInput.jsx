import React from 'react'

const INPUT_TYPE_CLASSES = {
    outlined:'outlined-input',
    borderBottom:'border-bottom-input',
}

const CommonInput = ({props,children,inputType}) => {
  return (
    <>
        <input className={`common-input ${INPUT_TYPE_CLASSES[inputType]}`} {...props}/>
    </>
  )
}

export default CommonInput