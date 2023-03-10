import React from 'react'

import { Button } from './Button'
import { WalletTag, Cross, DiscordBlue, WarningIcon } from "../utils/imgImport"

function Modal({ open, handleClose }) {
  const [connect, setConnect] = React.useState(false)
  const [result, setResult] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [valid, setValid] = React.useState(true)

  const handleSetEmail = (event) => {
    event.preventDefault()
    setEmail(event.target.value)
    if (validEmail(email)) setValid(true)
    else setValid(false)
  }

  function validateEmail(mail) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (mail.match(validRegex)) return true
    else return (false)
  }
  const validEmail = (mail) => validateEmail(mail)

  const handleConnect = () => setConnect(true)

  const handelMintConnect = (e) => {
    e.preventDefault()
    if (!valid) return
    setResult(true)
  }
  return (
    <div className={`${open ? 'block' : 'hidden'}`}>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-[rgb(0,0,0,0.8)] bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full p-[11px]  text-center sm:items-center sm:p-0 m-[auto]  xl:m-auto ">
            <div className="relative overflow-hidden lg:p-[50px] py-[61px] px-[11px] text-left shadow-xl transition-all sm:my-8 w-[336px] lg:w-[812px] m-[auto]  clip-path-polygon-[0_0,_100%_0,_100%_100%,_8%_100%,_0_94%] lg:clip-path-polygon-[0_0,_100%_0,_100%_100%,_5%_100%,_0_83%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#062262] to-[#000000]">
              <img className="absolute top-[22px] right-[22px] cursor-pointer z-10" src={Cross} alt="cross" onClick={handleClose} onKeyDown={handleClose} />
              <div className=" ">
                {
                  !result ?
                    <div className="text-center sm:mt-0 ">
                      <h3 className=" font-semibold leading-[140%] text-[white] text-[clamp(24px,5vw,32px) text-[32px] mb-[10px]" id="modal-title">Welcome to Traderflow</h3>
                      {!connect ?
                        <div>
                          <p className="text-sm text-[#B5BEE4] mt-5 mb-8 text-[clamp(10px,3vw,14px)] max-sm:text-[16px] max-lg:w-[207px] m-[auto]">Connect your Blocto wallet to continue</p>
                          <Button clsName="flex m-[auto]" onClick={handleConnect}>
                            <img src={WalletTag} alt='wallet' />
                            <p className="ml-[10px]">
                              Connect Wallet
                            </p>
                          </Button>
                        </div> :
                        <div>
                          <p className="text-sm text-[#B5BEE4] mt-[10px] mb-8 text-[clamp(10px,3vw,14px)] lg:w-[358px] m-[auto]">Enter your email address to mint NFT and gain access to Discord server</p>
                          <div className="relative mt-[24px]">
                            <form className="flex ">
                              <div className="m-[auto]  lg:flex lg:flex-col w-[311px] lg:w-[503px]">
                                <div className="lg:flex">
                                  <input type="text"
                                    required
                                    onChange={handleSetEmail}
                                    className="bg-[#0E102B] border-[#5678B9] border-[1px] w-full outline-none lg:p-[20px] max-lg:py-[16px] max-lg:px-[22px] focus:shadow-button text-[white]" placeholder="Enter your email" />
                                  {
                                    !valid ?
                                      <div className="flex lg:hidden mt-[3px]">
                                        <img src={WarningIcon} alt="Warning" className="object-cover bg-[contain] w-5 mt-[4px]" />
                                        <p className="text-[#EB5757] ml-[6px]">wrong email format</p>
                                      </div>
                                      : ''
                                  }
                                  <Button onClick={handelMintConnect} clsName={'max-lg:mt-[19px] lg:w-[200px] max-lg:w-full'} >
                                    Mint NFT
                                  </Button>
                                </div>
                                {
                                  !valid ?
                                    <div className="hidden mt-[3px] lg:flex">
                                      <img src={WarningIcon} alt="Warning" className="object-cover bg-[contain] w-5 mt-[4px]" />
                                      <p className="text-[#EB5757] ml-[6px]">wrong email format</p>
                                    </div>
                                    : ''
                                }

                              </div>

                            </form>
                          </div>
                        </div>
                      }
                    </div> :
                    <div className="text-center sm:mt-0 ">
                      <h3 className=" font-semibold leading-[140%] text-[white] text-[clamp(24px,5vw,32px)] max-lg:text-[32px]" id="modal-title">Thank you for joining us</h3>
                      <p className="text-sm text-[#B5BEE4] mt-5 mb-8 text-[clamp(10px,3vw,14px)] max-lg:w-[207px] m-[auto]">Here is your unique link to join Discord</p>
                      <Button onClick={handleClose} clsName="flex m-[auto] align-center">
                        <img src={DiscordBlue} alt='wallet' />
                        <a href='https://discord.gg/aR4mBNvxj7' className="ml-[10px]">
                          Join Discord
                        </a>
                      </Button>

                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export { Modal }