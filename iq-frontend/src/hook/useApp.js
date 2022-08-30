import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

export default function useApp(appmain, appmainid, appmainindex, appmainstatic, appmainstatictwo, appmainstaticthree, appmainstaticfour) {
    const [appstatic, setappstatic] = useState()

    useEffect(() => {
      if(typeof appmain === 'undefined' 
        && typeof appmainid === 'undefined'
        && typeof appmainindex === 'undefined' ) return null
        // console.log('appmain, appmainid, appmainindex', appmain, appmainid, appmainindex)
        const filter = appmain.filter(data => Object.values(data)[0] === appmainid)
        if(filter.length > 0 && appmainindex !== null){
          // const filtertwo = Object.values(filter[0])[1].filter(data => Object.values(data)[0] === appmainindex)
          const ref = Object.values(filter[0])[1]
          const filtertwo = ref.filter(data => ref.indexOf(data) === appmainindex)
          setappstatic(filtertwo)
        }
        if(filter.length > 0 && appmainindex === null){
          const filtertwo = Object.values(filter[0])[1]
          setappstatic(filtertwo)
        }
    }, [appmainstatic, appmainstatictwo, appmainstaticthree, appmainstaticfour, appmainid, appmainindex])

  return [appstatic, setappstatic]
    
}