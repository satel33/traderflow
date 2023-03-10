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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden py-8 bg-[#03051a] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg max-sm:mb-[50%]">
              <img className="absolute top-2 right-2 cursor-pointer" src={Cross} alt="cross" onClick={handleClose} onKeyDown={handleClose} />
              <div className="bg-[#03051a] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {
                  !result ?
                    <div className="mt-6 text-center sm:mt-0 ">
                      <h3 className=" font-semibold leading-6 text-[white] text-[clamp(24px,5vw,32px)]" id="modal-title">Welcome to Traderflow</h3>
                      {!connect ?
                        <div>
                          <p className="text-sm text-[#B5BEE4] mt-5 mb-8 text-[clamp(10px,3vw,14px)]">Connect your Blocto wallet to continue</p>
                          <Button clsName="flex m-[auto]" onClick={handleConnect}>
                            <img src={WalletTag} alt='wallet' />
                            <p>
                              Connect Wallet
                            </p>
                          </Button>
                        </div> :
                        <div>
                          <p className="text-sm text-[#B5BEE4] mt-5 mb-8 text-[clamp(10px,3vw,14px)]">Connect your Blocto wallet to continue</p>
                          <form className="flex m-[auto] max-sm:flex-col">
                            <input type="text"
                              required
                              onChange={handleSetEmail}
                              className="bg-[#0E102B] border-[#5678B9] pl-4 px-6 py-[13px] sm:px-8 sm:py-4 outline-none focus:shadow-button text-[white] max-sm:mb-2" placeholder="Enter your email" />
                            <Button type="submit" onClick={handelMintConnect} clsName={`${!valid ? 'cursor-not-allowed' : ''}`}>
                              Mint NFT
                            </Button>
                          </form>
                          {
                            !valid ?
                              <div className="absolute flex mt-[3px]">
                                <img src={WarningIcon} alt="Warning" className="object-cover bg-[contain] w-5" />
                                <p className="text-[#EB5757]">wrong email format</p>
                              </div>
                              : ''
                          }
                        </div>
                      }
                    </div> :
                    <div className="mt-6 text-center sm:mt-0 ">
                      <h3 className=" font-semibold leading-6 text-[white] text-[clamp(24px,5vw,32px)]" id="modal-title">Thank you for joining us</h3>
                      <p className="text-sm text-[#B5BEE4] mt-5 mb-8 text-[clamp(10px,3vw,14px)]">Here is your unique link to join Discord</p>
                      <Button clsName="flex m-[auto] align-center">
                        <img src={DiscordBlue} alt='wallet' />
                        <p>
                          Join Discord
                        </p>
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