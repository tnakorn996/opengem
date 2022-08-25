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

export default function PostMain({
    postmaindata,
    postmaindatatwo,
    postmainstatic,

}) {

    const {
        fieldmainstate,

        auth,
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
                return couponMainRender({
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

    const [appstatic, setappstatic] = useApp(postmain, postmainstatic.postmainid, postmainstatic.postmainindex, 
        postmainstatic, postmaindata, fieldmainstate, messagedl)
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
            <Link to={`/user/userindex/${data?.userid}`}>
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
    return (
        <div>
        <section className="">
            <article className="flex flex-row justify-between">
            <Link to={`/coupon/couponindex/${data?.couponid}`}>
                <CardMain>
                <p className="">{data?.couponid}</p>
                </CardMain>
            </Link>
                <DtaMain dtamaindata={{dtamainhref: `/claim/claimform/${data?.couponid}`}} dtamainstatic={{dtamainid: `claimdframe`, dtamainindex: 0}} >
                <CardMain>
                    more
                </CardMain>
                </DtaMain>
            </article>
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
        {auth ? (<>
        <section className="">
            <StaMain 
                stamaindata={datatwo && datatwo} 
                stamainstatic={{stamainid: `claimsframe`, stamainindex: 0}} />
        </section>
        </>) : (<>
        <section className="">
            <StaMain 
                stamaindata={datatwo && datatwo} 
                stamainstatic={{stamainid: `couponsframe`, stamainindex: 0}} />
        </section>
        </>)}
        </figcaption>
        </div>

            </>))}
    </div>
  )
}


export function claimMainRenderTwo({data}) {
    // console.log('datadd', data)
    // console.log('datatwo', datatwo)
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

