import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'

import { Context } from '../../context/Context'
import useApp from '../../hook/useApp'
import CardMain from '../../layout/card/CardMain'
import ChipMain from '../../layout/chip/ChipMain'
import AppMain from '../../page/app/AppMain'
import ThemeMain from '../../layout/theme/ThemeMain'
import ThemeMainTwo from '../../layout/theme/ThemeMainTwo'
import ClaimForm from '../../page/claim/ClaimForm'
import ClaimStatus from '../../page/claim/ClaimStatus'
import FilterMain from '../../page/filter/FilterMain'
import GuideIndex from '../../page/guide/GuideIndex'
import SortMain from '../../page/sort/SortMain'

export default function ModalMain() {
    const { 
        appstate, setappstate,
    
    } = useContext(Context)
    const location = useLocation()

    const appdialog = [
        {
            modalmainrender: () => {
                return <AppMain />
            }
        },
    ]

    const claimdialog = [
        {
            modalmainrender: () => {
                return <ClaimForm />
            }
        },
        {
            modalmainrender: () => {
                return <ClaimStatus />
            }
        },
    ]

    const filterdialog = [
        {
            modalmainrender: () => {
                return <FilterMain />
            }
        },
    ]

    const sortdialog = [
        {
            modalmainrender: () => {
                return <SortMain />
            }
        },
    ]

    const guidedialog = [
        {
            modalmainrender: () => {
                return <GuideIndex />
            }
        },
    ]

    const modalmain = [
             {
            modalmainid: `appdialog`,
            modalmainref: appdialog,
        },
        {
            modalmainid: `claimdialog`,
            modalmainref: claimdialog,
        },
        {
            modalmainid: `filterdialog`,
            modalmainref: filterdialog,
        },
                {
            modalmainid: `sortdialog`,
            modalmainref: sortdialog,
        },
           {
            modalmainid: `guidedialog`,
            modalmainref: guidedialog,
        },
    ]

    const [appstatic, setappstatic] = useApp(modalmain, appstate.appidthree, appstate.appindex)

  return (
    <div>
        <main className="fixed bottom-0 right-0 w-full md:w-[500px] md:h-screen shadow-xl bg-slate-800">
            <section className="">
                {appstatic?.map(data => (
                    data?.modalmainrender()
                ))}
            </section>
            <section onClick={() => {
                    setappstate()
                    window.history.replaceState(null, "", location?.pathname)
                }} className="w-full flex justify-center">
                <CardMain>
                <ChipMain>
                <ThemeMainTwo>
                <button className="w-[60px] h-[60px] flex items-center justify-center  m-h6 bg-slate-700">╳</button>
                </ThemeMainTwo>
                </ChipMain>
                </CardMain>
            </section>
        </main>
    </div>
  )
}
