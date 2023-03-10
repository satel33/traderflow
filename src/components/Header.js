import React, { useState } from "react"

import { Link } from "gatsby"

import {
  authenticate,
  config,
  currentUser,
} from "@onflow/fcl"

import {
  DiscordIcon,
  Logo,
  LogoMob,
  TwitterIcon,
} from "../utils/imgImport"
import { header_links } from "../utils/staticData"
import { Button } from "./Button"

config({
  "accessNode.api": "https://rest-testnet.onflow.org", // Mainnet: "https://rest-mainnet.onflow.org"
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Mainnet: "https://fcl-discovery.onflow.org/authn"
  "app.detail.icon": "https://traderflow.com/icons/icon-512x512.png",
  "app.detail.title": "Traderflow"
})

const Header = ({ handleOpen }) => {
  const [user, setUser] = useState()

  // function scrolltoId() {
  //   var access = document.getElementById("about");
  //   access.scrollIntoView({ behavior: 'smooth' }, true);
  // }
  const rlogin = async () => {
    authenticate();
    const tu = await currentUser.authorization();
    console.log(tu);
    setUser("LOGGED IN");
  }

  return (
    <>
      <header className="container py-4 sm:py-9">
        <div className="flex justify-between items-center">
          <Link className="flex items-center" to="/">
            <img className="hidden sm:block" src={Logo} alt="logo" />
            <img className="sm:hidden" src={LogoMob} alt="logo" />
          </Link>
          <div className="hidden items-center md:flex">
            {header_links.map(item =>
              <li key={item.name}>
                <Link
                  to={item.to}
                  className="block px-6 py-2 font-heading text-[20px] font-medium text-gray-light"
                >
                  {item.name}
                </Link>
              </li>
            )}
            <a href="https://discord.gg/aR4mBNvxj7" className="mr-9 mt-[20px]">
              <img src={DiscordIcon} alt="discord" />
            </a>
            <a href="https://twitter.com/traderflow_com" className="mt-[20px]">
              <img src={TwitterIcon} alt="twitter" />
            </a>
          </div>
          <div className="flex items-center">
            <Button
              disabled
              type="secondary"
              clsName="mr-4 hidden sm:block"
              onClick={rlogin}
            >
              {user || "Webauth login"}
            </Button>
            <Button onClick={handleOpen}>Join now</Button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
