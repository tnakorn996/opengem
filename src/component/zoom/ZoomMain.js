import React, { useContext, useEffect, useRef, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { settingul, workoutul } from '../../content/content'
import { Context } from '../../context/Context'

import './index.css'
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
        appstate, setappstate,

        coupondl,
        claimdl,
        messagedl,
        
    } = useContext(Context)
    const [splitstaticthree, setsplitstaticthree] = useSplit(3)

    const couponinput = [
        {
            zoommaindata: [
                {
                    zoommaintitle: 'Unclaimed coupon',
                    zoommainrender: () => {
                        if(!Array.isArray(coupondl[0].contextdata)
                        || !Array.isArray(claimdl[0].contextdata)) return null
                        if(claimdl[0].contextdata.length > 0) {
                            const array = []
                            coupondl[0].contextdata.forEach(data => {
                                const filter = claimdl[0].contextdata.filter(dat => data.couponid === dat.couponid.couponid)
                                if(filter.length === 0) {
                                    array.push(data)
                                }
                            })
                            return appInputRender({
                                data: array,
                                postmainstatic: {postmainid: `couponaddress`, postmainindex: 0},
                            })
                        } else  {
                             return appInputRender({
                                data: coupondl[0].contextdata ,
                                postmainstatic: {postmainid: `couponaddress`, postmainindex: 0},
                            })
                        }    
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
                            data:  coupondl[0].contextdata && coupondl[0].contextdata.filter(data => data.couponid?.toLowerCase().includes(zoommainvalue) || data.coupontitle?.toString()?.toLowerCase().includes(zoommainvalue)),
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
                    zoommaintitle: 'Claimed coupon',
                    zoommainrender: () => {
                        if(!Array.isArray(coupondl[0].contextdata)
                        || !Array.isArray(claimdl[0].contextdata)) return null
                        if(claimdl[0].contextdata.length > 0) {
                            const array = []
                            claimdl[0].contextdata.forEach(data => {
                                const filter = coupondl[0].contextdata.filter(dat => dat.couponid === data.couponid.couponid)
                                array.push(filter[0])
                            })
                            return appInputRender({
                                data: array,
                                postmainstatic: {postmainid: `couponaddress`, postmainindex: 0},
                            })
                        } else  {
                             return appInputRender({
                                data: [],
                                postmainstatic: {postmainid: `couponaddress`, postmainindex: 0},
                            })
                        }    
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
                            data:  coupondl[0].contextdata && coupondl[0].contextdata.filter(data => data.couponid?.toLowerCase().includes(zoommainvalue) || data.coupontitle?.toString()?.toLowerCase().includes(zoommainvalue)),
                            postmainstatic: {postmainid: `couponaddress`, postmainindex: 0},
                        })
                    },
                },
            ]
        },
    ]

    const zoommain = [
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
        appstate, zoommainvalue, splitstaticthree, messagedl)
// console.log('appstaticss', appstatic)
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
                        {dat?.zoommainrender()?.props.children.props.children.length > 0 && <figcaption className="">
                            <CardMain>
                            <h1 className="m-h5">{dat?.zoommaintitle}</h1>
                            </CardMain>
                        </figcaption>}
                        <figure className="">
                            {dat?.zoommainrender()}
                        </figure>
                    </div>
                </>))}
            </>))}
            </section>

        </main>
    </div>
  )
}

export function appInputRender({data, postmainstatic}) {
  return (
    <div>
        <section className="no-scrollbar">
            {data?.map(data => (<>
            <PostMain postmaindata={data} postmainstatic={postmainstatic} />
            </>))}
        </section>
    </div>
  )
}
