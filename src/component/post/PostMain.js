import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { RiMore2Line } from 'react-icons/ri'
import { motion } from 'framer-motion'

import { claimul, contributeul } from '../../content/content'
import { Context } from '../../context/Context'
import useApp from '../../hook/useApp'
import useSplit from '../../hook/useSplit'
import CardMain from '../../layout/card/CardMain'
import ChipMain from '../../layout/chip/ChipMain'
import AlertMain from '../alert/AlertMain'
import StaMain from '../sta/StaMain'
import DtaMain from '../dta/DtaMain'
import SheetMain from '../../layout/sheet/SheetMain'
import SpinMain from '../../layout/spin/SpinMain'
// import ThemeMain from '../../layout/theme/ThemeMain'
import ThemeMainTwo from '../../layout/theme/ThemeMainTwo'
import FieldMain from '../field/FieldMain'
import PtaMain from '../pta/PtaMain'

export default function PostMain({
    postmaindata,
    postmaindatatwo,
    postmainstatic,

}) {

    const {
        fieldmainstate,

        auth,
        claimdl,
        checkdl,
        messagedl,

    } = useContext(Context)
    const [splitstaticthree, setsplitstaticthree] = useSplit(3)

    const useraddress = [
        {
            postmainrender: () => {
                return userMainRender({
                    data: postmaindata
                })
            }
        }
    ]

    // console.log('postmaindata', postmaindata)

    const couponaddress = [
        {
            postmainrender: () => {
                if(!Array.isArray(claimdl[0]?.contextdata)
                || !Array.isArray(checkdl[0]?.contextdata)) return null
                const array = []
                const arraytwo = []
                if(claimdl[0]?.contextdata.length > 0) {
                    claimdl[0]?.contextdata?.forEach(data => {
                        if(data.couponid.couponid.includes(postmaindata.couponid)){
                            array.push(data)
                        } 
                    })
                } 
                if(checkdl[0]?.contextdata.length > 0) {
                    checkdl[0]?.contextdata?.forEach(data => {
                        if(data.couponid.couponid.includes(postmaindata.couponid)){
                            arraytwo.push(data)
                        } 
                    })
                } 
                return couponMainRender({
                    data: postmaindata,
                    datatwo: array[0],
                    datathree: arraytwo[0]
                })
            }
        },
        {
            postmainrender: () => {
                return couponMainRenderTwo({
                    auth: auth && auth,
                    data: postmaindata,
                    datatwo: postmaindatatwo,
                })
            }
        },
        {
            
        },
        {
            
        },
        {
            postmainrender: () => {
                return couponMainRenderFive({
                    data: postmaindata,
                })
            }
        },
    ]

    const claimaddress = [
        {
            postmainrender: () => {
                return claimMainRender({
                    data: postmaindata
                })
            }
        },
        {
            postmainrender: () => {
                return claimMainRenderTwo({
                    data: postmaindata,
                })
            }
        },
        {
            postmainrender: () => {
                return claimMainRenderTwo({})
            }
        },
        {
            postmainrender: () => {
                return claimMainRenderFour({
                    href: splitstaticthree,
                    data: postmaindata,
                    datatwo: postmaindatatwo
                })
            }
        },
    ]

    const filteraddress = [
        {
            postmainrender: () => {
                return filterMainRender({
                    data: postmaindata
                })
            }
        },
    ]

    const postmain = [
        {
            postmainid: `useraddress`,
            postmainref: useraddress,
        },
        {
            postmainid: `couponaddress`,
            postmainref: couponaddress,
        },
        {
            postmainid: `claimaddress`,
            postmainref: claimaddress,
        },
        {
            postmainid: `filteraddress`,
            postmainref: filteraddress,
        },
    ]

    const [appstatic, setappstatic] = useApp(postmain, postmainstatic.postmainid, postmainstatic.postmainindex, 
        postmainstatic, postmaindata, fieldmainstate, messagedl)
// console.log('appstatic', appstatic)
  return (
    <div>
        <main className="">
            <section className="">
                {appstatic?.map((data, index) => (<>
                <motion.article initial={{opacity: 0}} animate={{opacity: 1}} key={index} className="duration-100">
                    {data?.postmainrender()}
                </motion.article>
                </>))}
            </section>
        </main>
    </div>
  )
}

export function userMainRender({data}) {
  return (
    <div>
        <section className="">
            {data?.map((data, index) => (<>
            <Link key={index} to={`/user/userform/`}>
            <article className="">
                    <ChipMain>
                    <figure className="h-[30px] w-[30px] flex items-center justify-center bg-slate-700">
                <CardMain>
                        <p className="m-h3 uppercase">{data?.username?.slice(0, 1)}</p>
                </CardMain>
                    </figure>
                    </ChipMain>
            </article>
            </Link>
            </>))}
        </section>
    </div>
  )
}


