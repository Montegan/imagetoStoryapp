import { useEffect, useState } from "react";
import "./App.css";
import Fullapp from "./sections/Fullapp";
import SignIn from "./sections/SignIn";
import { auth } from "./configs/firebase";
import { Route,Routes} from "react-router-dom";
import Login from "./sections/Login";
function App() {
const[loggedin,setLoggedin]=useState(false)
auth.onAuthStateChanged((user) => user? setLoggedin(true):setLoggedin(false) );

  return (
    <main className=" bg-[#edf9ff] w-full h-screen flex flex-col items-center justify-center">
  <Routes>
    <Route path="/" element={<SignIn loggedin={loggedin}/>}/>
    <Route path="/Fullapp" element={<Fullapp/>}/>
    <Route path="/Login" element={<Login/>}/>
  </Routes>
    </main>
  );
}

export default App;


{/* {
     loggedin ? (
      <>
        <ImageUploader />
        <Fullapp></Fullapp>
      </>
    ) : (
      <SignIn />
    )
  } */}
