import React, { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper"

import Footer from "../components/Footer"
import Header from "../components/Header"
import { Button } from "../components/Button"
import { NextIcon, PrevIcon } from "../utils/imgImport"
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
      <section className="community-back">
        <Header />
        <div className="container my-[120px] text-center">
          <h1 className="font-heading text-[32px] font-bold leading-[44.8px] text-white sm:text-[80px] sm:leading-[96px]">
            World <span className="gold-linear">First</span>
            <br />
            Onchain Hedgefund
          </h1>
          <p className="mx-auto mb-[12px] max-w-[490px] text-xl text-white">
            All traders need to apply with evaluation on Chain, All the
            hedgefunds Trades are recording Onchain
          </p>
          <Button clsName="mt-10 btn-cta">Join now for free</Button>
        </div>

        <div className="container py-28">
          <div className="flex flex-wrap justify-between">
            {chain_list.map(item => (
              <div className="mx-20 mb-28 w-[466px]">
                {item.kicker && (
                  <p className="text-xl text-gray">{item.kicker}</p>
                )}
                <h4 className="font-heading text-2xl font-semibold text-white sm:text-[32px] sm:leading-[44.8px]">
                  {item.title}
                </h4>
                <p className="text-xl text-gray">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          <h2 className="mx-auto mb-10 max-w-[858px] text-center font-heading text-[32px] font-bold leading-[44.8px] text-white sm:mb-16 sm:text-5xl sm:leading-[57.6px]">
            Go straight to <span className="gold-linear">level 5, 6, 7</span> on
            the below Community hedgefund reward schedule
          </h2>
          <div className="flex flex-wrap justify-center">
            {community_levels.map(item => (
              <div
                key={item.level}
                className="text-box mx-3 mb-6 w-[306px] py-[35px] text-center"
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
            <p className="mx-auto max-w-[551px] text-base text-white sm:text-xl">
              Below is the 15 Levels of Payout Table. At level 10 receive 1
              safety card where if you break Drawdown, you are not booted from
              Hedgefund but just put on 1 week time out.
            </p>
          </div>
          <div className="mt-20 mb-10">
            <table class="hidden w-full table-auto md:table">
              <thead className="border-y-2 border-white">
                <tr>
                  {table_head.map(item => (
                    <th
                      scope="col"
                      className="py-[39px] font-heading text-xl font-semibold text-white"
                      key={item}
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table_body.map((item, idx) => (
                  <tr className="border-b border-white" key={idx}>
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
                <SwiperSlide key={idx}>
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

        <div className="container mt-48 pb-[200px] sm:mt-72 sm:pb-[120px]">
          <h2 className="mb-12 text-center font-heading text-[56px] font-bold leading-[67.2px] text-white sm:mb-20">
            About <span className="gold-linear">Traderflow</span>
          </h2>
          <p className="mx-auto mb-4 max-w-[636px] text-base text-gray sm:text-xl">
            Traderflow intends to bring on-chain auditing of OTC markets and be
            the industry standard over time.{" "}
          </p>
          <p className="mx-auto mb-40 max-w-[636px] font-heading text-xl font-semibold text-white sm:mb-48 sm:text-2xl">
            We plan to increase adoption, increase the number of platforms, and
            make our{" "}
            <span className="gold-linear">"Trust by Verify" (TBV)</span> the
            gold standard and terminology in non-centralized OTC markets.
          </p>
          <div className="text-box4 py-10 sm:pt-[64.5px] sm:pb-[59.5px]">
            <p className="mx-auto max-w-[272px] text-base text-gray sm:max-w-[636px] sm:text-xl">
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
