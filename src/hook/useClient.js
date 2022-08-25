import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { supabase } from '../lib/supabase'
import useSplit from '../hook/useSplit'
import { Context } from '../context/Context'

export default function useClientTwo(clientmaindata, clientmainstatic, clientmainstatictwo, clientmainstaticthree) {
  const {
    fieldmainstate,

  } = useContext(Context)
    const [clientstatic, setclientstatic] = useState()
    const [splitstaticthree, setsplitstaticthree] = useSplit(3)

    useEffect(() => {
        if(typeof clientmaindata === 'undefined' 
        || typeof splitstaticthree === 'undefined') return 
        clientAction(clientmaindata)
    }, [ splitstaticthree, fieldmainstate])

    const clientAction = async (first) => {
        if(typeof first === 'undefined') return null
          const { data, error} = await supabase.from(first.from).select(first.select)
          .order(first.order[0], first.order[1])
          .eq(first.eq[0], first.eq[1], first.eq[2] && first.eq[2], first.eq[3] && first.eq[3])
          .limit(first.limit)
          if(data) {
            console.log('data....', data)
            return setclientstatic(data)
          } else {
            alert(error.message)
          }
    }

  return [clientstatic, setclientstatic]
    
}
