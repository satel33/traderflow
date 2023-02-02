import React from "react"

export const Button = ({
  type = "primary",
  text = "",
  clsName = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`border-[1px] border-white px-6 py-[13px] font-heading text-base font-medium leading-[22px] sm:px-8 sm:py-4 sm:text-[18px] sm:leading-6 ${
        type === "primary"
          ? "bg-white text-black hover:text-blue-gray hover:shadow-button"
          : "bg-transparent text-white hover:drop-shadow-button"
      } ${clsName}`}
      {...props}
    >
      {children}
    </button>
  )
}
