import React from "react"
import { CheckIcon } from "../utils/imgImport"

export const CheckBox = ({ status }) => {
  return (
    <div
      className={`flex h-5 w-5 shrink-0 items-center justify-center border-[1px] border-white ${
        status ? "bg-white" : "bg-radial"
      }`}
    >
      {status && <img src={CheckIcon} alt="check icon" />}
    </div>
  )
}
