import React, { useEffect, useState } from "react";
import { auth,GoogleAuthenticate,FacebookAuthenticate } from "../configs/firebase";
import { createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import google from "../assets/Google.png"
import { useNavigate, Link } from "react-router-dom";
import { FaFacebook} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignIn = ({loggedin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginstate, setLoginstate] =useState("");
  const [loading,setloading]= useState(true);

  const navigate= useNavigate();
  const handlesingUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      user && navigate("/Fullapp")
    } catch (errr) {
      console.log(errr);
    }
  };


const handleGoogle=async()=>{
  try{
      await signInWithPopup(auth,GoogleAuthenticate);
      navigate("/Fullapp")
  }catch(errr){
      console.log(errr)
  }
}

const handleFacebook= async()=>{

  try {
    await signInWithPopup(auth,FacebookAuthenticate);
    navigate("/Fullapp")
  } catch (error) {
    console.log(error)
  }

}
// useEffect(()=>{
 
// },[])

useEffect(()=>{
  const unsubscribe = auth.onAuthStateChanged((user)=>{
           setLoginstate("logged in now")
           setloading(false)
           if(auth?.currentUser?.email !== undefined){
            navigate("/Fullapp")
           }
           console.log(auth?.currentUser?.email)
       })
return unsubscribe;
},[])

  // auth.onAuthStateChanged((user)=>{
  //   if (user){
  //     setLoginstate(true)
  //   }else{
  //     setLoginstate(false)
  //   }
  // })

  return (
    <>
  { !loading ?
    <div className="  bg-[#d9cdfc] flex w-full max-w-7xl h-[90vh]  items-center rounded-[40px]">
   <div className="flex  flex-col h-full mt-3 justify-center items-center w-full  " >
    <div className="flex bg-[#ffffffe1] flex-col items-center w-full max-w-xl px-9 pt-8 pb-2 rounded-xl ">
      <h1 className="text-center mb-5 text-[2.2rem] font-serif font-semibold">SignUp</h1>
      <div className="w-full flex flex-col max-w-md">
      <label className="text-[1.1rem] " htmlFor="name">Name</label>
      <input id="name"
        className=" w-full bg-[#d9cdfc85] focus:bg-[#ede7f9] p-2 text-[1.2rem] focus:outline-none rounded-md  "
        type="text"
        placeholder="Name"
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>

      <div className="w-full max-w-md mt-4 flex flex-col">
      <label className="text-[1.1rem] " htmlFor="email">Email</label>
      <input id="email"
        className=" w-full bg-[#d9cdfc85] focus:bg-[#ede7f9] p-2 text-[1.2rem] focus:outline-none rounded-md  "
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>
    <div className="w-full max-w-md mt-4 flex flex-col">
      <label className="text-[1.1rem] " htmlFor="pass">Password</label>
      <input
      id="pass"
      className=" w-full bg-[#d9cdfc85] p-2 text-[1.2rem] focus:outline-none focus:bg-[#ede7f9] rounded-md "
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      <button className=" bg-[#5120f2bc] text-white hover:shadow-xl hover:shadow-[#5120f292] p-2 mt-10 w-40 text-[1.2rem] font-semibold rounded-lg " type="button" onClick={handlesingUp} >LogIn</button>

      <div className=" mt-8 flex w-full items-center justify-center">
      <hr className="h-1 w-full "/>
      <p className=" text-[1.08rem] whitespace-nowrap p-2 ">or</p>
      <hr className="h-1 w-full"/>
      </div>

      <div className="flex gap-5 mb-2">
      <button className="mt-5 rounded-full p-0 hover:border-3 hover:border-green-300 " type="button" onClick={handleGoogle}> <FcGoogle size={43}  /> </button>
      <button className="mt-5 rounded-full p-0 hover:border-3 hover:border-green-300 " type="button" onClick={handleFacebook}> <FaFacebook size={39} color="blue" /> </button>
</div>
    </div>
    <p className="mt-0">you have an account? <Link to={"/Login"} > <span className=" text-purple-600 text-xl font-semibold hover:underline ">LogIn</span> </Link> </p>
    </div>

    <div className="h-[90vh] w-full max-w-7xl">
    <img src={"https://cdn.pixabay.com/photo/2023/05/07/06/56/ai-generated-7975784_1280.jpg"} className="h-full w-full object-cover rounded-r-[40px]" alt="" />
 </div>
</div>
    : <h1>Page Loading</h1>
  }
    </>

  );
};

export default SignIn;
