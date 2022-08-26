import React, { useContext, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import {supabase} from '../../lib/supabase'
import { Context } from '../../context/Context'
import useApp from '../../hook/useApp'
import useSplit from '../../hook/useSplit'
import CardMain from '../../layout/card/CardMain'
import ChoiceMain from '../choice/ChoiceMain'

export default function FieldMain({
    fieldmainstatic,


}) {
    const {
        auth, setauth,

        fieldmainstate, setfieldmainstate,

    } = useContext(Context)
    const navigate = useNavigate()
    const split = useLocation().pathname.split('/')
    const param = useParams()
    const [splitstaticthree, setsplitstaticthree] = useSplit(3)
    const [fieldmainid, setfieldmainid] = useState(uuidv4)

    const refemail = useRef(null)
    const refpassword = useRef(null)
    const refcouponcost = useRef(null)
    const refcoupontitle = useRef(null)

//   function fieldMainAction(first, second) {
//     for(const data of first) {
//       if(data.breadid === splitstaticthree || data.breadid === split[3]){
//         // console.log('datdddddddda', data[second])
//         return data[second]
//       }
//     }
//   }

//   function fieldMainActionTwo(first) {
//       // console.log('first', first)

//       if(!first.fieldmaindetail) return null
//           setappstate({
//               appid: 'backdropmain',
//               appidtwo: 'previewmain',
//               appidthree: 'apparticle',
//               appindex: 1,
//             })
//             setsignmainstate({
//               signmainid: 'appimg',
//               signmainindex: 0,
//               signmaindetail: first.fieldmaindetail,
//               signmainaction: first.fieldmainaction,
//             })

//       // setfieldmainstate(!fieldmainstate)
//       //   if(!first.fieldmainhref) return null
//       //     navigate(first.fieldmainhref + split[3])
//     }

  const fieldMainSignup = async () => {
    const refemailvalue = refemail?.current?.value
    const refpasswordvalue = refpassword?.current?.value
    const { error } = await supabase.auth.signUp({
        email: refemailvalue, 
        password: refpasswordvalue,
    })
    alert(`Successfully sent email to ${refemailvalue}`)
    setfieldmainstate(!fieldmainstate)
    // alert(error.message)
      // setfieldmainbool(!fieldmainbool)
  }

  const fieldMainSignin = async () => {
    const refemailvalue = refemail?.current?.value
    const refpasswordvalue = refpassword?.current?.value
    const { data, error } = await supabase.auth.signIn({
          email: refemailvalue, 
          password: refpasswordvalue,
    })
    //   alert(error.message)
      if(data) {
          alert('Successfully sign you in')
          const user = supabase.auth.user()
          const query = {
              userid: user.id,
              useremail: user.email,
              username: user.email.split(`@`)[0],
          }
          const { error } = await supabase.from('user').upsert(query, {returning: 'minimal'})
        //   alert(error.message)
            //   navigate(`/workout/workoutmain`)
            // setfieldmainbool(!fieldmainbool)
            setfieldmainstate(!fieldmainstate)
            navigate(`/coupon/couponmain`)
      }
  }

  const fieldMainSignout = async () => {
          const { error } = await supabase.auth.signOut(auth.access_token)
        //   alert(error.message)
        navigate(`/auth/authmain`)
          alert('Signed out successfully')
          setauth()
            setfieldmainstate(!fieldmainstate)
            // setfieldmainbool(!fieldmainbool)
  }

  //////////////////////////////////////

  const fieldMainSelect = async (first, second) => {
    // console.log('first, second', first, second)
    // const user = supabase.auth.user()
    const query = [       
            {
                fieldmainid: 'couponform',
                fieldmainidtwo: 'coupon',
                fieldmaindata: ['couponid', splitstaticthree || param.id],
            },     
        ]
        const filter = query.filter(data => data.fieldmainid === fieldmainstatic.fieldmainid)
        const ref = Object.assign(...filter)
        // console.log('ref', ref)

        const { data, error} = await supabase.from(ref.fieldmainidtwo).select(first).eq(
            ref.fieldmaindata[0], ref.fieldmaindata[1], ref.fieldmaindata[2], ref.fieldmaindata[3]
            )
            // console.log('typeof(data', data && data)
        if(!Array.isArray(data)) return null
        const assign = Object.assign(...data)[first]
        // console.log('assign', assign)
        if(typeof assign === 'undefined') return null
        return second.current.value = assign
          
          // return `handleselect${ref.fieldmainid}`
  }

  function fieldMainQuery() {
    const user = supabase.auth.user()
    const href = splitstaticthree || param.id
    const refcouponcostvalue = refcouponcost?.current?.value
    const refcoupontitlevalue = refcoupontitle?.current?.value
    if(fieldmainstatic.fieldmainid === 'couponform') {
        return {
                fieldmainidtwo: 'coupon',
                fieldmaindetail: 'Successfully create coupon',
                fieldmainhref: `/coupon/couponstatus/${href || fieldmainid}`,
                fieldmainaction: `/coupon/couponindex/${href || fieldmainid}`,
                fieldmaindata: {
                    couponid: href || fieldmainid,
                    couponcost: refcouponcostvalue,

                    userid: user.id,
                    coupontitle: refcoupontitlevalue,
                },
                fieldmaindatatwo: {
                    couponid: href
                }
            }
    }
    if(fieldmainstatic.fieldmainid === 'claimform') {
        return {
                fieldmainidtwo: 'claim',
                fieldmaindetail: 'Successfully claim',
                fieldmainhref: `/claim/claimstatus/${href || fieldmainid}`,
                fieldmainaction: `/claim/claimindex/${href || fieldmainid}`,
                fieldmaindata: {
                    claimid: fieldmainid,

                    couponid: href,
                },
                fieldmaindatatwo: {
                    couponid: undefined,
                }
            }
        }
    }
            // <DtaMain dtamaindata={{dtamainhref: `/claim/claimindex/${data?.couponid}`}} dtamainstatic={{dtamainid: `claimdframe`, dtamainindex: 1}} >

  const fieldMainUpsert = async () => {
        const ref = fieldMainQuery()
        if(typeof ref === 'undefined') return null
        // console.log('ref', ref)
        try {
            if(typeof Object.values(ref.fieldmaindatatwo)[0] === 'undefined'){
                const { error } = await supabase.from(ref.fieldmainidtwo).upsert(ref.fieldmaindata, {returning: 'minimal'})
                // alert(error.message)
            }
            if(typeof Object.values(ref.fieldmaindatatwo)[0] !== 'undefined'){
                const { error } = await supabase.from(ref.fieldmainidtwo).update(ref.fieldmaindata).match(ref.fieldmaindatatwo)
                // alert(error.message)
            } 
            setfieldmainstate(!fieldmainstate)
            navigate(ref.fieldmainhref)
            // setfieldmainbool(!fieldmainbool)
            //   fieldMainActionTwo(ref)
        } catch (error) {
            setfieldmainstate(!fieldmainstate)
            // alert(error.message)
            // setfieldmainbool(!fieldmainbool)
            // fieldMainActionTwo(error)
        }
    }

    const fieldMainDelete = async () => {
        const href = splitstaticthree || param.id || split[3]
        // const user = supabase.auth.user()
        const query = [
            {
                fieldmainid: 'claimform',
                fieldmainidtwo: 'claim',
                // fieldmaindetail: 'Successfully unfollow this person',
                // fieldmainaction: null,
                fieldmaindata: {

                  couponid: href, 
                }
            },
        ]
        const filter = query.filter(data => data.fieldmainid === fieldmainstatic.fieldmainid)
        const ref = Object.assign(...filter)
        // console.log('ref', ref)
        if(filter && Object.values(ref.fieldmaindata)[0] !== undefined){
                const { error } = await supabase.from(ref.fieldmainidtwo).delete().match(ref.fieldmaindata)
                // alert(error.message)

                setfieldmainstate(!fieldmainstate)
                // setfieldmainbool(!fieldmainbool)
                // fieldMainActionTwo(ref)
        }
    }

    // const fieldMainSearch = async () => {
    //   const refsixvalue = refsix.current.value;
    //     const user = supabase.auth.user()
    //     const query = [
    //         {
    //             fieldmainid: 'searchinput',
    //             fieldmainidtwo: 'user',
    //             // fieldmaindetail: 'Successfully unfollow this person',
    //             // fieldmainaction: null,
    //             fieldmaindatatwo: {
    //               select: undefined,
    //             }
    //         },
    //     ]
    //     const filter = query.filter(data => data.fieldmainid === fieldmainstatic.fieldmainid)
    //     const ref = Object.assign(...filter)
    //     // console.log('ref', ref)
    //     if(user && ref){
    //             const { data, error } = await supabase.from(ref.fieldmainidtwo).select(`*`).textSearch(`username`, refsixvalue, { config: 'english' })
    //             // alert(error.message)
    //             setsearch(data)

    //             // setfieldmainbool(!fieldmainbool)
    //             setfieldmainstate(!fieldmainstate)
    //             fieldMainActionTwo(ref)
    //     }
    // }

    //////////////////////////////////////

    const authform = [
        {
            fieldmaintitle: `up`, 
            fieldmainaction: fieldMainSignup,
            fieldmainentitle: `sign up`, 
            fieldmaindata: [
                {
                    fieldmainsubtitle: `Email`,
                    fieldmainrender: <input ref={refemail} type="email" className="l-input" placeholder="nn" />
                },
                {
                    fieldmainsubtitle: `Password`,
                    fieldmainrender: <input ref={refpassword} type="password" className="l-input" placeholder="nn" />
                },
            ]
        },
        {
            fieldmaintitle: `in`, 
            fieldmainaction: fieldMainSignin,
            fieldmainentitle: `sign in`, 
            fieldmaindata: [
                {
                    fieldmainsubtitle: `Email`,
                    fieldmainrender: <input ref={refemail} type="email" className="l-input" placeholder="nn" />
                },
                {
                    fieldmainsubtitle: `Password`,
                    fieldmainrender: <input ref={refpassword} type="password" className="l-input" placeholder="nn" />
                },
            ]
        },
        {
            fieldmaintitle: `out`, 
            fieldmainaction: fieldMainSignout,
            fieldmainentitle: `sign out`, 
            // fieldmaindata: 
        },
    ]

    const couponform = [
        {
            // fieldmaintitle: `dddd`, 
            fieldmainaction: fieldMainUpsert,
            fieldmainentitle: `upsert`, 
            fieldmaindata: [
                {
                    fieldmainsubtitle: `Cost`,
                    fieldmainrender: <input onClick={() => {fieldMainSelect(`couponcost`, refcouponcost)}} ref={refcouponcost} className="l-input" type={"number"} placeholder="nn" />
                },

                {
                    fieldmainsubtitle: `Company name`,
                    fieldmainrender: <input onClick={() => {fieldMainSelect(`coupontitle`, refcoupontitle)}} ref={refcoupontitle} className="l-input" placeholder="nn" />
                },
                // {
                //     fieldmainsubtitle: `Claim id`,
                //     fieldmainrender: <ChoiceMain choicemainref={refclaim} choicemainstatic={{choicemainid: `claimtextarea`, choicemainindex: 0}} /> 
                // },
                // {
                //     fieldmainsubtitle: `Contribute id`,
                //     fieldmainrender: <ChoiceMain choicemainref={refcontribute} choicemainstatic={{choicemainid: `contributetextarea`, choicemainindex: 0}} /> 
                // },
            ]
        }
    ]

    const claimform = [
        {
            // fieldmaintitle: `dddd`, 
            fieldmainaction: fieldMainUpsert,
            fieldmainentitle: `Create claim`, 
        },
        {
            // fieldmaintitle: `dddd`, 
            fieldmainaction: fieldMainDelete,
            fieldmainentitle: `Delete claim`, 
        },
    ]

    const archiveform = [
        {
            // fieldmaintitle: `dddd`, 
            fieldmainaction: fieldMainUpsert,
            fieldmainentitle: `Create archive`, 
        },
        {
            // fieldmaintitle: `dddd`, 
            fieldmainaction: fieldMainDelete,
            fieldmainentitle: `Delete archive`, 
        },
    ]


    const fieldmain = [
        {
            fieldmainid: `authform`,
            fieldmainindex: authform,
        },
        {
            fieldmainid: `couponform`,
            fieldmainindex: couponform,
        },
        {
            fieldmainid: `claimform`,
            fieldmainindex: claimform,
        },
        {
            fieldmainid: `archiveform`,
            fieldmainindex: archiveform,
        },
    ]

    const [appstatic, setappstatic] = useApp(fieldmain, fieldmainstatic.fieldmainid, fieldmainstatic.fieldmainindex, splitstaticthree)

  return (
    <div>
        <main className="">
            <section className="">
                {appstatic?.map(data => (<>
                    <CardMain>
                    <h1 className="">{data?.fieldmaintitle}</h1>
                    </CardMain>
                    {data.fieldmaindata?.map(dat => (<>
                    <CardMain>
                    {dat?.fieldmainsubtitle}
                    {dat?.fieldmainrender}
                    </CardMain>
                    </>))}
                    <CardMain>
                        <button onClick={() => {
                            data?.fieldmainaction()
                        }} className="w-full  l-button">{data?.fieldmainentitle}</button>
                    </CardMain>
                </>))}
            </section>
        </main>
    </div>
  )
}
