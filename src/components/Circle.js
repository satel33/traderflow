import React from 'react'

function Circle({ left, right, top, bottom, color, hidden, block }) {
  const display = block ? "lg:block" : 'lg:hidden'
  const show = hidden ? 'hidden' : 'block'
  return (
    <span className={`absolute w-2 h-2 ring-[5px] ring-[#050947] rounded-full ${left} ${bottom} ${top} ${right} ${show} ${display}`} />
  )
}

export {
  Circle
}