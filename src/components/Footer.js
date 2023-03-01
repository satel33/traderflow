import React from "react"
import { Link } from "gatsby"
import { footer_links } from "../utils/staticData"
import { DiscordIcon, Logo, TwitterIcon } from "../utils/imgImport"

const Footer = () => (
  <footer className="bg-black pt-[91px] pb-[78px]">
    <div className="container">
      <div className="text-gray-l flex flex-wrap items-center justify-center md:justify-between">
        <img src={Logo} alt="logo" />
        <ul className="flex flex-wrap items-center justify-center py-16">
          {footer_links.map(item => (
            <li key={item.name}>
              <Link
                to={item.to}
                className="block px-6 py-2 font-heading text-[20px] font-medium text-gray-light"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <a href="/" className="mr-9">
            <img src={DiscordIcon} alt="discord" />
          </a>
          <a href="/">
            <img src={TwitterIcon} alt="twitter" />
          </a>
        </div>
      </div>
      <p className="pt-24 text-center text-base text-gray-light">
        All rights reserved. © Traderflow 2023
      </p>
    </div>
  </footer>
)

export default Footer
