import React, { useContext } from 'react'
import { RiNotificationLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import TabMain from '../../component/tab/TabMain'
import { Context } from '../../context/Context'
import BadgeMain from '../../layout/badge/BadgeMain'
import CardMain from '../../layout/card/CardMain'
import ChipMain from '../../layout/chip/ChipMain'
import ThemeMainTwo from '../../layout/theme/ThemeMainTwo'

export default function AuthMain() {

  const {
    
    auth,
    notificationdl,

  } = useContext(Context)
    

  return (
    <div>
        <main className="">
            {auth ? (<>
            <section className="">
              {authMainRender(auth, notificationdl)}
            </section>
            </>) :  (<>
              <section className="">
                <TabMain tabmainstatic={{tabmainid: `authfieldset`, tabmainindex: 0}} />
              </section>
            </>)}
        </main>
    </div>
  )
}

export function authMainRender(auth, notificationdl) {
  return (
    <div>
       <main className="">
        <section className="">
          <CardMain>
              <p className="m-h6">Welcome! <span className="uppercase"> {auth?.user?.email?.split(`@`)[0]}</span></p>
              </CardMain>
                <CardMain>
              <ChipMain>
              <Link to={`/notification/notificationmain`}>
              <article className=" m-h5 bg-white text-black">
                <CardMain>
                  <div className="flex flex-row items-center justify-between">
                    <figure className="flex flex-row items-center gap-3">
                  <RiNotificationLine />
                    New notifications
                    </figure>
                    <BadgeMain>
                  <figure className="h-[50px] w-[50px] flex items-center justify-center">
                    {authMainAction(notificationdl)}
                  </figure>
                    </BadgeMain>
                  </div>
                </CardMain>
              </article>
              </Link>
              </ChipMain>
          </CardMain>
        </section>
       </main>
    </div>
  )
}

export function authMainAction(notificationdl) {
  if(typeof notificationdl[0]?.contextdata() === 'undefined'
  || notificationdl[0]?.contextdata() === null) return null;
  const filter = notificationdl[0]?.contextdata()?.filter(data => data.contextrender().bool === true)
  return filter.length
}
