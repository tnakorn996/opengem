import React, { useContext, useEffect, useRef, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { settingul, workoutul } from '../../content/content'
import { Context } from '../../context/Context'

import useApp from '../../hook/useApp'
import useSplit from '../../hook/useSplit'
import CardMain from '../../layout/card/CardMain'
import PostMain from '../post/PostMain'
import DtaMain from '../dta/DtaMain'

export default function ZoomMain({
    zoommainstatic,

}) {
    const [zoommainvalue, setzoommainvalue] = useState('')
    const [zoommainindex, setzoommainindex] = useState(0)
    const {
        zoommainstate, setzoommainstate,
        fieldmainstate,
        ptamainstate,

        coupondl,
        claimdl,
        checkdl,
        messagedl,
        
    } = useContext(Context)
    const [splitstaticthree, setsplitstaticthree] = useSplit(3)

    useEffect(() => {
        if(zoommainvalue === ''){setzoommainindex(0)}
        if(zoommainvalue !== ''){setzoommainindex(1)}
    }, [zoommainvalue])

    const couponinput = [
        {
            zoommaindata: [
                {
                    zoommaintitle: 'My coupons',
                    zoommainrender: () => {
                        // if(!Array.isArray(claimdl[0].contextdata)) return null
                        const empty = []
                        const parsefilter = JSON.parse(window.localStorage.getItem("opengem-filterpframe"));
                        const array = coupondl[0].contextdata
                            for(const data of array){
                                claimdl[0].contextdata.forEach(dat => {
                                    if(data.couponid === dat.couponid.couponid){
                                        Object.assign(data, {claimboolean: `claim`})
                                    }
                                })
                                checkdl[0].contextdata.forEach(dat => {
                                    if(data.couponid === dat.couponid.couponid){
                                        Object.assign(data, {checkboolean: `paid`})
                                    }
                                })
                            }

                            // console.log('arrays', array)
                            // console.log('parsefilter', parsefilter)
                            array.forEach(data => {
                                if(parsefilter.length === 0){
                                    empty.push(data)
                                }
                                if(parsefilter.some(dat => dat['contentid'] === data.claimboolean)
                                && parsefilter.some(dat => dat['contentid'] === data.checkboolean)){
                                    empty.push(data)
                                    console.log('first')
                                }
                                if(parsefilter.length !== 0 
                                    && parsefilter.every(dat => dat['contentid'] === data.claimboolean)){
                                    empty.push(data)
                                    console.log('sec')
                                }
                                if(parsefilter.length !== 0 
                                    && parsefilter.every(dat => dat['contentid'] === data.checkboolean )){
                                    empty.push(data)
                                    console.log('th')
                                }
                                
                            })
                            return appInputRender({
                                data: empty,
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

    const zoommain = [
        {
            zoommainid: 'couponinput',
            zoommainref: couponinput,
        },
    ]

    const [appstatic, setappstatic] = useApp(zoommain, zoommainstatic.zoommainid, zoommainindex, 
         zoommainvalue, splitstaticthree, messagedl, ptamainstate)
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

            {/* <CardMain> */}
            <section className="px-[20px] grid grid-cols-2 gap-2">
                <DtaMain dtamaindata={{dtamainhref: `/filter/filtermain`}} dtamainstatic={{dtamainid: `filterdframe`, dtamainindex: 0}} >
                <button className="w-full  l-button">Filters</button>
                </DtaMain>
                <button className="w-full  l-button">Sort</button>
            </section>
            {/* </CardMain> */}

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
