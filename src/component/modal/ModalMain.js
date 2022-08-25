import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Context } from '../../context/Context'
import useApp from '../../hook/useApp'
import CardMain from '../../layout/card/CardMain'
import ThemeMain from '../../layout/theme/ThemeMain'

import ClaimForm from '../../page/claim/ClaimForm'
import ClaimStatus from '../../page/claim/ClaimStatus'

export default function ModalMain() {
    const { 
        appstate, setappstate,
    
    } = useContext(Context)
    const location = useLocation()

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

    const modalmain = [
        {
            modalmainid: `claimdialog`,
            modalmainref: claimdialog,
        }
    ]

    const [appstatic, setappstatic] = useApp(modalmain, appstate.appidthree, appstate.appindex)

  return (
    <div>
        <main className="fixed bottom-0 left-0 w-full">
            <ThemeMain>
            <section className="">
                {appstatic?.map(data => (<>
                    {data?.modalmainrender()}
                </>))}
            </section>
            <section className="w-full flex justify-center">
                <CardMain>
                <button onClick={() => {
                    setappstate()
                    window.history.replaceState(null, "", location?.pathname)
                }} className="">Close</button>
                </CardMain>
            </section>
            </ThemeMain>
        </main>
    </div>
  )
}
