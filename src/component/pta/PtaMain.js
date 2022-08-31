import { motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import { RiBookmarkFill, RiBookmarkLine, RiCheckboxBlankLine, RiCheckLine } from 'react-icons/ri'
import { BsToggleOn, BsToggleOff } from 'react-icons/bs'

import { Context } from '../../context/Context'
import FieldMain from '../field/FieldMain'
// import useApp from '../../hook/useApp'

export default function PtaMain({
    ptamainstatic,
    ptamaindata,
    ptamainstyle,

}) {
    const {
        ptamainstate, setptamainstate,

    } = useContext(Context)
    const [ptamainrender, setptamainrender] = useState()

    const name = `opengem-${ptamainstatic.ptamainid}`

    const filterpframe = [
        {
            ptamainaction: ptaMainAction,
            ptamainrender: () => {
                return <RiCheckboxBlankLine className={ptamainstyle && ptamainstyle} />
            } 
        },
        {
            ptamainaction: ptaMainActionTwo,
            ptamainrender: () => {
                return appPframeRender({
                    component: <RiCheckLine className={ptamainstyle && ptamainstyle} />
                })
            } 
        },
    ]

    const ptamain = [
        {
            ptamainid: 'filterpframe',
            ptamainidtwo: 'opengem-filterpframe',
            ptamainref: filterpframe,
            ptamaindata: (first) => {
                return first.filter(data => data.contentid === ptamaindata.contentid)
            },
            ptamaindatatwo: (first) => {
                return first.filter(data => data.contentid !== ptamaindata.contentid)
            },
        },
    ]

    // console.log('postmaindata', ptamaindata)

    useEffect(() => {
      if(ptamainstatic){
        const filter = ptamain.filter(data => data.ptamainid === ptamainstatic.ptamainid)
        const parse =  Object.assign(...filter).ptamaindata(JSON.parse(localStorage[`opengem-${ptamainstatic.ptamainid}`]))
        // console.log('parse', parse)
        const assign = Object.assign(...filter).ptamainref
            if(parse && parse.length !== 0){
                const filtertwo = assign.filter(data => assign.indexOf(data) === 1)
                setptamainrender(filtertwo)
            }
            if(parse && parse.length === 0){
                const filtertwo = assign.filter(data => assign.indexOf(data) === 0)
                setptamainrender(filtertwo)
            } 
      }
    }, [ptamainstatic, ptamainstate])

    function ptaMainAction() {
        // const filter = ptamain.filter(data => data.ptamainid === ptamainstatic.ptamainid)
        const parse = JSON.parse(localStorage[name])
        // const assign = Object.assign(...filter).ptamaindata(parse)
        parse.push(ptamaindata)

        localStorage.setItem(name, JSON.stringify(parse))
        setptamainstate(!ptamainstate)
    }

    function ptaMainActionTwo() {
        const filter = ptamain.filter(data => data.ptamainid === ptamainstatic.ptamainid)
        const parse = JSON.parse(localStorage[name])
        // console.log('parse', parse)
        const assign = Object.assign(...filter).ptamaindatatwo(parse)

        localStorage.setItem(name, JSON.stringify(assign))
        setptamainstate(!ptamainstate)
    }

    ////////////////////////////////////////////////////

  return (
    <div>
        <main className="">
            <section className="">
                {ptamainrender && ptamainrender.map((data, index) => (<>
                    <article key={index} onClick={() => {
                        data?.ptamainaction()
                    }} className="z-20  m-h6">
                        {data?.ptamainrender()}
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
