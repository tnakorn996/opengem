import React from 'react'
import FeedMain from '../../component/feed/FeedMain'

export default function FilterMain() {

  return (
    <div>
        <main className="">
            <section className="">
                <FeedMain feedmainstatic={{feedmainid: `filterarea`, feedmainindex: 0}} />
            </section>
        </main>
    </div>
  )
}
