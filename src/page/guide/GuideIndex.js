import React from 'react'
import PostMain from '../../component/post/PostMain'

export default function GuideIndex() {

  return (
    <div>
        <main className="">
            <section className="">
              <PostMain postmainstatic={{
                  postmainid: `guideaddress`, 
                  postmainindex: 1}} />
            </section>
        </main>
    </div>
  )
}
