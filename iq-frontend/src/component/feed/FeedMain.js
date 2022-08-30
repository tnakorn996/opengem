import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Context } from '../../context/Context'
import useApp from '../../hook/useApp'
import CardMain from '../../layout/card/CardMain'
import PostMain from '../post/PostMain'

export default function FeedMain({
    feedmainstatic,

}) {
    const {

        coupondl,
        messagedl,

    } = useContext(Context)

    const couponarea = [
        {
            feedmaintitle: `My coupons`,
            feedmainrender: () => { 
                return coupondl[0]?.contextdata?.map((data, index) => (<>
                <PostMain key={index} postmaindata={data} postmainstatic={{postmainid: `couponaddress`, postmainindex: 0}} />
                </>)) 
            }
        },
        {
            feedmaintitle: `My archive`,
            feedmainrender: () => { 
                return coupondl[0]?.contextdata?.map((data, index) => (<>
                <PostMain key={index} postmaindata={data} postmainstatic={{postmainid: `couponaddress`, postmainindex: 0}} />
                </>)) 
            }
        },
    ]


    const feedmain = [
        {
            feedmainid: `couponarea`,
            feedmainref: couponarea,
        }
    ]

    const [appstatic, setappstatic] = useApp(feedmain, feedmainstatic.feedmainid, feedmainstatic.feedmainindex, messagedl)

  return (
    <div>
        <main className="">
                {appstatic?.map((data, index) => (<>
            <section  key={index} className="">
                <CardMain>
                <p className="">{data?.feedmaintitle}</p>
                </CardMain>
                    {data?.feedmainrender()}
            </section>
                </>))}
        </main>
    </div>
  )
}
