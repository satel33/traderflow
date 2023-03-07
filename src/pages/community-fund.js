import React, { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper"

import Footer from "../components/Footer"
import Header from "../components/Header"
import { Button } from "../components/Button"
import { Circle } from "../components/Circle"
import { NextIcon, PrevIcon, IllustratoinDesktop } from "../utils/imgImport"
import {
  chain_list,
  community_levels,
  table_head,
  table_body,
} from "../utils/staticData"

const CommunityFundPage = () => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  return (
    <>
      <section className="xxs:community-back overflow-hidden max-xxs:bg-[url(../images/community-back-mob.png)]">
        <Header />
        <div className="container my-[120px] text-center">
          <h1 className="font-heading text-[28px] font-bold leading-[44.8px] text-white xs:text-[32px] sm:text-[60px] sm:leading-[96px]">
            World <span className="gold-linear">First</span>
            <br />
            Onchain Hedgefund
          </h1>
          <p className="mx-auto mb-[12px] max-w-[330px] text-xl text-white xs:max-w-[490px]">
            All traders need to apply with evaluation on Chain, All the
            hedgefunds Trades are recording Onchain
          </p>
          <Button clsName="mt-10 btn-cta">Join now for free</Button>
        </div>

        <div className="container py-28">
          <div className="flex flex-wrap justify-between">
            {chain_list.map((item, idx) => (
              <div
                key={item.content + idx}
                className="mx-20 mb-28 w-[466px] max-xs:mx-10 max-xs:mt-[-50px] max-xs:mb-[130px]"
              >
                {item.kicker && (
                  <p className="text-xl text-gray">{item.kicker}</p>
                )}
                <h4 className="font-heading text-xl font-semibold text-white sm:text-[32px] sm:leading-[44.8px] ">
                  {item.title}
                </h4>
                <p className="text-xl text-gray">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          <h2 className="mx-auto mb-10 max-w-[330px] text-center font-heading text-[32px] font-bold leading-[44.8px] text-white max-xs:mt-[-200px] xs:max-w-[858px] sm:mb-16 sm:text-4xl sm:leading-[57.6px]">
            Go straight to <span className="gold-linear">level 5, 6, 7</span> on
            the below Community hedgefund reward schedule
          </h2>
          <div className="flex flex-wrap justify-center">
            {community_levels.map((item, idx) => (
              <div
                key={item.level + idx}
                className="text-box mx-3 mb-6 w-[306px] py-[35px] text-center max-xs:py-[45px]"
              >
                <p className="text-base text-gray sm:text-xl">{item.deposit}</p>
                <p className="gold-linear font-heading text-2xl sm:text-[32px] sm:leading-[44.8px]">
                  {item.level}
                </p>
                <p className="text-base text-gray sm:text-xl">
                  profit multiplier
                </p>
              </div>
            ))}
          </div>
          <div className="text-box2 mx-auto w-full py-10 md:w-[966px]">
            <p className="mx-auto max-w-[330px] text-base text-white xs:max-w-[551px] sm:text-xl">
              Below is the 15 Levels of Payout Table. At level 10 receive 1
              safety card where if you break Drawdown, you are not booted from
              Hedgefund but just put on 1 week time out.
            </p>
          </div>
          <div className="relative mt-20 mb-10 max-xs:mt-0">
            <div className="absolute hidden h-1 w-full bg-gradient-to-r from-[#050947] to-[#050947] lg:block" />
            <Circle
              left="left-[-11px]"
              top="top-[-4px]"
              hidden="hidden"
              block="block"
            />
            <Circle
              right="right-[-11px]"
              top="top-[-4px]"
              hidden="hidden"
              block="block"
            />
            <div className="absolute top-[90px] hidden h-1 w-full bg-gradient-to-r from-[#050947] to-[#050947] lg:block" />
            <Circle
              left="left-[-12px]"
              top="top-[87px]"
              hidden="hidden"
              block="block"
            />
            <Circle
              right="right-[-12px]"
              top="top-[87px]"
              hidden="hidden"
              block="block"
            />

            <table className="hidden w-full table-auto md:table">
              <thead className="">
                <tr>
                  {table_head.map((item, idx) => (
                    <th
                      scope="col"
                      className="py-[39px] font-heading text-xl font-semibold text-white"
                      key={item + idx}
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table_body.map((item, idx) => (
                  <React.Fragment key={item.balance + idx}>
                    <tr className="relative">
                      <td className="whitespace-nowrap py-3 text-center text-xl text-white">
                        Level {`${idx + 1}`}
                      </td>
                      <td className="py-3 text-center text-xl text-white">
                        {item.balance}
                      </td>
                      <td className="py-3 text-center text-xl text-white">
                        {item.profit_target}
                      </td>
                      <td className="py-3 text-center text-xl text-white">
                        {item.daily_drawdown}
                      </td>
                      <td className="py-3 text-center text-xl text-white">
                        {item.max_drawdown}
                      </td>
                      <td className="py-3 text-center text-xl text-white">
                        {item.profit}
                      </td>
                      <td className="py-3 text-center text-xl text-white">
                        {item.payout}
                      </td>
                    </tr>
                    <tr className="absolute h-[1px] w-full bg-gradient-to-r from-blue-700 to-[#050947]" />
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <Swiper
              onInit={swiper => {
                swiper.params.navigation.prevEl = prevRef.current
                swiper.params.navigation.nextEl = nextRef.current
                swiper.navigation.init()
                swiper.navigation.update()
              }}
              navigation={{
                prevEl: prevRef.current ? prevRef.current : undefined,
                nextEl: nextRef.current ? nextRef.current : undefined,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Navigation]}
              className="md:hidden"
            >
              {table_body.map((item, idx) => (
                <SwiperSlide key={item.profit_target + idx}>
                  <h3 className="gold-linear mb-4 border-b-4 border-blue-gray py-[14px] text-center font-heading text-2xl font-semibold">
                    Level {`${idx + 1}`}
                  </h3>
                  <div className="flex items-center justify-between border-b border-blue-gray py-3">
                    <p className="font-heading text-base text-gray">
                      Account balance
                    </p>
                    <p className="text-base text-gray">{item.balance}</p>
                  </div>
                  <div className="flex items-center justify-between border-b border-blue-gray py-3">
                    <p className="font-heading text-base text-gray">
                      Profit target
                    </p>
                    <p className="text-base text-gray">{item.profit_target}</p>
                  </div>
                  <div className="flex items-center justify-between border-b border-blue-gray py-3">
                    <p className="font-heading text-base text-gray">
                      Daily drawdown
                    </p>
                    <p className="text-base text-gray">{item.daily_drawdown}</p>
                  </div>
                  <div className="flex items-center justify-between border-b border-blue-gray py-3">
                    <p className="font-heading text-base text-gray">
                      Max drawdown
                    </p>
                    <p className="text-base text-gray">{item.max_drawdown}</p>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <p className="font-heading text-base text-gray">Profit</p>
                    <p className="text-base text-gray">{item.profit}</p>
                  </div>
                  <div className="text-box3 mt-2 pt-[19px] pb-[14px] text-center">
                    <p className="font-heading text-xl font-semibold text-gray">
                      Payout
                    </p>
                    <p className="gold-linear font-heading text-[32px] font-semibold leading-[44.8px]">
                      {item.payout}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
              <div className="mt-4 flex justify-between">
                <div
                  className="z-50 flex h-10 w-10 cursor-pointer items-center justify-center border border-white"
                  ref={prevRef}
                >
                  <img src={PrevIcon} alt="prev icon" />
                </div>
                <div
                  className="z-50 flex h-10 w-10 cursor-pointer items-center justify-center border border-white"
                  ref={nextRef}
                >
                  <img src={NextIcon} alt="next icon" />
                </div>
              </div>
            </Swiper>
            <div className="mt-12 text-center">
              <Button clsName="btn-cta">Read Whitepaper</Button>
            </div>
          </div>
        </div>

        <div className="container relative z-10 mt-24 max-xxs:mt-[clamp(100px,65vw,230px)] max-xxxs:mt-[clamp(100px,25vw,150px)] sm:pb-[120px] lg:mt-[200px]">
          <h2 className="relative z-10 mt-12 text-center font-heading text-[36px] font-bold leading-[67.2px] text-white sm:mb-20 lg:text-[56px] ">
            About <span className="gold-linear">Traderflow</span>
          </h2>
          <img
            src={IllustratoinDesktop}
            alt="illustration"
            className="absolute left-[45%] top-[20px] z-0 hidden max-sm:top-[400px]  md:block"
          />
          {/* <img src={Illustratoin} alt='illustration' className="absolute left-[30%] z-0 top-[20px] hidden max-sm:top-[130px] max-xs:block max-xs:top-[170px] " /> */}
          <p className="relative z-10 mx-auto mb-4 max-w-[636px] text-base text-gray sm:text-xl">
            Traderflow intends to bring on-chain auditing of OTC markets and be
            the industry standard over time.{" "}
          </p>
          <p className="relative z-10 mx-auto mb-[80px] max-w-[636px] font-heading text-xl font-semibold text-white max-xxs:mt-[25vw] sm:mb-[150px] sm:text-2xl">
            We plan to increase adoption, increase the number of platforms, and
            make our{" "}
            <span className="gold-linear">"Trust by Verify" (TBV)</span> the
            gold standard and terminology in non-centralized OTC markets.
          </p>
          <div className="text-box4 relative z-10 py-10 sm:pt-[44.5px] sm:pb-[59.5px]">
            <p className="mx-auto max-w-[272px] text-[14px] text-base text-gray sm:max-w-[636px] sm:text-xl">
              We plan to put brokers/scammers/fake educators/risky signals on
              notice: all their fills are now recorded, so we can analyze their
              slippage (price difference from trader's entry to fill) and
              quoting in general. As we increase the number of traders in our
              network and the number of trades recorded on the blockchain, any
              bad actors will be exposed quickly.
            </p>
          </div>
          <div className="my-20">
            <p className="mx-auto mb-4 max-w-[636px] text-xl font-semibold text-white sm:text-2xl">
              Our team is comprised of Forex industry veterans from large
              brokers, ex-interbank Forex traders, and ex-hedge fund traders.
            </p>
            <p className="mx-auto max-w-[636px] text-base text-gray sm:text-xl">
              We believe blockchain was built to regulate these market makers,
              and a big benefit of recording trades from 500+ brokers is not
              just auditing traders and educators selling to traders but also
              auditing brokers with bad reputations.
            </p>
          </div>
          <div className="text-center">
            <Button clsName="btn-cta">Read Whitepaper</Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default CommunityFundPage
