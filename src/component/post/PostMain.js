import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { claimul, contributeul } from '../../content/content'
import { Context } from '../../context/Context'
import useApp from '../../hook/useApp'
import CardMain from '../../layout/card/CardMain'
import ChipMain from '../../layout/chip/ChipMain'
import AlertMain from '../alert/AlertMain'
import StaMain from '../sta/StaMain'
import DtaMain from '../dta/DtaMain'
import SheetMain from '../../layout/sheet/SheetMain'
import SpinMain from '../../layout/spin/SpinMain'
import ThemeMain from '../../layout/theme/ThemeMain'
import ThemeMainTwo from '../../layout/theme/ThemeMainTwo'
import { RiMore2Line } from 'react-icons/ri'

export default function PostMain({
    postmaindata,
    postmaindatatwo,
    postmainstatic,

}) {

    const {
        fieldmainstate,

        auth,
        claimdl,
        messagedl,

    } = useContext(Context)

    const useraddress = [
        {
            postmainrender: () => {
                return userMainRender({
                    data: postmaindata
                })
            }
        }
    ]

    const couponaddress = [
        {
            postmainrender: () => {
                return couponMainRender({
                    data: Object.assign(postmaindata)
                })
            }
        },
        {
            postmainrender: () => {
                // const assign = Object.assign(...postmaindata)
                // const filter = claimul.filter(data => data.contentid === assigntwo.claimid)
                // const filtertwo = contributeul.filter(data => data.contentid === assign.contributeid)
                // console.log('filtertwo', filtertwo)
                return couponMainRenderTwo({
                    auth: auth && auth,
                    data: postmaindata,
                    datatwo: postmaindatatwo,
                })
            }
        }
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
                // const assign = Object.assign(...postmaindata)
                // const filter = claimul.filter(data => data.contentid === assigntwo.claimid)
                // const filtertwo = contributeul.filter(data => data.contentid === assign.contributeid)
                // console.log('filtertwo', filtertwo)
                return claimMainRenderTwo({
                    data: postmaindata,
                })
            }
        }
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
        }
    ]

    const [appstatic, setappstatic] = useApp(postmain, postmainstatic.postmainid, postmainstatic.postmainindex, postmainstatic, postmaindata, fieldmainstate, messagedl)


// console.log('appstatic', appstatic)
  return (
    <div>
        <main className="">
            <section className="">
                {appstatic?.map(data => (<>
                    {data?.postmainrender()}
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
            {data?.map(data => (<>
            <Link to={`/user/userform/`}>
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


export function couponMainRender({data}) {
    // console.log('data', data)
    return (
        <div>
        <section className="">
            <CardMain>
            <SheetMain>
            <article className="flex flex-row justify-between">
                <CardMain>
                <ChipMain>
                <ThemeMainTwo>
                <figure className="w-[60px] h-[60px] flex justify-center">
                    <CardMain>
                    <p className="">{data?.couponcost}</p>
                    </CardMain>
                </figure>
                </ThemeMainTwo>
                </ChipMain>
                </CardMain>
                <figcaption className="w-full flex flex-row items-center justify-between">
                    <Link to={`/coupon/couponindex/${data?.couponid?.couponid || data?.couponid}`}>
                    <CardMain>
                    <p className="m-h5">{data?.coupontitle}</p>
                    </CardMain>
                    </Link>
                    <DtaMain dtamaindata={{dtamainhref: `/claim/claimform/${data?.couponid?.couponid || data?.couponid}`}} dtamainstatic={{dtamainid: `claimdframe`, dtamainindex: 0}} >
                    <CardMain>
                        <p className="m-h5"><RiMore2Line /></p>
                    </CardMain>
                    </DtaMain>
                </figcaption>                
            </article>
            {/* <article className="">
                <CardMain>
                <ChipMain>
                <ThemeMainTwo>
                    <div className="flex flex-row  uppercase m-h4">
                    <figure className={`w-full flex justify-center ${couponMainAction(data?.claimid)}`}>
                        <CardMain>
                        {data?.claimid ? `claimed` : `unclaimed`}
                        </CardMain>
                    </figure>
                    <figure className={`w-full flex justify-center ${couponMainAction(data?.claimid)}`}>
                        <CardMain>
                        {data?.claimid ? `donated` : `undonated`}
                        </CardMain>
                    </figure>
                    </div>
                </ThemeMainTwo>
                </ChipMain>
                </CardMain>
                
            </article> */}
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
        {data?.map(data => (<>
        <section className="">
            <AlertMain 
                alertmaindata={datatwo} 
                alertmainstatic={{alertmainid: `claimcaption`, alertmainindex: 0}} />
        </section>
        <section className="">
            <article className="">
                <CardMain>
                <p className="">{data?.couponid}</p>
                </CardMain>
            </article>
        </section>

        <div className="md:grid md:grid-flow-col">
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
        <figcaption className="">
        <CardMain>
        <SheetMain>
        <section className="">
            <CardMain>
            <p className="text-3xl">${data?.couponcost}</p>
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

        </>))}
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

export function couponMainAction(first) {
    if(typeof first === 'undefined') return `!bg-slate-700`
    if(typeof first !== 'undefined') return `!bg-green-700`
  return 
}
