import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center h-screen  bg-gradient-to-br from-orange-100 via-white to-orange-200">
        <div className="flex flex-col justify-center ">
          <div className="bg-white rounded-lg p-16 shadow-2xl">
            <div className="pb-4">
              <div className="text-6xl font-extrabold font-serif text-orange-950 ">
                BrokeBuddy
              </div>
              <div className="pl-16 italic ">
                Helping you stay broke... responsibly
              </div>
            </div>

            <div className="border-2 border-orange-100 m-2 rounded-md ">
              <div className="pl-8 pt-2 pb-2  ">
                Get Started-
              </div >
              <div className="mx-20 mb-2">
                <Button onClick={()=>
                  navigate("/signin")
                } label={"SignIn"} ></Button>
              </div>
              <div className="mx-20 mb-5">
                <Button onClick={()=>
                  navigate("/signup")
                } label={"SignUp"}></Button>
              </div> 
            </div>
          </div>
        </div>
      
    </div>
  );
}
