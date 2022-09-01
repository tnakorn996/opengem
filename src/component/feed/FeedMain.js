import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { appul, checkul, claimul, sortul } from '../../content/content'
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

    const apparea = [
        {
            feedmainrender: () => { 
                return appul?.map((data, index) => (<>
                <PostMain key={index} postmaindata={data} postmainstatic={{postmainid: `appaddress`, postmainindex: 0}} />
                </>)) 
            }
        },
    ]


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

     const filterarea = [
        {
            // feedmaintitle: `My coupons`,
            feedmainrender: () => { 
                const concat = claimul.concat(checkul)
                return concat?.map((data, index) => (<>
                <PostMain key={index} postmaindata={data} postmainstatic={{postmainid: `filteraddress`, postmainindex: 0}} />
                </>)) 
            }
        },
    ]

    const sortarea = [
        {
            feedmainrender: () => { 
                return sortul?.map((data, index) => (<>
                <PostMain key={index} postmaindata={data} postmainstatic={{postmainid: `sortaddress`, postmainindex: 0}} />
                </>)) 
            }
        },
    ]


    const feedmain = [
              {
            feedmainid: `apparea`,
            feedmainref: apparea,
        },
        {
            feedmainid: `couponarea`,
            feedmainref: couponarea,
        },
                {
            feedmainid: `filterarea`,
            feedmainref: filterarea,
        },
                        {
            feedmainid: `sortarea`,
            feedmainref: sortarea,
        },
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
