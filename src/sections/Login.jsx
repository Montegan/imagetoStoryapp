import React, { useState,useEffect } from "react";
import { auth,GoogleAuthenticate,FacebookAuthenticate } from "../configs/firebase";
import { createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, FacebookAuthProvider } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import google from "../assets/Google.png"
import { FaFacebook} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


const Login = ({loggedin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginstate, setLoginstate] =useState("");
  const [loading,setloading]= useState(true);

  const navigate= useNavigate();
  
  const handleGoogle=async()=>{
    try{
        await signInWithPopup(auth,GoogleAuthenticate);
        navigate("/Fullapp")
    }catch(errr){
        console.log(errr)
    }
  }

  const handleFacebook=async()=>{

  try {
    await signInWithPopup(auth,FacebookAuthenticate);
    navigate("/Fullapp")
  } catch (error) {
    console.log(error)
  }
  }

  const handleSingin= async()=>{
    try {
  await signInWithEmailAndPassword(auth,email,password);
  navigate("/Fullapp")
    }catch(errr){console.log(errr)}
  }

  useEffect(()=>{
   const unsubscribe = auth.onAuthStateChanged((user)=>{
            setLoginstate("logged in now")
            setloading(false)
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
  console.log(auth?.currentUser?.email)
  return (

    <>

   {!loading &&

   
    <div className="  bg-[#d9cdfc] flex w-full max-w-7xl h-[90vh]  items-center rounded-[40px]">
   <div className="flex   flex-col h-full justify-center items-center w-full  " >
    <div className="flex bg-[#ffffffe1] flex-col  mt-7 items-center w-full max-w-xl px-9 pt-14 pb-3 rounded-xl ">
      <h1 className="text-center mb-10 text-[2.3rem] font-serif font-semibold">Welcome Back</h1>
      <div className="w-full max-w-md  flex flex-col">
      <label className="text-[1.1rem] " htmlFor="email">Email</label>
      <input id="email"
        className=" w-full bg-[#d9cdfc85] focus:bg-[#ede7f9] p-3 text-[1.2rem] focus:outline-none rounded-md  "
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>
  
    <div className="w-full max-w-md mt-2 flex flex-col">
      <label className="text-[1.1rem] mt-4" htmlFor="pass">Password</label>
      <input
      id="pass"
      className=" w-full bg-[#d9cdfc85]  p-3 text-[1.2rem] focus:outline-none focus:bg-[#ede7f9] rounded-md "
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      <button className=" bg-[#5120f2bc] text-white hover:shadow-xl hover:shadow-[#5120f292] p-2 mt-10 w-40 text-[1.2rem] font-semibold rounded-lg " type="button" onClick={handleSingin} >LogIn</button>
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
    <p className="mt-1"> don't have an account <Link to={"/"} > <span className=" text-purple-600 text-lg font-semibold hover:underline ">Sinup</span> </Link> </p>
</div>

 <div className="h-[90vh] w-full max-w-7xl">
    <img src={"https://cdn.pixabay.com/photo/2023/05/07/06/56/ai-generated-7975784_1280.jpg"} className="h-full w-full object-cover rounded-r-[40px]" alt="" />
 </div>
</div>
}
</>
  );
};

export default Login;
