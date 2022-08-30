import React, { useContext, useEffect, useRef, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { settingul, workoutul } from '../../content/content'
import { Context } from '../../context/Context'

import useApp from '../../hook/useApp'
import useSplit from '../../hook/useSplit'
import CardMain from '../../layout/card/CardMain'
import PostMain from '../post/PostMain'

export default function ZoomMain({
    zoommainstatic,

}) {
    const [zoommainvalue, setzoommainvalue] = useState('')
    const [zoommainindex, setzoommainindex] = useState(0)
    const {
        zoommainstate, setzoommainstate,
        fieldmainstate,

        coupondl,
        claimdl,
        messagedl,
        
    } = useContext(Context)
    const [splitstaticthree, setsplitstaticthree] = useSplit(3)

    const couponinput = [
        {
            zoommaindata: [
                {
                    zoommaintitle: 'My coupons',
                    zoommainrender: () => {
                        return appInputRender({
                            data: coupondl[0].contextdata && coupondl[0].contextdata,
                            postmainstatic: {postmainid: `couponaddress`, postmainindex: 0},
                        })
                    },
                },
            ]
        },
        {
            zoommaindata: [
                {
                    zoommaintitle: 'Coupon results',
                    zoommainrender: () => {
                        return appInputRender({
                            data:  coupondl[0].contextdata && coupondl[0].contextdata.filter(data => data?.couponid?.toString()?.toLowerCase().includes(zoommainvalue) || data.coupontitle?.toString()?.toLowerCase().includes(zoommainvalue)),
                            postmainstatic: {postmainid: `couponaddress`, postmainindex: 0},
                        })
                    },
                },
            ]
        },
    ]

    const claiminput = [
        {
            zoommaindata: [
                {
                    zoommaintitle: 'All activity',
                    zoommainrender: () => {
                        return appInputRender({
                            data: claimdl[0].contextdata && claimdl[0].contextdata,
                            postmainstatic: {postmainid: `claimaddress`, postmainindex: 0},
                        })
                    },
                },
            ]
        },
        {
            zoommaindata: [
                {
                    zoommaintitle: 'Activity results',
                    zoommainrender: () => {
                        return appInputRender({
                            data:  claimdl[0].contextdata && claimdl[0].contextdata.filter(data => data.couponid?.toLowerCase().includes(zoommainvalue)),
                            postmainstatic: {postmainid: `claimaddress`, postmainindex: 0},
                        })
                    },
                },
            ]
        },
    ]

    const zoommain = [

        // {
        //     zoommainid: 'companyinput',
        //     zoommainref: companyinput,
        // },

        {
            zoommainid: 'couponinput',
            zoommainref: couponinput,
        },
        {
            zoommainid: 'claiminput',
            zoommainref: claiminput,
        },

    ]

    useEffect(() => {
        if(zoommainvalue === ''){setzoommainindex(0)}
        if(zoommainvalue !== ''){setzoommainindex(1)}
    }, [zoommainvalue])

    const [appstatic, setappstatic] = useApp(zoommain, zoommainstatic.zoommainid, zoommainindex, 
         zoommainvalue, splitstaticthree, messagedl)
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
            {appstatic?.map((data) => (
                data?.zoommaindata?.map((dat, index) => (<>
                    <div key={index}>
                        <figcaption className="">
                            <CardMain>
                            <h1 className="m-h5">{dat?.zoommaintitle} ({dat?.zoommainrender()?.props?.children?.props?.children?.length})</h1>
                            </CardMain>
                        </figcaption>
                        <figure className="">
                            {dat?.zoommainrender()}
                        </figure>
                    </div>
                </>))
            ))}
            </section>

        </main>
    </div>
  )
}

export function appInputRender({data, postmainstatic}) {
  return (
    <div>
        <section className="flex flex-col md:grid md:grid-cols-2">
            {data?.map((data, index) => (<>
            <PostMain 
                key={index}
                postmaindata={data} 
                postmainstatic={postmainstatic} />
            </>))}
        </section>
    </div>
  )
}
