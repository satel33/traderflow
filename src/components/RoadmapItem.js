import React from "react"
import { CheckBox } from "./CheckBox"

export const RoadmapItem = ({ height, list, quater }) => {
  return (
    <div
      className={`mb-10 flex flex-col justify-between border-white pl-[22px] h-[${height}] lg:mb-0 lg:border-l-4`}
    >
      <ul>
        {list.map(item => (
          <li key={item.name} className="mb-2 flex items-baseline">
            <CheckBox status={item.status} />
            <p
              className={`ml-2 text-xl text-gray-light ${
                item.status ? "line-through opacity-50" : ""
              }`}
            >
              {item.name}
            </p>
          </li>
        ))}
      </ul>
      <p className="mb-[6px] mt-5 font-heading text-xl font-semibold text-white">
        {quater}
      </p>
    </div>
  )
}
