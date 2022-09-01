import { motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import { RiBookmarkFill, RiBookmarkLine, RiCheckboxBlankCircleFill, RiCheckboxBlankCircleLine, RiCheckboxBlankLine, RiCheckLine } from 'react-icons/ri'
import { BsToggleOn, BsToggleOff } from 'react-icons/bs'

import { Context } from '../../context/Context'
import FieldMain from '../field/FieldMain'
// import useApp from '../../hook/useApp'

export default function RtaMain({
    rtamainstatic,
    rtamaindata,
    rtamainstyle,

}) {
    const {
        rtamainstate, setrtamainstate,

    } = useContext(Context)
    const [rtamainrender, setrtamainrender] = useState()

    const name = `opengem-${rtamainstatic.rtamainid}`

    const sortrframe = [
        {
            rtamainaction: rtaMainAction,
            rtamainrender: () => {
                return <RiCheckboxBlankCircleLine className={rtamainstyle && rtamainstyle} />
            } 
        },
        {
            rtamainaction: rtaMainAction,
            rtamainrender: () => {
                return appPframeRender({
                    component: <RiCheckboxBlankCircleFill className={rtamainstyle && rtamainstyle} />
                })
            } 
        },
    ]

    const rtamain = [
        {
            rtamainid: 'sortrframe',
            rtamainidtwo: 'opengem-sortrframe',
            rtamainref: sortrframe,
            rtamaindata: (first) => {
                return first.filter(data => data.contentid === rtamaindata.contentid)
            },
            rtamaindatatwo: (first) => {
                return first.filter(data => data.contentid !== rtamaindata.contentid)
            },
        },
    ]

    // console.log('postmaindata', rtamaindata)

    useEffect(() => {
      if(rtamainstatic){
        const filter = rtamain.filter(data => data.rtamainid === rtamainstatic.rtamainid)
        const parse =  Object.assign(...filter).rtamaindata(JSON.parse(localStorage[`opengem-${rtamainstatic.rtamainid}`]))
        // console.log('parse', parse)
        const assign = Object.assign(...filter).rtamainref
            if(parse && parse.length !== 0){
                const filtertwo = assign.filter(data => assign.indexOf(data) === 1)
                setrtamainrender(filtertwo)
            }
            if(parse && parse.length === 0){
                const filtertwo = assign.filter(data => assign.indexOf(data) === 0)
                setrtamainrender(filtertwo)
            } 
      }
    }, [rtamainstatic, rtamainstate])

    function rtaMainAction() {
        localStorage.setItem(name, JSON.stringify([rtamaindata]))
        setrtamainstate(!rtamainstate)
    }

    ////////////////////////////////////////////////////

  return (
    <div>
        <main className="">
            <section className="">
                {rtamainrender && rtamainrender.map((data, index) => (<>
                    <article key={index} onClick={() => {
                        data?.rtamainaction()
                    }} className="z-20  m-h6">
                        {data?.rtamainrender()}
                    </article>
                </>))}
            </section>
        </main>
    </div>
  )
}

export function appPframeRender({component}) {
  return (
    <div>
        <motion.section initial={{scale: 0.5}} animate={{scale: 1}} className="duration-100">
        {component}
        </motion.section>
    </div>
  )
}
