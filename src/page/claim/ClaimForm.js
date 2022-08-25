import React from 'react'

import FieldMain from '../../component/field/FieldMain'
import StaMain from '../../component/sta/StaMain'
import useClient from '../../hook/useClient'
import useSplit from '../../hook/useSplit'

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

  return (
    <div>
        <main className="">
            <section className="">
                {/* <FieldMain fieldmainstatic={{fieldmainid: `claimform`, fieldmainindex: 0}} />  */}
                <StaMain 
                stamaindata={clientstatic && clientstatic} 
                stamainstatic={{stamainid: `claimsframe`, stamainindex: 0}} />
            </section>
        </main>
    </div>
  )
}
