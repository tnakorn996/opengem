import React from 'react'

import FeedMain from '../../component/feed/FeedMain'
import TabMain from '../../component/tab/TabMain'
import ZoomMain from '../../component/zoom/ZoomMain'

export default function CouponMain() {

  return (
    <div>
        <main className="">
            <section className="">
              <TabMain tabmainstatic={{tabmainid: `couponfieldset`}} />

            </section>
        </main>
    </div>
  )
}
