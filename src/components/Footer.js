import React from "react"

import { Link } from "gatsby"

import { Logo } from "../utils/imgImport"
import { footer_links } from "../utils/staticData"

const Footer = () => (
  <footer className="bg-black pt-[91px] pb-[78px]">
    <div className="container">
      <div className="text-gray-l flex flex-wrap items-center justify-center md:justify-between">
        <Link to='/'>
          <img src={Logo} alt="logo" />
        </Link>
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
      </div>
      <p className="pt-24 text-center text-base text-gray-light">
        All rights reserved. © Traderflow 2023
      </p>
    </div>
  </footer>
)

export default Footer
