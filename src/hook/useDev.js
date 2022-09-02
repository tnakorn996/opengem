import { useContext, useEffect, useState } from 'react'

import useSplit from './useSplit'
import { Context } from '../context/Context'
// import { useLocation } from 'react-router-dom'

export default function useDev({
    devstaticdata,
    devstaticaction,

}) {
    const {
        setappstate, appstate, 
        // ttamainstate,

    } = useContext(Context)
    const [splitstatic, setsplitstatic] = useSplit(1)
    const [splitstatictwo, setsplitstatictwo] = useSplit(2)

    const [devstatic, setdevstatic] = useState()

    useEffect(() => {
        const devAction = async () =>{
            if(typeof splitstatic === 'undefined' 
            || typeof splitstatictwo === 'undefined'
            || typeof devstaticdata === 'undefined') return null
            // console.log('devstaticdatas, devstaticaction', devstaticdata, devstaticaction)
            const filter = devstaticdata.filter((data) => data.contextrender().bool === true)
            // console.log('filter', filter)
            
            if(filter.length > 0  && splitstatictwo && splitstatictwo.includes(`main`)) {
                setTimeout(() => {
                    window.history.replaceState(null, "" , filter[0].contexthref)
                    setappstate(devstaticaction)
                    console.log('appstate', appstate)
                }, 1000);
            }
        }
        devAction()
    }, [splitstatic])

    // function devAction(first) {
        
    // }

  return [devstatic, setdevstatic]
}