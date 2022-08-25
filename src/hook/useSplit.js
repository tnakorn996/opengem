import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function useSlice(splitslice) {
    const [splitstatic, setsplitstatic] = useState()
    const location = useLocation()
    
    useEffect(() => {
        const split =  new URL(window.location).pathname.split('/') || location.pathname.split('/');
        setsplitstatic(split[splitslice])
    }, [location.pathname, window.location])

  return [splitstatic, setsplitstatic]
}