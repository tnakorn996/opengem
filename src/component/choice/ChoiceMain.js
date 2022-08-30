import React, { useState } from 'react'
import { claimul, contributeul } from '../../content/content'
import useApp from '../../hook/useApp'

export default function ChoiceMain({

    choicemainref,
    choicemainstatic,

}) {
    const [choicemainid, setchoicemainid] = useState(null)

    const claimtextarea = [
        {
            choicemainrender: () => { 
                return claimul
            }
        }
    ]

    const contributetextarea = [
        {
            choicemainrender: () => { 
                return contributeul
            }
        }
    ]

    const choicemain = [
        {
            choicemainid: `claimtextarea`,
            choicemainref: claimtextarea,
        },
        {
            choicemainid: `contributetextarea`,
            choicemainref: contributetextarea,
        },
    ]

    const [appstatic, setappstatic] = useApp(choicemain, choicemainstatic.choicemainid, choicemainstatic.choicemainindex)

  return (
    <div>
        <main className="">
                {appstatic?.map((data, index) => (<>
                <div key={index} className="">
                <section className="">
                    <input ref={choicemainref} value={choicemainid} hidden className="" />
                </section>
                <section className="flex flex-row gap-2">
                    {data?.choicemainrender()?.map((dat, inde) => (<>
                    <button key={inde} onClick={() => { 
                        setchoicemainid(dat.contentid )
                    }} className="w-full  l-button">{dat.contenttitle}</button>
                    </>))}
                </section>
                </div>
                </>))}
        </main>
    </div>
  )
}

// export function appTextareaRender({data, action}) {
//   return (
//     <div>
//         <section className="">
//             {data?.map(data => (<>
//             <button onClick={() => {
//                 action(data.contenttitle)
//             }} className="">{data?.contenttitle}</button>
//             </>))}
//         </section>
//     </div>
//   )
// }
