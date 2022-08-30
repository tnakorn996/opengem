import React from 'react'

import FieldMain from '../../component/field/FieldMain'
import PostMain from '../../component/post/PostMain'
import StaMain from '../../component/sta/StaMain'
import useClient from '../../hook/useClient'
import useSplit from '../../hook/useSplit'
import CardMain from '../../layout/card/CardMain'

export default function ClaimForm() {
    const [splitstaticthree, setsplitstaticthree] = useSplit(3)

    const [clientstatic, setclientstatic] = useClient({
        //   id: 'couponindex',
          from: `claim`,
          select: `*`,
          order: [`claimid`, { ascending: false }],
          eq: ['couponid', splitstaticthree],
          limit: 1,
    })

    const [clientstatictwo, setclientstatictwo] = useClient({
        //   id: 'couponindex',
          from: `check`,
          select: `*`,
          order: [`couponid`, { ascending: false }],
          eq: ['couponid', splitstaticthree],
          limit: 1,
    })

  return (
    <div>
        <main className="">
            <section className="">
                
                {/* <StaMain 
                stamaindata={clientstatic && clientstatic} 
                stamainstatic={{stamainid: `claimsframe`, stamainindex: 0}} />
                <StaMain 
                stamaindata={clientstatictwo && clientstatictwo} 
                stamainstatic={{stamainid: `checksframe`, stamainindex: 0}} />
                <CardMain>
                <button className="w-full  m-button">✍️ Edit coupon</button>
                </CardMain> */}
                <PostMain 
                postmaindata={clientstatic}
                postmaindatatwo={clientstatictwo}
                postmainstatic={{postmainid: `claimaddress`, postmainindex: 3}} />

            </section>
        </main>
    </div>
  )
}
