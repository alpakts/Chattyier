'use client';
import React, { useEffect, useRef } from 'react'
import { IMessage, useMessage } from './messages';

const InitMessages = ({messages}:{messages:IMessage[]}) => {
    const init = useRef(false);
    useEffect(() => {
        if(!init.current){
            useMessage.setState({messages});
        }
        init.current = true;
    },[])
  return <></>
}

export default InitMessages