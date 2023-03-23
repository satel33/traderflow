import React from "react"

import Footer from "../components/Footer"
import Header from "../components/Header"
import { Button } from "../components/Button"
import { Modal } from '../components/Modal'
import { CheckIconYellow } from "../utils/imgImport"
import {
  trading__data
} from "../utils/staticData"
const CommunityFundPage = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <section className="bg-[url(../images/competitions-back-desktop.png)] overflow-hidden bg-competition-pos">
        <Header handleOpen={handleOpen} />
        <Modal open={open} handleClose={handleClose} />
        <h1 className="font-heading font-bold text-[56px] text-white text-center mb-[30px] mt-[30px]">Trading <span className="text-[#F5C96D] bg-gradient-to-r from-[#F5C96D] to-[#F5B160] fill-transparent bg-clip-text">Competitions</span></h1>
        <div className="max-w-[1440px] px-[72px] flex justify-between mx-auto max-xl:flex-col ">
          {
            trading__data.map((item, idx) => {
              return (
                <div key={idx} className={`group w-[418px] h-[640px] p-8 mt-7 flex flex-col bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] hover:from-[#f5b86466] hover:to-[#ffe9b000] from-[#062262] to-[#000000] cursor-pointer ${idx === 0
                  ? "clip-path-polygon-[9%_0,_100%_0,_100%_100%,_0_100%,_0_6%]" : idx === 2 ? "clip-path-polygon-[100%_0,_100%_95%,_92%_100%,_0_100%,_0_0]"
                    : ""
                  } max-xl:mx-auto`} onClick={handleOpen}>
                  <h4 className="text-center font-normal text-[20px] mb-[56px] text-white ">{item.period}</h4>
                  <h5 className="text-center font-semibold text-[#F5C96D] bg-gradient-to-r from-[#F5C96D] to-[#F5B160] fill-transparent bg-clip-text mb-2">{item.competition}</h5>
                  <p className="text-center font-body font-bold text-[32px] mb-[64px] text-white">{item.cost}</p>
                  <ul>
                    {item.benefits.map((item, idx) => {
                      return (
                        <li key={item + idx} className="flex items-start mb-2">
                          <img src={CheckIconYellow} alt='Yellow check' />
                          <p className="pl-2 font-normal text-[20px] text-white mt-[-7px]">{item}</p>
                        </li>
                      )
                    })}
                  </ul>
                  <div className="mt-auto">
                    <Button clsName="relative w-full bg-transparent text-[white] group-hover:bg-white group-hover:text-black">Join now</Button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
      <Footer />
    </>
  )
}

export default CommunityFundPage
