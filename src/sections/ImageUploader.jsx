import React, { useEffect, useRef, useState } from "react";
import { storage } from "../configs/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { IoMdCloudUpload } from "react-icons/io";



const ImageUploader = ({setMicstate,setimgurls,imgUrls,setRemoveclikced}) => {
  const [image, setImage] = useState();
  const [uploderState, setUploaderState]= useState("");
  
  const imgFoderRef = ref(storage, "Rawimages/");

  const selectImage = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files);
  };

  const removeImage = (e) =>{
    if(fileinput.current){
      fileinput.current.value= null;
      setImage(null)
      setimgurls("")
      setUploaderState("")
      setRemoveclikced(true)
    }
    console.log(e.target.files)
  }

  const uploadImage = () => {
    if (image === null) alert("please select an image first") ;
    else{
      setUploaderState("disabled")
    const imageRef = ref(storage, `Rawimages/${image.name + v4()}`);
    uploadBytes(imageRef, image)
      .then((snapshots) => {
        getDownloadURL(snapshots.ref).then((url) =>
        setimgurls(url)
        );
        setMicstate(true)
      })
      .catch((error) => alert(error));}

  };

  const fileinput= useRef(null);

  console.log(imgUrls);
  // Code to load images when the page loads
  // useEffect(() => {
  //   listAll(imgFoderRef).then((response) =>
  //     response.items.forEach((item) =>
  //       getDownloadURL(item).then((url) => setimgurls((urls) => [...urls, url]))
  //     )
  //   );
  // }, []);
  return (
    <div className="  text-[#000000] h-full flex flex-col items-center justify-start">
      
      
      <div className=" flex flex-col items-center justify-start pt-5">
      <label htmlFor="Uploader" className="border-4  border-[#5120f2bc] border-dashed h-64 whitespace-nowrap flex flex-col items-center justify-center w-[25vw] p-8">
       {imgUrls ? <img
            src={imgUrls}
            className="w-full"
            style={{ objectFit:"fill", marginTop:"20px", display:imgUrls==="" ? "none": "block"  }}
            alt="hello"
          /> : <IoMdCloudUpload size={100} color="#5120f2bc"/>}
       {image? image.name: "select images to start"}
       </label>
      <input  id="Uploader" type="file" ref={fileinput} className="hidden" name="image" onChange={selectImage} />
      <div className="flex  gap-8 w-full px-3 justify-center">
      <button type="button" disabled= {uploderState === "disabled" ? "disabled" : ""} className= {image ? (uploderState === "disabled"? "bg-[#26106e6f]  w-full max-w-44 h-12 mt-9 rounded-lg":"bg-[#5120f2bc] hover:bg-[#5120f2] w-full max-w-44 h-12 mt-9 rounded-lg")  : "hidden"} onClick={uploadImage}>
        Upload
      </button>

      <button type="button"  className= {image ? "bg-[#f7e5e5] hover:bg-[tomato]  w-full max-w-44 h-12 mt-9 rounded-lg" : "hidden"} onClick={removeImage}>
        Remove
      </button>
      </div>
      </div>
    </div>
  );
};

export default ImageUploader;
