import React, { useContext } from 'react'
import { RiMoreLine } from 'react-icons/ri'
import { useLocation, useNavigate } from 'react-router-dom'

import { Context } from '../../context/Context'
import useApp from '../../hook/useApp'
import useSplit from '../../hook/useSplit'

export default function AtaMain({
    dtamaindata,
    dtamainstatic,
    children,
    component,

}) {
    const {
        setappstate,
        dtamainstate, setdtamainstate,


    } = useContext(Context)
    const [splitstaticthree, setsplitstaticthree] = useSplit(3)
    // const navigate = useNavigate()
    // const location = useLocation()

    function dtaMainAction(first) {
            // console.log('dtamaindata', dtamaindata)
            // console.log('first', first)
            setappstate(first)
            if(dtamaindata.dtamainhref) return  window.history.replaceState(null, "", dtamaindata.dtamainhref)
            return null
    }

    const appdframe = [
        {
            dtamainrender: () => {
                return {
                    appid: 'backdropmain',
                    appidtwo: 'modalmain',
                    appidthree: 'appdialog',
                    appindex: 0,
                }
            } 
        },
    ]

    const claimdframe = [
        {
            dtamainrender: () => {
                return {
                    appid: 'backdropmain',
                    appidtwo: 'modalmain',
                    appidthree: 'claimdialog',
                    appindex: 0,
                }
            } 
        },
        {
            dtamainrender: () => {
                return {
                    appid: 'backdropmain',
                    appidtwo: 'modalmain',
                    appidthree: 'claimdialog',
                    appindex: 1,
                }
            } 
        },
    ]

    const filterdframe = [
        {
            dtamainrender: () => {
                return {
                    appid: 'backdropmain',
                    appidtwo: 'modalmain',
                    appidthree: 'filterdialog',
                    appindex: 0,
                }
            } 
        },
    ]

    const sortdframe = [
        {
            dtamainrender: () => {
                return {
                    appid: 'backdropmain',
                    appidtwo: 'modalmain',
                    appidthree: 'sortdialog',
                    appindex: 0,
                }
            } 
        },
    ]

    const dtamain = [
               {
            dtamainid: 'appdframe',
            dtamainref: appdframe
        },
        {
            dtamainid: 'claimdframe',
            dtamainref: claimdframe
        },
        {
            dtamainid: 'filterdframe',
            dtamainref: filterdframe
        },
                {
            dtamainid: 'sortdframe',
            dtamainref: sortdframe
        },
    ]

    const [appstatic, setappstatic] = useApp(dtamain, dtamainstatic.dtamainid, dtamainstatic.dtamainindex, splitstaticthree)
// console.log('appstatic', appstatic)

  return (
    <div>
        <main className="">
            <section onClick={() => {
                setdtamainstate(!dtamainstate)
            }} className="">
                {appstatic && appstatic?.map((data, index) => (<>
                    <section key={index} onClick={() => {
                        dtaMainAction(data?.dtamainrender())}
                    } className="">
                        {children}
                    </section>
                </>))}
            </section>
        </main>
    </div>
  )
}
