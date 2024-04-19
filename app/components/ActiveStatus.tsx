'use client'
import React,{useEffect} from 'react'
import useActiveChannel from '../hooks/useActiveChannel';

function ActiveStatus() {
    useActiveChannel()
    return null
}

export default ActiveStatus