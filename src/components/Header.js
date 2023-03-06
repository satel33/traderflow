import React from "react"
import { Link } from "gatsby"
import { DiscordIcon, Logo, LogoMob, TwitterIcon } from "../utils/imgImport"
import { Button } from "./Button"

const Header = () => (
  <>
    <header className="container py-4 sm:py-9">
      <div className="flex justify-between">
        <Link className="flex items-center" to="/">
          <img className="hidden sm:block" src={Logo} alt="logo" />
          <img className="sm:hidden" src={LogoMob} alt="logo" />
        </Link>
        <div className="hidden items-center md:flex">
          <a href="https://discord.gg/gWTMSEAq" className="mr-9">
            <img src={DiscordIcon} alt="discord" />
          </a>
          <a href="https://twitter.com/traderflow_com">
            <img src={TwitterIcon} alt="twitter" />
          </a>
        </div>
        <div className="flex items-center">
          <Button type="secondary" clsName="mr-4 hidden sm:block">
            Webauth login
          </Button>
          <Button clsName="hidden sm:block">Join now</Button>
          <Button type="secondary" clsName="sm:hidden">
            Join now
          </Button>
        </div>
      </div>
    </header>
  </>
)

export default Header
