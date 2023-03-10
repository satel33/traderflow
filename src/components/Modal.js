import React from "react"

import { Button } from "./Button"
import { WalletTag, Cross, DiscordBlue, WarningIcon } from "../utils/imgImport"

function Modal({ open, handleClose }) {
  const [connect, setConnect] = React.useState(false)
  const [result, setResult] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [valid, setValid] = React.useState(true)

  const handleSetEmail = event => {
    event.preventDefault()
    setEmail(event.target.value)
    if (validEmail(email)) setValid(true)
    else setValid(false)
  }

  function validateEmail(mail) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (mail.match(validRegex)) return true
    else return false
  }
  const validEmail = mail => validateEmail(mail)

  const handleConnect = () => setConnect(true)

  const handelMintConnect = e => {
    e.preventDefault()
    if (!valid) return
    setResult(true)
  }
  return (
    <div className={`${open ? "block" : "hidden"}`}>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-[rgb(0,0,0,0.8)] bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="m-[auto] flex min-h-full  p-[11px] text-center sm:items-center sm:p-0  xl:m-auto ">
            <div className="relative m-[auto] w-[336px] overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#062262] to-[#000000] py-[61px] px-[11px] text-left shadow-xl transition-all  clip-path-polygon-[0_0,_100%_0,_100%_100%,_8%_100%,_0_94%] sm:my-8 lg:w-[812px] lg:p-[50px] lg:clip-path-polygon-[0_0,_100%_0,_100%_100%,_5%_100%,_0_83%]">
              <img
                className="absolute top-[22px] right-[22px] z-10 cursor-pointer"
                src={Cross}
                alt="cross"
                onClick={handleClose}
                onKeyDown={handleClose}
              />
              <div className=" ">
                {!result ? (
                  <div className="text-center sm:mt-0 ">
                    <h3
                      className=" text-[clamp(24px,5vw,32px) mb-[10px] text-[32px] font-semibold leading-[140%] text-[white]"
                      id="modal-title"
                    >
                      Welcome to Traderflow
                    </h3>
                    {!connect ? (
                      <div>
                        <p className="m-[auto] mt-5 mb-8 text-sm text-[clamp(10px,3vw,14px)] text-[#B5BEE4] max-lg:w-[207px] max-sm:text-[16px]">
                          Connect your Blocto wallet to continue
                        </p>
                        <Button clsName="flex m-[auto]" onClick={handleConnect}>
                          <img src={WalletTag} alt="wallet" />
                          <p className="ml-[10px]">Connect Wallet</p>
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <p className="m-[auto] mt-[10px] mb-8 text-sm text-[clamp(10px,3vw,14px)] text-[#B5BEE4] lg:w-[358px]">
                          Enter your email address to mint NFT and gain access
                          to Discord server
                        </p>
                        <div className="relative mt-[24px]">
                          <form className="flex ">
                            <div className="m-[auto] flex w-[311px] max-lg:flex-col lg:w-[503px]">
                              <input
                                type="text"
                                required
                                onChange={handleSetEmail}
                                className="w-full border-[1px] border-[#5678B9] bg-[#0E102B] text-[white] outline-none focus:shadow-button max-lg:py-[16px] max-lg:px-[22px] lg:p-[20px]"
                                placeholder="Enter your email"
                              />
                              {!valid ? (
                                <div className="mt-[3px] flex">
                                  <img
                                    src={WarningIcon}
                                    alt="Warning"
                                    className="mt-[4px] w-5 bg-[contain] object-cover"
                                  />
                                  <p className="ml-[6px] text-[#EB5757]">
                                    wrong email format
                                  </p>
                                </div>
                              ) : (
                                ""
                              )}
                              <Button
                                onClick={handelMintConnect}
                                clsName={
                                  "max-lg:mt-[40px] lg:w-[200px] max-lg:w-full"
                                }
                              >
                                Mint NFT
                              </Button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center sm:mt-0 ">
                    <h3
                      className=" text-[clamp(24px,5vw,32px)] font-semibold leading-[140%] text-[white]"
                      id="modal-title"
                    >
                      Thank you for joining us
                    </h3>
                    <p className="m-[auto] mt-5 mb-8 text-sm text-[clamp(10px,3vw,14px)] text-[#B5BEE4] max-lg:w-[207px]">
                      Here is your unique link to join Discord
                    </p>
                    <Button
                      onClick={handleClose}
                      clsName="flex m-[auto] align-center"
                    >
                      <img src={DiscordBlue} alt="wallet" />
                      <a
                        href="https://discord.gg/aR4mBNvxj7"
                        className="ml-[10px]"
                      >
                        Join Discord
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export { Modal }
