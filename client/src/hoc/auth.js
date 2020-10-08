import Axios from 'axios';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { auth } from '../_actions/user_action';

export default function(SpecificComponent,option,adminRoute = null) {
    //app.js에서 받는 매개변수의 option에는 null,true,false가 있음
    //null -> 아무나 출입이 가능한 페이지
    //true -> 로그인한 유저만 출입이 가능한 페이지
    //false -> 로그인한 유저는 출입 불가능한 페이지
    // adminRoute는 관리자관련

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        //백엔드에 request
        useEffect(() => {
       
            dispatch(auth())
            .then(response => {
                
                console.log(response)
                //로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        //option이 true인 유저를 막는작업
                        props.history.push('/login')
                    }
                }else {
                        //로그인한 상태
                        if(adminRoute && !response.payload.isAdmin) {
                            props.history.push('/')
                        }else {
                            if(option===false) {
                                props.history.push('/')
                            }
                        }
                }
            })

            Axios.get('/api/users/auth')
        }, [])
        return (
            <SpecificComponent/>
        )
    }

    return AuthenticationCheck
}