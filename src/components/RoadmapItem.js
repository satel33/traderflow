import React from "react"
import { CheckBox } from "./CheckBox"
import { Circle } from './Circle'
import { Platform, MiniPlatform, GreaterThan, PlatformMobile } from "../utils/imgImport"

export const RoadmapItem = ({ height, list, quater }) => {

  return (
    <div
      className={`relative max-lg:pb-10 flex lg:flex-col lg:w-[25%] flex-col-reverse ${height === '3tt' ? 'lg:h-[291px]' : ' '} ${height === '4st' ? 'lg:h-[191px]' : ' '} ${height === '5st' ? 'lg:h-[271px]' : ' '} justify-between pl-[22px] ${height === '1st' ? 'lg:h-[480px]' : ' '} ${height === '2tt' ? 'lg:h-[230px]' : ' '} lg:mb-0 lg:ml-1 ${height === '5th' ? 'lg:w-[350px]' : ''} `}
    >
      <div className={`absolute w-full h-full border-l-5 border-[#050947] lg:border-t-0 lg:border-l-4 z-30 left-[-4px]`} />
      <img
        src={Platform}
        alt="platform"
        className={`lg:left-[-95px] lg:bottom-[-80px] z-0  absolute max-lg:left-[-95px] hidden max-lg:top-[-20px] max-lg:rotate-90 ${height === '1st' ? 'lg:block' : 'hidden'}`}
      />
      <img
        src={PlatformMobile}
        alt="platform"
        className={`lg:left-[-100px] lg:bottom-[-85px] z-0  absolute hidden left-[-35px] top-[5px] ${height === '1st' ? 'max-lg:block' : 'hidden'}`}
      />
      {/* <img
        src={BrightBlue}
        alt="bright blue"
        className={`bottom-[-70px] left-[-121px] z-20 hidden lg:absolute ${height === '1st' ? 'lg:block' : 'none'}`}
      /> */}
      <img
        src={MiniPlatform}
        alt="mini platform"
        className={`lg:bottom-[-40px] lg:left-[170px] z-20 hidden lg:absolute ${height === '1st' ? 'lg:block' : 'none'}`}
      />
      <p className={`top-[20px] max-lg:left-[clamp(150px,60%,260px)] text-[#5678B9] ${height === '1st' ? 'block absolute ' : 'hidden'} z-20 lg:absolute ${height === '1st' ? 'lg:block' : ''} lg:top-[-50px] lg:left-[-45px] text-base`}>We are here.</p>
      <Circle left="left-[-6px]" top="top-[-10px]" hidden="hidden" block="block" />
      <ul>
        {list.map(item => (
          <li key={item.name} className="mb-2 flex ">
            <CheckBox status={item.status} />
            <p
              className={`ml-2 mt-[-5px] pt-0 text-xl text-gray-light ${item.status ? "line-through opacity-50" : ""
                }`}
            >
              {item.name}
            </p>

          </li>
        ))}
      </ul>
      <img src={GreaterThan} alt='vector' className={`absolute z-40 ${height === '5th' ? 'block' : 'hidden'} rotate-90 lg:rotate-0 left-[-15px] bottom-[-20px] lg:right-[-150px] lg:top-[205px] lg:left-[200px] `} />
      <p className={`relative mb-[25px] mt-5 font-heading text-xl font-semibold border-b-[5px] ${height === '1st' ? 'max-lg:w-[clamp(260px,70%,380px)]' : ''} z-10 w-max pr-5 border-[#050947] lg:border-b-0 ml-[-22px] lg:ml-0 pl-[20px] lg:pl-0  text-white lg:mb-[6px]`}>
        <Circle left="right-[-10px]" bottom="bottom-[-6px]" />
        {quater}

      </p>
    </div >
  )
}
