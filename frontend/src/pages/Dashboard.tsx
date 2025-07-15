import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard=()=>{
    const [balance,setBalance]=useState(0);

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                Authorization: "Bearer "+ localStorage.getItem("Authorization")
            }
        }).then(response=>{
            setBalance(response.data.balance)
        });
    },[])

    return <div className="p-4">
        <div className="">
         <Appbar/>
         <Balance value={balance}/>
         <Users/>
        </div>
    </div>
}