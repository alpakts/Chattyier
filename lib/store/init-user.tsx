'use client';
import { User } from '@supabase/supabase-js'
import React, { useEffect, useRef } from 'react'
import { useUser } from './user'

const InitUser = ({user}:{user:User|undefined}) => {
    const init = useRef(false);
    useEffect(() => {
        if(!init.current){
            useUser.setState({user});
        }
        init.current = true;
        //eslint-disable-next-line
    },[])
  return <></>
}

export default InitUser