import React, { useContext } from 'react'

import TabMain from '../../component/tab/TabMain'
import { Context } from '../../context/Context'
import CardMain from '../../layout/card/CardMain'

export default function AuthMain() {

  const {
    
    auth,

  } = useContext(Context)
    

  return (
    <div>
        <main className="">
            <section className="">
              {auth ? (<>
              <CardMain>
                  <p className="m-h6">Welcome! {auth?.user?.email?.split(`@`)[0]}</p>
              </CardMain>
              </>) :  (<>
                <TabMain tabmainstatic={{tabmainid: `authfieldset`, tabmainindex: 0}} />
              </>)}
            </section>
        </main>
    </div>
  )
}
