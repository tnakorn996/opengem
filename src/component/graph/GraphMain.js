import React, { useContext, useEffect } from 'react'

import { Context } from '../../context/Context'
import useAd from '../../hook/useAd'
import useApp from '../../hook/useApp'
import useDev from '../../hook/useDev'
// import useSplit from '../../hook/useSplit'

export default function GraphMain({
    graphmainstatic,

}) {
    const {
        // setappstate, appstate,

        // taskuserid,
        guidedl,
        // messagedl,

    } = useContext(Context)

    const guidebase = [
        {
            graphmainrender: () => {
                return {
                    data: guidedl[0]?.contextdata(),
                    action: {
                        appid:'backdropmain',
                        appidtwo: 'modalmain',
                        appidthree: 'guidedialog',
                        appindex: 0
                    }
                } 
            }
        }
    ]

    const graphmain = [
        {
            graphmainid: 'guidebase',
            graphmainref: guidebase,
        },
    ]

    const [appstatic, setappstatic] = useApp(graphmain, graphmainstatic.graphmainid, graphmainstatic.graphmainindex, graphmainstatic)
    const [adstatic, setadstatic] = useAd()
    const [devstatic, setdevstatic] = useDev({
            devstaticdata: appstatic && appstatic[0].graphmainrender().data,
            devstaticaction: appstatic && appstatic[0].graphmainrender().action
        })
        
    if(typeof appstatic === 'undefined' || typeof devstatic === 'undefined') return null
// console.log('first', appstatic)
  return (
    <div>
        <main className="">
            <section className="">
                {/* {appstatic?.map((data) => (
                    data?.graphmainrender()
                ))} */}
            </section>
        </main>
    </div>
  )
}
