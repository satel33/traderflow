import React from "react"

import Footer from "../components/Footer"
import Header from "../components/Header"
import { Button } from "../components/Button"
import { Modal } from "../components/Modal"
import { CheckIconYellow } from "../utils/imgImport"
import { trading__data } from "../utils/staticData"
const CommunityFundPage = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <section className="bg-competition-pos overflow-hidden bg-[url(../images/competitions-back-desktop.png)] bg-no-repeat">
        <Header handleOpen={handleOpen} />
        <Modal open={open} handleClose={handleClose} />
        <h1 className="mb-[30px] mt-[30px] text-center font-heading text-[36px] font-bold text-white sm:text-[56px]">
          Trading{" "}
          <span className="bg-gradient-to-r from-[#F5C96D] to-[#F5B160] bg-clip-text fill-transparent text-[#F5C96D] duration-300 ease-in-out">
            Competitions
          </span>
        </h1>
        <div className="mx-auto flex max-w-[1440px] justify-between px-[10px] max-lg:flex-col xl:px-[72px] ">
          {trading__data.map((item, idx) => {
            return (
              <div
                key={idx}
                className={`group mt-7 flex w-[300px] cursor-pointer flex-col bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#062262] to-[#000000] p-4  hover:from-[#f5b86466] hover:to-[#ffe9b000] sm:h-auto sm:w-[348px] lg:h-[640px] lg:w-[330px] lg:p-5 xxl:w-[380px] xl:w-[418px] xl:p-8 ${
                  idx === 0
                    ? "clip-path-polygon-[9%_0,_100%_0,_100%_100%,_0_100%,_0_6%]"
                    : idx === 2
                    ? "clip-path-polygon-[100%_0,_100%_95%,_92%_100%,_0_100%,_0_0]"
                    : ""
                } duration-300  ease-in-out max-xl:mx-auto`}
              >
                <h4 className="mb-[56px] text-center text-[16px] font-normal text-white sm:text-[20px] ">
                  {item.period}
                </h4>
                <h5 className="mb-2 bg-gradient-to-r from-[#F5C96D] to-[#F5B160] bg-clip-text fill-transparent text-center font-semibold text-[#F5C96D]">
                  {item.competition}
                </h5>
                <p className="mb-[34px] text-center font-body text-[26px] font-bold text-white sm:mb-[64px] sm:text-[32px]">
                  {item.cost}
                </p>
                <ul>
                  {item.benefits.map((item, idx) => {
                    return (
                      <li key={item + idx} className="mb-2 flex items-start">
                        <img
                          src={CheckIconYellow}
                          alt="Yellow check"
                          className="h-[18px] w-[18px] sm:h-[24px] sm:w-[24px]"
                        />
                        <p className="mt-[-3px] pl-2 text-[13px] font-normal text-white sm:mt-[-7px] sm:text-[20px]">
                          {item}
                        </p>
                      </li>
                    )
                  })}
                </ul>
                <div className="mt-[34px] mb-3 lg:mb-0 lg:mt-auto">
                  <Button
                    type="secondary"
                    clsName="relative w-full group-hover:bg-white group-hover:text-black py-[10px]"
                    onClick={handleOpen}
                  >
                    Join now
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default CommunityFundPage
