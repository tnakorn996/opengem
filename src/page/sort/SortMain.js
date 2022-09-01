import React from 'react'
import FeedMain from '../../component/feed/FeedMain'

export default function SortMain() {
  return (
    <div>
        <main className="">
            <section className="">
                <FeedMain feedmainstatic={{feedmainid: `sortarea`, feedmainindex: 0}} />
            </section>
        </main>
    </div>
  )
}
