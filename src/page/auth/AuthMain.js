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
                  <p className="m-h6">Welcome! <span className="uppercase"> {auth?.user?.email?.split(`@`)[0]}</span></p>
              </CardMain>
              </>) :  (<>
                <TabMain tabmainstatic={{tabmainid: `authfieldset`, tabmainindex: 0}} />
              </>)}
            </section>
        </main>
    </div>
  )
}
