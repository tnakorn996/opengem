import React, { useContext, useEffect, useRef, useState } from 'react'
import { RiArrowUpDownLine, RiFilter3Line, RiSearchLine } from 'react-icons/ri'
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

    const parsefilter = JSON.parse(window.localStorage.getItem("opengem-filterpframe"));
    const concat = (Array.isArray(claimdl[0].contextdata) && Array.isArray(checkdl[0].contextdata)) && claimdl[0].contextdata.concat(checkdl[0].contextdata)

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
                        if(!Array.isArray(claimdl[0].contextdata)
                        || !Array.isArray(checkdl[0].contextdata)) return null
                        const empty = []
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
                            array.forEach(data => {
                                if(parsefilter.length === 0){
                                    empty.push(data)
                                }
                                if(parsefilter.length !== 0 
                                && parsefilter.some(dat => dat['contentid'] === data.claimboolean)
                                && parsefilter.some(dat => dat['contentid'] === data.checkboolean)){
                                    empty.push(data)
                                }
                                if(parsefilter.length !== 0 
                                && parsefilter.every(dat => dat['contentid'] === data.claimboolean)){
                                    empty.push(data)
                                }
                                if(parsefilter.length !== 0 
                                && parsefilter.every(dat => dat['contentid'] === data.checkboolean )){
                                    empty.push(data)
                                }
                                
                            })
                            // console.log('empty', empty)
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

    const claiminput = [
        {
            zoommaindata: [
                {
                    zoommaintitle: 'My activity',
                    zoommainrender: () => {
                        const empty = []
                        const parsesort = JSON.parse(window.localStorage.getItem("opengem-sortrframe"));
                            concat.forEach(data => {
                                if(data.claimid){
                                    Object.assign(data, {claimboolean: `claim`})
                                } 
                                if(data.checkid){
                                    Object.assign(data, {checkboolean: `paid`})
                                } 
                            })

                            concat.forEach(data => {
                                if(parsefilter.length === 0){
                                    empty.push(data)
                                }
                                if(parsefilter.length !== 0 
                                && parsefilter.every(dat => dat['contentid'] === data.claimboolean)){
                                    empty.push(data)
                                }
                                if(parsefilter.length !== 0 
                                && parsefilter.every(dat => dat['contentid'] === data.checkboolean )){
                                    empty.push(data)
                                }
                                
                            })
                            // console.log('empty', empty)
                            return appInputRender({
                                data: empty.sort((a, b) => 
                                     Object.assign(...parsesort).contentbool 
                                    ? a.created_at.localeCompare(b.created_at) 
                                    : b.created_at.localeCompare(a.created_at)),
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
                            data: concat.filter(data => data?.couponid?.couponid?.toString()?.toLowerCase().includes(zoommainvalue) || data.couponid?.coupontitle?.toString()?.toLowerCase().includes(zoommainvalue)),
                            postmainstatic: {postmainid: `claimaddress`, postmainindex: 0},
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

            <section className="px-[20px] grid grid-cols-2 gap-5">
                <DtaMain dtamaindata={{dtamainhref: `/filter/filtermain`}} dtamainstatic={{dtamainid: `filterdframe`, dtamainindex: 0}} >
                <button className="w-full flex items-center justify-center gap-1  l-button"><RiFilter3Line /> Filters {parsefilter?.length > 0 && parsefilter?.length}</button>
                </DtaMain>
                <DtaMain dtamaindata={{dtamainhref: `/sort/sortmain`}} dtamainstatic={{dtamainid: `sortdframe`, dtamainindex: 0}} >
                <button className="w-full flex items-center justify-center gap-1  l-button"> <RiArrowUpDownLine /> Sort</button>
                </DtaMain>
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
