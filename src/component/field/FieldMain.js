import React, { useContext, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { motion } from 'framer-motion'

import {supabase} from '../../lib/supabase'
import { Context } from '../../context/Context'
import useApp from '../../hook/useApp'
import useSplit from '../../hook/useSplit'
import CardMain from '../../layout/card/CardMain'
import ChoiceMain from '../choice/ChoiceMain'
import { RiCheckboxBlankCircleFill, RiCheckboxBlankCircleLine, RiCheckboxCircleFill, RiDeleteBin7Fill, RiErrorWarningLine } from 'react-icons/ri'
import SheetMain from '../../layout/sheet/SheetMain'

export default function FieldMain({
    fieldmainstatic,
    fieldmainstyle,


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
    const [fieldmainstatetwo, setfieldmainstatetwo] = useState(true)

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
    const concat = appMainActionThree(refemailvalue).concat(appMainActionFour(refpasswordvalue))
    if(typeof concat !== 'undefined'){
        for(const data of concat){
            if(Object.keys(data).includes(`inform`)) return alert(`Not all fields were correctly added. Please re-check the custom fields.`)
        }
    }
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
                fieldmaindetail: 'Successfully create',
                fieldmainhref: `/coupon/couponstatus/${href || fieldmainid}`,
                fieldmainaction: `/coupon/couponindex/${href || fieldmainid}`,
                fieldmaindata: {
                    couponid: href || fieldmainid,
                    couponcost: refcouponcostvalue,
                    coupontitle: refcoupontitlevalue,

                    userid: user.id,
                },
                fieldmaindatatwo: {
                    couponid: href
                },
                fieldmaindatathree: appMainActionTwo(refcouponcostvalue).concat(appMainAction(refcoupontitlevalue))
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
    if(fieldmainstatic.fieldmainid === 'checkform') {
        return {
                fieldmainidtwo: 'check',
                // fieldmaindetail: 'Successfully donate',
                // fieldmainhref: `/chack/checkstatus/${href || fieldmainid}`,
                // fieldmainaction: `/chack/checkindex/${href || fieldmainid}`,
                fieldmaindata: {
                    checkid: fieldmainid,

                    couponid: href,
                },
                fieldmaindatatwo: {
                    checkid: undefined,
                }
            }
        }

    if(fieldmainstatic.fieldmainid === 'clickform') {
        return {
                fieldmainidtwo: 'click',
                // fieldmaindetail: 'Successfully donate',
                // fieldmainhref: `/chack/checkstatus/${href || fieldmainid}`,
                // fieldmainaction: `/chack/checkindex/${href || fieldmainid}`,
                fieldmaindata: {
                    clickid: fieldmainid,

                    userid:  user.id,
                },
                fieldmaindatatwo: {
                    checkid: undefined,
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
            if(typeof ref.fieldmaindatathree !== 'undefined' ){
                for(const data of ref.fieldmaindatathree){
                    if(Object.keys(data).includes(`inform`)) return alert(`Not all fields were correctly added. Please re-check the custom fields.`)
                }
            }
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
                },
            },
            {
                fieldmainid: 'checkform',
                fieldmainidtwo: 'check',
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

    const fieldMainDeleteTwo = async () => {
        const href = splitstaticthree || param.id || split[3]
        // const user = supabase.auth.user()
        const query = [ 
            {
                fieldmainid: 'couponform',
                fieldmainidtwo: 'claim',
                fieldmaindata: {

                  couponid: href, 
                },
            },
            {
                fieldmainid: 'couponform',
                fieldmainidtwo: 'check',
                fieldmaindata: {

                  couponid: href, 
                }
            },
            {
                fieldmainid: 'couponform',
                fieldmainidtwo: 'coupon',
                fieldmaindetail: 'Successfully deleted',
                fieldmainhref: `/coupon/couponstatus/${href || fieldmainid}`,
                fieldmainaction: `/coupon/couponindex/${href || fieldmainid}`,
                fieldmaindata: {

                  couponid: href, 
                },
            },
        ]
        const filter = query.filter(data => data.fieldmainid === fieldmainstatic.fieldmainid)
        // console.log('filter', filter)
        if(filter.length > 0){
            if(filter[0]){
                const { error } = await supabase.from(filter[0].fieldmainidtwo).delete().match(filter[0].fieldmaindata)
                // alert(error.message)
            }
            if(filter[1]){
                const { error } = await supabase.from(filter[1].fieldmainidtwo).delete().match(filter[1].fieldmaindata)
                // alert(error.message)
            }
            if(filter[2]){
                const { error } = await supabase.from(filter[2].fieldmainidtwo).delete().match(filter[2].fieldmaindata)
                // alert(error.message)
            }

            setfieldmainstate(!fieldmainstate)
            navigate(filter[2].fieldmainhref)

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
            fieldmaintitle: `Sign up`, 
            fieldmainaction: () => {
                return fieldMainSignup()
            },
            fieldmainentitle: `sign up`, 
            fieldmaindata: [
                {
                    fieldmainsubtitle: `Email`,
                    fieldmainrender: () => {
                        return <input onChange={() => setfieldmainstatetwo(!fieldmainstatetwo)} ref={refemail} type="email" className="l-input" placeholder="Your email address" />
                    },
                    fieldmainrendertwo: () => {
                        return appMainRender({
                            data: appMainActionThree(refemail?.current?.value)
                        })
                    },
                },
                {
                    fieldmainsubtitle: `Password`,
                    fieldmainrender: () => {
                        return <input onChange={() => setfieldmainstatetwo(!fieldmainstatetwo)} ref={refpassword} type="password" className="l-input" placeholder="Your password" />
                    },
                    fieldmainrendertwo: () => {
                        return appMainRender({
                            data: appMainActionFour(refpassword?.current?.value)
                        })
                    },
                },
            ]
        },
        {
            fieldmaintitle: `sign in`, 
            fieldmainaction: () => {
                return fieldMainSignin()
            },
            fieldmainentitle: `sign in`, 
            fieldmaindata: [
                {
                    fieldmainsubtitle: `Email`,
                    fieldmainrender: () => {
                        return <input ref={refemail} type="email" className="l-input" placeholder="Your email address" />
                    },
                    fieldmainrendertwo: () => {
                        return null
                    },
                },
                {
                    fieldmainsubtitle: `Password`,
                    fieldmainrender: () => {
                        return <input ref={refpassword} type="password" className="l-input" placeholder="Your password" />
                    },
                    fieldmainrendertwo: () => {
                        return null
                    },
                },
            ]
        },
        {
            fieldmaintitle: `Sign out`, 
            fieldmainaction: () => {
                return fieldMainSignout()
            },
            fieldmainentitle: `sign out`, 
            // fieldmaindata: 
        },
    ]

    const couponform = [
        {
            // fieldmaintitle: `dddd`, 
            fieldmainaction: () => {
                return fieldMainUpsert()
            },
            fieldmainentitle: `submit`, 
            fieldmaindata: [
                {
                    fieldmainsubtitle: `Donation cost`,
                    fieldmainrender: () => {
                        return <input onChange={() => {setfieldmainstatetwo(!fieldmainstatetwo)}} onClick={() => {fieldMainSelect(`couponcost`, refcouponcost)}} ref={refcouponcost} className="l-input" placeholder="eg. 90" />
                    },
                    fieldmainrendertwo: () => {
                        return appMainRender({
                            data: appMainActionTwo(refcouponcost?.current?.value)
                        })
                    },
                },

                {
                    fieldmainsubtitle: `Company name`,
                    fieldmainrender: () => {
                        return <input onChange={() => {setfieldmainstatetwo(!fieldmainstatetwo)}} onClick={() => {fieldMainSelect(`coupontitle`, refcoupontitle)}} ref={refcoupontitle} className="l-input" placeholder="eg. 2Degrees" />
                    },
                    fieldmainrendertwo: () => {
                        return appMainRender({
                            data: appMainAction(refcoupontitle?.current?.value)
                        })
                    },
                },
            ]
        },
        {
            // fieldmaintitle: `dddd`, 
            fieldmainaction: () => {
                return fieldMainDeleteTwo()
            },
            fieldmainentitle: `delete coupon`, 
        },
    ]

    const claimform = [
        {
            // fieldmaintitle: `dddd`, 
            fieldmainaction: () => {
                return fieldMainUpsert()
            },
            fieldmainentitle: `Mark as claimed`, 
        },
        {
            // fieldmaintitle: `dddd`, 
            fieldmainaction: () => {
                return fieldMainDelete()
            },
            fieldmainentitle: `Mark as un-claimed`, 
        },
    ]

    const checkform = [
        {
            // fieldmaintitle: `dddd`, 
            fieldmainaction: () => {
                return fieldMainUpsert()
            },
            fieldmainentitle: `Mark as donated`, 
        },
        {
            // fieldmaintitle: `dddd`, 
            fieldmainaction: () => {
                return fieldMainDelete()
            },
            fieldmainentitle: `Mark as un-donated`, 
        },
    ]

    const archiveform = [
        {
            // fieldmaintitle: `dddd`, 
            fieldmainaction: () => {
                return fieldMainUpsert()
            },
            fieldmainentitle: `Create archive`, 
        },
        {
            // fieldmaintitle: `dddd`, 
            fieldmainaction: () => {
                return fieldMainDelete()
            },
            fieldmainentitle: `Delete archive`, 
        },
    ]

    const clickform = [
        {
            // fieldmaintitle: `dddd`, 
            fieldmainaction: () => {
                return fieldMainUpsert()
            },
            fieldmainentitle: `Mark all as read`, 
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
            fieldmainid: `checkform`,
            fieldmainindex: checkform,
        },
        {
            fieldmainid: `archiveform`,
            fieldmainindex: archiveform,
        },
                {
            fieldmainid: `clickform`,
            fieldmainindex: clickform,
        },
    ]

    const [appstatic, setappstatic] = useApp(fieldmain, fieldmainstatic.fieldmainid, fieldmainstatic.fieldmainindex, splitstaticthree
        ,fieldmainstatetwo)

  return (
    <div>
        <main className="">
                {appstatic?.map((data, index) => (<>
            <motion.section key={index}  initial={{opacity: 0}} animate={{opacity: 1}}  className="duration-100">

                    {data?.fieldmaintitle && 
                     <CardMain>
                    <h1 className="first-letter:uppercase m-h6">{data?.fieldmaintitle}</h1>
                    </CardMain>
                    }

                    {data.fieldmaindata?.map((dat, inde) => (<>
                    <CardMain key={inde}>
                    <p className="l-h5">{dat?.fieldmainsubtitle}</p>
                    <br />
                    {dat?.fieldmainrender()}
                    {dat?.fieldmainrendertwo?.()}
                    </CardMain>
                    </>))}

                    <CardMain>
                        <button onClick={() => {
                            data?.fieldmainaction()
                        }} className={`w-full  m-button ${fieldmainstyle?.button}`}>{data?.fieldmainentitle}</button>
                    </CardMain>

            </motion.section>
                </>))}
        </main>
    </div>
  )
}

export function appMainRender({data}) {
    if(!Array.isArray(data)) return null
  return (
    <div>
        <section className="">
            <br />
            <SheetMain>
                {/* <div className="grid grid-cols-2"> */}
            {data?.map((data, index) => (<>
            <motion.article key={index} initial={{opacity: 0}} animate={{opacity: 1}} className={`flex flex-row items-center  duration-100 l-h5 ${color(data)}`}>
                <CardMain>
                <p>{data?.inform && <RiCheckboxBlankCircleLine />}</p>
                <p>{data?.success && <RiCheckboxCircleFill />}</p>
                </CardMain>
                <p>{data?.inform && data?.inform}</p>
                <p>{data?.success && data?.success}</p>
            </motion.article>
            </>))}
                {/* </div> */}
            </SheetMain>
        </section>
    </div>
  )
}

export function color(first) {
    if(Object.keys(first).includes('inform')) {return `text-slate-300`}
    if(Object.keys(first).includes('success')) {return `text-emerald-300`}

}


    export function appMainAction(first) {
        if(typeof first === 'undefined' || first === '') return null
        const array = [
            {
                inform: `Requires this field`,
                condition: () => {
                    if(first !== '') return true
                    return false
                }
            },
            {
                inform: `Must be between 5 - 20 characters`,
                condition: () => {
                    if(first.length >= 5 && first.length <= 20) return true
                    return false
                }
            }
        ]

        array.forEach(data => {
            if(data.condition() === true) {
                delete Object.assign(data, {[`success`]: data[`inform`] })[`inform`];
            } 
        })
        return array
    }

    export function appMainActionTwo(first) {
        if(typeof first === 'undefined' || first === '') return null
        const array = [
            {
                inform: `Requires a number type`,
                condition: () => {
                    if(/^\d*$/.test(first)) return true
                    return false
                }
            },
            {
                inform: `Must be between 1 - 10 characters`,
                condition: () => {
                    if(first.length <= 10) return true
                    return false
                }
            }
        ]

        array.forEach(data => {
            if(data.condition() === true) {
                delete Object.assign(data, {[`success`]: data[`inform`] })[`inform`];
            } 
        })
        return array
    }

    export function appMainActionThree(first) {
        if(typeof first === 'undefined' || first === '') return null
        const array = [
            {
                inform: `Email is available`,
                condition: () => {
                    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(first)) return true
                    return false
                }
            },
            {
                inform: `Must be between 5 - 20 characters`,
                condition: () => {
                    if(first.length >= 5 && first.length <= 20) return true
                    return false
                }
            },
        ]

        array.forEach(data => {
            if(data.condition() === true) {
                delete Object.assign(data, {[`success`]: data[`inform`] })[`inform`];
            } 
        })
        return array
    }

    export function appMainActionFour(first) {
        if(typeof first === 'undefined' || first === '') return null
        const array = [
            {
                inform: `Capital letter`,
                condition: () => {
                    if(new RegExp("[A-Z]").test(first)) return true
                    return false
                }
            },
            {
                inform: `Lowercase letter`,
                condition: () => {
                    if(new RegExp("[a-z]").test(first)) return true
                    return false
                }
            },
             {
                inform: `Number`,
                condition: () => {
                    if(new RegExp("[0-9]").test(first)) return true
                    return false
                }
            },
              {
                inform: `Special charector`,
                condition: () => {
                    if(new RegExp("[$@$!%*#?&]").test(first)) return true
                    return false
                }
            },
        ]

        array.forEach(data => {
            if(data.condition() === true) {
                delete Object.assign(data, {[`success`]: data[`inform`] })[`inform`];
            } 
        })
        return array
    }