export function couponMainRender({data, datatwo, datathree}) {
    // console.log('data', data)
    return (
        <div>
        <section className="">
            <CardMain>
            <SheetMain>
            <article className="flex flex-row justify-between">
                <CardMain>
                <ChipMain>
                {/* <ThemeMainTwo> */}
                <figure className="flex justify-center  bg-emerald-200 text-emerald-800">
                    <CardMain>
                    <p className="">${data?.couponcost}</p>
                    </CardMain>
                </figure>
                {/* </ThemeMainTwo> */}
                </ChipMain>
                </CardMain>
                <figcaption className="w-full flex flex-row items-center justify-between">
                    <Link to={`/coupon/couponindex/${datatwo?.couponid?.couponid || data?.couponid}`}>
                    <p className="m-h5 first-letter:uppercase">{data?.coupontitle}</p>
                    </Link>
                    <DtaMain dtamaindata={{dtamainhref: `/claim/claimform/${datatwo?.couponid?.couponid || data?.couponid}`}} dtamainstatic={{dtamainid: `claimdframe`, dtamainindex: 0}} >
                    <CardMain>
                        <p className="m-h5"><RiMore2Line /></p>
                    </CardMain>
                    </DtaMain>
                </figcaption>                
            </article>
            <article className="">
                <CardMain>
                <ChipMain>
                <ThemeMainTwo>
                    <div className="flex flex-row  uppercase m-h4">
                    <figure className={`w-full flex justify-center border-r-2 border-slate-800 ${couponMainAction(datatwo)}`}>
                        <CardMain>
                        {datatwo ? `claimed` : `unclaimed`}
                        </CardMain>
                    </figure>
                    <figure className={`w-full flex justify-center ${couponMainAction(datathree)}`}>
                        <CardMain>
                        {datathree ? `donated` : `undonated`}
                        </CardMain>
                    </figure>
                    </div>
                </ThemeMainTwo>
                </ChipMain>
                </CardMain>
                
            </article>
            </SheetMain>
            </CardMain>
        </section>
    </div>
  )
}

export function couponMainRenderTwo({data, datatwo, datathree, auth}) {
    // console.log('datadd', data)
    // console.log('datatwo', datatwo)
    return (
        <div>
        {data?.map((data, index) => (<>
        <div key={index} className="">
        <section className="">
            <AlertMain 
                alertmaindata={datatwo} 
                alertmainstatic={{alertmainid: `claimcaption`, alertmainindex: 0}} />
        </section>
        <section className="">
            {/* <article className="">
                <CardMain>
                <p className="">{data?.couponid}</p>
                </CardMain>
            </article> */}
        </section>

        <div className="md:grid md:grid-flow-col">
        <figure className="">
        <CardMain>
            <SheetMain>
            <section className="grid grid-flow-row justify-items-center">
                <CardMain>
                <figure className="h-[200px] w-[200px] flex justify-center items-center">
                <motion.img   initial={{opacity: 0}} animate={{opacity: 1}}  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://opengem.net/coupon/couponindex/${data?.couponid}`} className="absolute z-10  duration-100" alt="" />
                <SpinMain />
                </figure>
                </CardMain>
            </section>
            </SheetMain>
        </CardMain>
        </figure>
        <figcaption className="">
        <CardMain>
        <SheetMain>
        <section className="text-center">
            <CardMain>
            <p className="text-3xl">{data?.coupontitle}</p>
            </CardMain>
        </section>
        </SheetMain>
        </CardMain>
        <section className="w-full fixed bottom-0 left-0 md:relative">
        {auth ? (<>
            <StaMain 
                stamaindata={datatwo && datatwo} 
                stamainstatic={{stamainid: `claimsframe`, stamainindex: 0}} />
        </>) : (<>
            <StaMain 
                stamaindata={datatwo && datatwo} 
                stamainstatic={{stamainid: `couponsframe`, stamainindex: 0}} />
        </>)}
        </section>
        </figcaption>
        </div>

        </div>
        </>))}
    </div>
  )
}

export function couponMainRenderFive({data}) {
    return (
        <div>
        <section className="">
         <AlertMain 
            alertmaindata={data} 
            alertmainstatic={{alertmainid: `couponcaption`, alertmainindex: 1}} />
        </section>
    </div>
  )
}

export function claimMainRender({data}) {
    // console.log('datadd', data)
    // console.log('datatwo', datatwo)
    return (
        <div>
        <section className="">
        <CardMain>
        ccc        
        </CardMain>
        </section>
    </div>
  )
}

export function claimMainRenderTwo({data}) {
    return (
        <div>
        <section className="">
         <AlertMain 
            alertmaindata={data} 
            alertmainstatic={{alertmainid: `claimcaption`, alertmainindex: 1}} />
        </section>
    </div>
  )
}

export function claimMainRenderFour({data, datatwo, href}) {
    return (
        <div>
            <section className="">
                <StaMain 
                    stamaindata={data && data} 
                    stamainstatic={{stamainid: `claimsframe`, stamainindex: 0}} />
                <StaMain 
                    stamaindata={datatwo && datatwo} 
                    stamainstatic={{stamainid: `checksframe`, stamainindex: 0}} />
                <FieldMain 
                    fieldmainstatic={{fieldmainid: `couponform`, fieldmainindex: 1}} 
                    fieldmainstyle={{section: `!bg-red-700`}} />
                <CardMain>
                <Link to={`/coupon/couponform/${href}`}>
                <button className="w-full  m-button">📝 Edit coupon</button>
                </Link>
                </CardMain>
            </section>
    </div>
  )
}

export function filterMainRender({data}) {
  return (
    <div>
        <section className="">
            <CardMain>
            <SheetMain>
            <CardMain>
            <article className="flex items-center justify-between">
                <p className="m-h5 uppercase">{data?.contenttitle}</p>
                <PtaMain 
                ptamaindata={data}
                ptamainstatic={{ptamainid: `filterpframe`}} />
            </article>
            </CardMain>
            </SheetMain>
            </CardMain>
        </section>
    </div>
  )
}


export function couponMainAction(first) {
    if(typeof first === 'undefined') return `!bg-slate-700`
    if(typeof first !== 'undefined') return `!bg-green-700`
  return 
}
