import React, { useRef } from "react"

import { Button } from "../components/Button"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { IllustratoinDesktop } from "../utils/imgImport"

const AboutUsPage = () => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  return (
    <>
      <section className="xxs:community-back overflow-hidden max-xxs:bg-[url(../images/community-back-mob.png)]">
        <Header />
        <div className="container my-[120px] text-center">
          <h1 className="font-heading text-[28px] font-bold leading-[44.8px] text-white xs:text-[32px] sm:text-[60px] sm:leading-[96px]">
            About Us
          </h1>
        </div>

        <div className="container relative z-10 mt-24 max-xxs:mt-[clamp(100px,65vw,230px)] max-xxxs:mt-[clamp(100px,25vw,150px)] sm:pb-[120px] lg:mt-[200px]">
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

export default AboutUsPage
