import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
  const navigate=useNavigate();
    const [username,setUsername] = useState("");    
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [password,setPassword] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={(ev)=>{
          setFirstname(ev.target.value);
        }} placeholder="e.g- John" label={"First Name"} />
        <InputBox onChange={(ev)=>{
          setLastname(ev.target.value);
        }} placeholder="e.g- Doe" label={"Last Name"} />
        <InputBox onChange={(ev)=>{
          setUsername(ev.target.value);
        }} placeholder="e.g- example@123" label={"Email"} />
        <InputBox onChange={(ev)=>{
          setPassword(ev.target.value);
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={()=>{
            axios.post("http://localhost:3000/api/v1/user/signup",{
                firstname,
                lastname,
                username,
                password
            })
            navigate("/signin");
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}