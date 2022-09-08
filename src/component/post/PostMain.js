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
import RtaMain from '../rta/RtaMain'

export default function PostMain({
    postmaindata,
    postmaindatatwo,
    postmainstatic,

}) {

    const {
        appstate,
        fieldmainstate,

        auth,
        claimdl,
        checkdl,
        messagedl,
        guidedl,

    } = useContext(Context)
    const [splitstaticthree, setsplitstaticthree] = useSplit(3)

    const appaddress = [
        {
            postmainrender: () => {
                return appMainRender({
                    data: postmaindata
                })
            }
        }
    ]

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

    const sortaddress = [
        {
            postmainrender: () => {
                return sortMainRender({
                    data: postmaindata
                })
            }
        },
    ]

    const guideaddress = [
        {

        },
        {
            postmainrender: () => {
                const filter = guidedl[0].contextdata().filter(data => data.contextidtwo === splitstaticthree)
                // const assign =  Object.assign(Object.assign(guidedl[0]), )
                return guideMainRenderTwo({
                    data: filter
                })
            }
        },
    ]

    const notificationaddress = [
        {
            postmainrender: () => {
                // const filter = guidedl[0].contextdata().filter(data => data.contextidtwo === splitstaticthree)
                // const assign =  Object.assign(Object.assign(guidedl[0]), )
                return notificationMainRender({
                    data: postmaindata
                })
            }
        },
    ]

    const postmain = [
              {
            postmainid: `appaddress`,
            postmainref: appaddress,
        },
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
                {
            postmainid: `sortaddress`,
            postmainref: sortaddress,
        },
        {
            postmainid: `guideaddress`,
            postmainref: guideaddress,
        },
        {
            postmainid: `notificationaddress`,
            postmainref: notificationaddress,
        },
    ]

    const [appstatic, setappstatic] = useApp(postmain, postmainstatic.postmainid, postmainstatic.postmainindex, 
        postmainstatic, 
        fieldmainstate, 
        splitstaticthree,

        postmaindata, 
        messagedl,)
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

export function appMainRender({data}) {
  return (
    <div>
        <section className="">
            <Link to={data?.contentaction}>
                <CardMain>
            <article className="flex items-center flex-row justify-center gap-2  m-h4 uppercase">
                    <p className="">{data?.contenticon}</p>
                    <p className="">{data?.contenttitle}</p>
            </article>
                </CardMain>
            </Link>
        </section>
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
        <section className="px-[20px]">
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
        </section>
        <br />
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
        <CardMain>
        <ChipMain>
        <ThemeMainTwo>
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
        <figure className="">
            <CardMain>
                <SheetMain>
                <section className="grid grid-flow-row justify-items-center">
                    <CardMain>
                    <figure className="h-[200px] w-[200px] flex justify-center items-center">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://opengem.net/coupon/couponindex/${data?.couponid}`} className="absolute z-10" alt="" />
                    <SpinMain />
                    </figure>
                    </CardMain>
                </section>
                </SheetMain>
            </CardMain>
        </figure>
        </ThemeMainTwo>
        </ChipMain>
        </CardMain>

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
            <section className="z-20 w-full fixed bottom-0 left-0">
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
        <div className="px-[20px]">
        <SheetMain>
        <section className="flex flex-row items-center justify-between">
        <CardMain>
            <ChipMain>
            <figure className={couponMainAction(data?.claimboolean || data?.checkboolean)}>
        <CardMain>
        <p className="m-h3  uppercase">{data?.claimboolean && `claimed`}</p>
        <p className="m-h3  uppercase">{data?.checkboolean && `donated`}</p>
        </CardMain>
            </figure>
            </ChipMain>
        </CardMain>
        <CardMain>
            <figcaption className="text-right">
                <Link to={`/coupon/couponindex/${data?.couponid?.couponid}`}>
        <p className="m-h5  first-letter:uppercase">{data?.couponid?.coupontitle}</p>
                </Link>
        <p className="l-h4">{data?.created_at?.slice(0, 10)}</p>
        {/* <p className="l-h4">{couponMainActionTwo(data?.created_at)}</p> */}
            </figcaption>
        </CardMain>
        </section>
            </SheetMain>
            <br />
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
                <CardMain>
                <Link to={`/coupon/couponform/${href}`}>
                <button className="w-full  m-button">📝 Edit coupon</button>
                </Link>
                </CardMain>
                <FieldMain 
                    fieldmainstatic={{fieldmainid: `couponform`, fieldmainindex: 1}} 
                    fieldmainstyle={{button: `!bg-red-700`}} />
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
                <p className="m-h3 uppercase">{data?.contenttitle}</p>
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

export function sortMainRender({data}) {
  return (
    <div>
        <section className="">
            <CardMain>
            <SheetMain>
            <CardMain>
            <article className="flex items-center justify-between">
                <p className="m-h3 uppercase">{data?.contenttitle}</p>
                <RtaMain 
                rtamaindata={data}
                rtamainstatic={{rtamainid: `sortrframe`}} />
            </article>
            </CardMain>
            </SheetMain>
            </CardMain>
        </section>
    </div>
  )
}

export function guideMainRenderTwo({data}) {
  return (
    <div>
        {data?.map(data => (<>
        <section className="">
            <CardMain>
            <p className="m-h6">{data.contextdetail}</p>
            </CardMain>
            <Link to={data.contextrender().navigate}>
                <CardMain>
                <button className="w-full  m-button">Go to link</button>
                </CardMain>
            </Link>
        </section>
        </>))}
    </div>
  )
}

export function notificationMainRender({data}) {
    // console.log('data', data)
  return (
    <div>
        <section className="">
            <CardMain>
            <SheetMain>
            <CardMain>
                <Link to={`/coupon/couponindex/${data.contextrender().navigate}`}>
                <article className="grid grid-flow-col justify-between items-start gap-5  l-h4 ">
            <p className="first-letter:uppercase">{data.contextdetail}</p>
            <p className="">{couponMainActionTwo(data.contextrender().data.created_at)} ago</p>
                </article>
                </Link>
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


export function couponMainActionTwo(date) {
  if(typeof date === "undefined" ) return null;
//   var aDay = 24*60*60*1000;
  const ref=   new Date(date);
// const ref = date.slice(0, 19)
// const ref = date.toISOString()
// const ref = date.replace('T', ' ')
// const ref = date.toLocaleString()

  var seconds = Math.floor((new Date() - ref) / 1000);
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
// var aDay = 24*60*60*1000;
// console.log(timeSince(new Date(Date.now()-aDay)));
// console.log(timeSince(new Date(Date.now()-aDay*2)));