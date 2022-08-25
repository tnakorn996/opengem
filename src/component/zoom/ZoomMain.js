import React, { useContext, useEffect, useRef, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { settingul, workoutul } from '../../content/content'

import { Context } from '../../context/context'
import useApp from '../../hook/useApp'
import useSplit from '../../hook/useSplit'
import CardMain from '../card/CardMain'
import PostMain from '../post/PostMain'

export default function ZoomMain({
    zoommainstatic,

}) {
    const [zoommainvalue, setzoommainvalue] = useState('')
    const [zoommainindex, setzoommainindex] = useState(0)
    const {
        zoommainstate, setzoommainstate,
        fieldmainstate,

        workoutdl,
        taskdl,
        clubdl,
        ticketdl,
        searchdl,
        messagedl,
        
    } = useContext(Context)
    const [splitstaticthree, setsplitstaticthree] = useSplit(3)

    const companyinput = [
        {
            zoommaindata: [
                {
                    zoommainrender: () => {
                        return []
                    },
                },
            ]
        },
        {
            zoommaindata: [
                {
                    zoommaintitle: 'All workout',
                    zoommainrender: () => {

                        return companyinput[0].contextdata && companyinput[0].contextdata.filter(data => data.breadauthor?.toLowerCase().includes(zoommainvalue) || data.breadtitle?.toLowerCase().includes(zoommainvalue))
                    },

                },
            ]
        },
    ]

    const zoommain = [

        {
            zoommainid: 'companyinput',
            zoommainref: companyinput,
        },
    ]

    useEffect(() => {
        if(zoommainvalue === ''){setzoommainindex(0)}
        if(zoommainvalue !== ''){setzoommainindex(1)}
    }, [zoommainvalue])

    const [appstatic, setappstatic] = useApp(zoommain, zoommainstatic.zoommainid, zoommainindex, zoommainvalue, splitstaticthree, messagedl)
// console.log('appstatic', appstatic)
    // if(!workoutdl && !taskdl && !clubdl && !ticketdl) return null
    // console.log('fieldmainstate', fieldmainstate)
  return (
    <div>
        <main autoFocus={false}  className="">
            <section className="">
                <CardMain>
                <div className="relative flex items-center  l-h6">
                    <input autoFocus={false} onChange={p => setzoommainvalue(p.target.value.toLowerCase())} value={zoommainvalue} className="l-input" placeholder='Search' />
                    <div className="absolute right-0">
                        <CardMain>
                        <RiSearchLine  />
                        </CardMain>
                    </div>
                </div>
                </CardMain>
            </section>

            <section className="">
            {appstatic?.map((data) => (<>
                {data?.zoommaindata?.map((dat, index) => (<>
                    <div key={index}>
                        <figcaption className="">
                            {dat?.zoommainrender()?.length > 0 && (<>
                            <CardMain>
                            <h1 className="m-h5">{dat?.zoommaintitle}</h1>
                            </CardMain>
                            </>)}
                        </figcaption>
                        <figure className="">
                            {dat?.zoommainrender()?.map((post, i) => (<>
                                <div key={i}>
                                {zoommainstatic.zoommainid === 'couponinput' 
                                && <PostMain postmaindata={post} postmainstatic={{postmainid: 'settingaddress', postmainindex: 0}} />}
                                </div>
                            </>))}
                        </figure>
                    </div>
                </>))}
            </>))}
            </section>

        </main>
    </div>
  )
}