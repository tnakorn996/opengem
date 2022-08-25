import { motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri'
import { useParams } from 'react-router-dom'

import { Context } from '../../context/Context'
import FieldMain from '../field/FieldMain'
// import useApp from '../../hook/useApp'
import useSplit from '../../hook/useSplit'
import useClient from '../../hook/useClient'

export default function StaMain({
    stamaindata,
    stamainstatic,

}) {
    const {
        appstate,
        fieldmainstate,
        dtamainstate,

        contractdl,
        textdl,
        questdl,

    } = useContext(Context)
    const param = useParams()
    // const url = (new URL(window.location)).pathname
    const [splitstatic, setsplitstatic] = useSplit(1)
    const [splitstatictwo, setsplitstatictwo] = useSplit(2)
    const [splitstaticthree, setsplitstaticthree] = useSplit(3)

    const [stamainrender, setstamainrender] = useState()

    // function staMainAction(first) {
    //     if(!first || !Object.assign(...first).spreaddata) return null
    //     return Object.assign(...first).spreaddata.filter(data => 
    //         data.receiverid.userid === param.userid
    //         || data.spreadidtwo === url)
    // }

    const couponsframe = [
        {
            stamainrender: () => {
                return <FieldMain fieldmainstatic={{fieldmainid: 'claimform', fieldmainindex: 0}} />
            }
        },
        {
            stamainrender: () => {
                return null
            }
        },
    ]


    const claimsframe = [
        {
            stamainrender: () => {
                return <FieldMain fieldmainstatic={{fieldmainid: 'claimform', fieldmainindex: 0}} />
            }
        },
        {
            stamainrender: () => {
                return <FieldMain fieldmainstatic={{fieldmainid: 'claimform', fieldmainindex: 1}} fieldmainstyle={{button: `!l-button`}} />
            }
        },
    ]

    const stamain = [
        {
            stamainid: 'couponsframe',
            stamainref: couponsframe,
            stamaindata: () => { 
                return stamaindata && stamaindata
            }
        },
        {
            stamainid: 'claimsframe',
            stamainref: claimsframe,
            stamaindata: () => { 
                return stamaindata && stamaindata
            }
        },
    ]

    useEffect(() => {
        const filter = stamain.filter(data => data.stamainid === stamainstatic.stamainid)
        const assign = Object.assign(...filter).stamaindata()
        const assigntwo = Object.assign(...filter).stamainref
        // console.log('ref', ref, reftwo)
        if(assign && assign.length !== 0){
            const filtertwo = assigntwo.filter(data => assigntwo.indexOf(data) === 1)
            setstamainrender(filtertwo)
        }
        if(assign && assign.length === 0){
            const filtertwo = assigntwo.filter(data => assigntwo.indexOf(data) === 0)
            setstamainrender(filtertwo)
        }
    }, [stamainstatic, stamaindata, dtamainstate, splitstaticthree])

    if(typeof stamainstatic === 'undefined') return null

  return (
    <div>
        <main className="">
            <section className="z-20">
                {stamainrender && stamainrender.map((data) => (
                    data?.stamainrender()
                ))}
            </section>
        </main>
    </div>
  )
}