import React, { useContext, useEffect } from 'react'

import { Context } from '../../context/Context'
import useAd from '../../hook/useAd'
// import useApp from '../../hook/useApp'
// import useSplit from '../../hook/useSplit'
// import useDev from '../../hook/useDev'
// import useDev from '../../hook/useDev.tsx'

export default function GraphMain({
    graphmainstatic,

}) {
    const {
        // setappstate, appstate,

        // taskuserid,
        // guidedl,
        // messagedl,

    } = useContext(Context)
    const [adstatic, setadstatic] = useAd()

    // const guidebase = [
    //     {
    //         graphmainindex: 0,
    //         graphmainrender: () => {
    //             return {
    //                 data: (guidedl[0]?.spreaddata()?.concat(
    //                     guidedl[1]?.spreaddata()))?.filter((data) => data?.spreadrender()?.booltwo === true),
    //                 action: {
    //                     appid:'backdropmain',
    //                     appidtwo: 'previewmain',
    //                     appidthree: 'guidearticle',
    //                     appindex: 0
    //                 }
    //             } 
    //         }
    //     }
    // ]

    // const messagebase = [
    //     {
    //         graphmainindex: 0,
    //         graphmainrender: () => {
    //             return {
    //                 data: (messagedl[0]?.spreaddata()?.concat(
    //                     messagedl[1]?.spreaddata(), 
    //                     // messagedl[2]?.spreaddata(),  
    //                     messagedl[3]?.spreaddata(), 
    //                     messagedl[4]?.spreaddata()))?.filter(data => data?.spreadrender()?.booltwo === true && data?.spreadrender()?.bool === true),
    //                 action: {
    //                     appid:'backdropmain',
    //                     appidtwo: 'previewmain',
    //                     appidthree: 'apparticle',
    //                     appindex: 0
    //                 }
    //             } 
    //         }
    //     }
    // ]

    // const graphmain = [
    //     {
    //         graphmainid: 'guidebase',
    //         graphmainref: guidebase,
    //     },
    //     {
    //         graphmainid: 'messagebase',
    //         graphmainref: messagebase,
    //     },
    // ]

    // // console.log('graphmainstatic', graphmainstatic)
    // const [adstatic, setadstatic] = useAd()
    // const [appstatic, setappstatic] = useApp(graphmain, graphmainstatic.graphmainid, graphmainstatic.graphmainindex, graphmainstatic)
    // const [devstatic, setdevstatic] = useDev({
    //         devstaticdata: appstatic && appstatic[0].graphmainrender().data,
    //         devstaticaction: appstatic && appstatic[0].graphmainrender().action
    //     })
        
    // if(typeof appstatic === 'undefined' || typeof devstatic === 'undefined') return null

  return (
    <div>
        <main className="">
            <section className="">
                {/* {appstatic?.map((data: { graphmainrender: () => any }) => (<>
                    {data?.graphmainrender()}
                </>))} */}
            </section>
        </main>
    </div>
  )
}
