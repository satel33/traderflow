import React from "react"

import { Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import { Button } from "../components/Button"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { RoadmapItem } from "../components/RoadmapItem"
import { HomeHero, NftImg } from "../utils/imgImport"
import { benefitItems, roadmaps, spatials } from "../utils/staticData"

const IndexPage = () => {
  return (
    <>
      <section className="landing-back">
        <Header />

        {/* Hero Section */}
        <div className="container ">
          <div className="flex items-center">
            <div className="pt-12 text-center  sm:text-left">
              <h1 className="gold-linear font-heading text-[32px] font-bold leading-[44.8px] sm:text-[clamp(32px,4vw,68px)] sm:leading-[clamp(32px,6vw,68px)]">
                Trust But Verify
              </h1>
              <h1 className="max-w-[836px] font-heading text-[32px] font-bold leading-[40.8px] text-white sm:text-[clamp(32px,4vw,68px)] sm:leading-[clamp(32px,6vw,68px)]">
                <ul>
                  <li>Eternal Trader Ledger</li>
                  <li>Ranked Trader Discord</li>
                </ul>
              </h1>
              <p className="mx-auto mt-[12px] max-w-[655px] text-base text-gray sm:mx-0 sm:text-xl">
                Join the worlds largest web 3.0 Trading community. Join get your
                updating financial NFT (TBV). Get trading ideas and learn from
                verified professional traders and Analysts
              </p>
              <Button clsName="mt-10 btn-cta sm:mt-20">
                Pre-register now and get 3 months free
              </Button>
            </div>
            <img
              className="hidden h-[100%] w-[43%] sm:block"
              src={HomeHero}
              alt="Hero img"
            />
          </div>
          <img className="mx-auto mt-16 sm:hidden" src={NftImg} alt="nft" />
          <div className="mt-20 sm:mt-[327px]">
            <h2 className="text-center font-heading text-[32px] font-bold leading-[44.8px] text-white sm:text-[56px] sm:leading-[67.2px] lg:text-left">
              Benefits
            </h2>
            <ul className="mt-14 flex flex-wrap items-center justify-around sm:mt-[132px]">
              {benefitItems.map(item => (
                <li
                  key={item.title}
                  className="mb-16 max-w-[355px] text-center sm:mr-14 lg:text-left"
                >
                  <img
                    className="mx-auto mb-8 lg:mx-0"
                    src={item.icon}
                    alt={item.title}
                  />
                  <h4 className="mb-2 font-heading text-2xl font-semibold text-white xl:mb-4 xl:text-[32px] xl:leading-[44.8px]">
                    {item.title}
                  </h4>
                  <p className="text-base text-white xl:text-xl">
                    {item.content}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Spatials Section */}
        <div className="py-40 text-center sm:py-48">
          <h2 className="mb-[70px] font-heading text-[32px] font-bold leading-[44.8px] text-white sm:text-[56px] sm:leading-[67.2px]">
            Showcase your collections
            <br />
            <span className="gold-linear">in VR spatials</span>
          </h2>
          <div>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              freeMode={true}
              loop={true}
              grabCursor={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 8,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {spatials.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative">
                    <img
                      src={item.img}
                      alt={item.lang}
                      className={`${idx % 4 === 0
                        ? "clip-path-polygon-[89%_100%,_0_100%,_0_0,_100%_0,_100%_81%]"
                        : idx % 4 === 1
                          ? "clip-path-polygon-[100%_22%,_100%_100%,_0_100%,_0_0,_86%_0]"
                          : idx % 4 === 2
                            ? "clip-path-polygon-[13%_0,_100%_0,_100%_100%,_0_100%,_0_21%]"
                            : "clip-path-polygon-[0_0,_100%_0,_100%_100%,_9%_100%,_0_77%]"
                        }`}
                    />
                  </div>
                  <p className="absolute bottom-3 left-4 text-left font-heading text-2xl font-semibold text-white sm:bottom-4 sm:left-6 sm:text-[32px] sm:leading-[44.8px]">
                    {item.lang}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Button type="secondary" clsName="mt-12 mx-auto">
            Sign up now
          </Button>
        </div>
        <div className="none relative z-10 max-lg:ml-[40px] lg:ml-0">
          <div className="absolute bottom-0 z-40 h-[85%] w-full border-l-[5px] border-[#050947] lg:h-full lg:border-l-0 lg:border-b-[5px]" />
          <div className="xxl:max-w-[1380px] xxl:mx-[auto] pr-[30px] xl:container">
            <h2 className="mb-28 text-right font-heading text-[32px] font-bold leading-[44.8px] text-white max-lg:text-center sm:text-[56px] sm:leading-[67.2px]">
              Traderflow <span className="gold-linear">Roadmap</span>
            </h2>
            <div
              className={`relative z-10 flex flex-col lg:flex-row lg:items-end lg:pl-8 `}
            >
              {roadmaps.map((item, idx) => (
                <RoadmapItem
                  key={idx}
                  height={item.height}
                  list={item.list}
                  quater={item.quater}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="py-28"></div>
      </section>
      <Footer />
    </>
  )
}

export default IndexPage
