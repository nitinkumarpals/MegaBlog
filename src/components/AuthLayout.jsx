import { useSelector } from "react-redux";
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

export default function Protected({children, authentication = true}){
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);
    
    useEffect(() => {
        if(authentication && authStatus !== authentication){
            //true && false != true
            //true && true
            navigate("/login");
        }else if(!authentication && authStatus !== authentication){
            //false && true != true
            //false && true != true 
            //false && false
            navigate("/");
        }
        setLoader(false);
        
    },[authStatus,authentication, navigate]);
    return loader ? <h1>Loading...</h1> : <>{children}</>
}

