import React from 'react'

function Title({title,subtitle,align,font,color}) {
  return (
    <div className={`flex flex-col items-${align}  mt-20`}>
      <h1 className={`text-5xl ${font || 'font-playFair'}  text-{${color} || 'black'}   text-${align} `}>{title}</h1>
      <p className={`text-sm text-gray-500 w-2xl mt-6 text-${align}  max-lg:w-xs `}  >{subtitle}</p>
    </div> 
  )
}

export default Title
