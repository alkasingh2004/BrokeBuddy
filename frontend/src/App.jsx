import "./index.css";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signin } from "./pages/Signin";
import { Signup } from './pages/Signup';
import { Dashboard } from "./pages/Dashboard";
import {SendMoney} from "./pages/SendMoney";
import { Home } from "./pages/Home";

export function App() {  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/send" element={<SendMoney/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
