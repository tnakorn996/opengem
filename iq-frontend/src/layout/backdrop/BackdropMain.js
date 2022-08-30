import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import ModalMain from '../../component/modal/ModalMain'

import { Context } from '../../context/Context'
import useApp from '../../hook/useApp'

export default function BackdropMain({
    children
}) {

    const { 
        
        appstate,
    
    } = useContext(Context)
    // console.log('appstate', appstate)

    const modalmain = [
        {
            backdropmainrender: () => {
                return <ModalMain />
            }
        }
    ]

    const backdropmain = [
        {
            backdropid: `modalmain`,
            backdropref: modalmain,
        }
    ]

    const [appstatic, setappstatic] = useApp(backdropmain, appstate?.appidtwo, 0)

  return (
    <div>
        <main className="">
            <section className="">
                {children}
            </section>
            {appstate && appstate.appid === `backdropmain` && (<>
            <section className="z-20 fixed top-0 left-0 w-screen h-screen  bg-slate-900 bg-opacity-40">
                {appstatic?.map((data, index) => (<>
                <motion.article key={index} initial={{opacity: 0}} animate={{opacity: 1}} className="duration-100">
                    {data?.backdropmainrender()}
                </motion.article>
                </>))}
            </section>
            </>)}
        </main>
    </div>
  )
}
