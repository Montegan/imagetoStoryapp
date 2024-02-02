import React, { useEffect, useState } from "react";
import { storyteller } from "../AiModel/langchainLLm";
import { auth } from "../configs/firebase";
import { signOut } from "firebase/auth";
import ImageUploader from "./ImageUploader";
import { useNavigate } from "react-router-dom";
import { FaMicrophoneLines } from "react-icons/fa6";
import logo2 from "../assets/logo2.png"

const Fullapp = () => {
  const [story, setStory] = useState(null);
  const [StoryTest, setStoryText] = useState("");
  const navigate = useNavigate();
  const [loginstate, setLoginstate] = useState("");
  const [loading, setloading] = useState(true);
  const [micState, setMicstate] = useState(false);
  const [imgUrls, setimgurls] = useState("");
  const [removeClicked,setRemoveclikced]= useState(false);

  const pressed = async () => {
    console.log("pressed not disabled" + imgUrls);
    const storyFormats = await storyteller(imgUrls);
    setRemoveclikced(false)
    setStory(storyFormats.audio);
    setStoryText(storyFormats.TextStory);

  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoginstate("logged in now");
      setloading(false);
      if (auth?.currentUser?.email == undefined) {
        navigate("/Login");
      }
    });
    return unsubscribe;
  }, []);

  const handleSingout = async () => {
    try {
      await signOut(auth);
      navigate("/Login");
    } catch (errr) {
      console.log(errr);
    }
  };
  return (
    <>
      {!loading && (
        <section className="flex flex-col  h-full w-full items-center p-7">
          <div className="flex justify-between items-end w-full max-w-7xl pb-2">
            <img src={logo2} width={60} height={30} alt="" />
            <button
              type="button"
              className="bg-[#eeeded] hover:bg-[tomato] w-32 h-11 font-semibold rounded-lg"
              onClick={handleSingout}
            >
              Log out
            </button>
          </div>
          <div className="flex  h-full w-full max-w-7xl rounded-lg">
            <div className="w-2/6 h-[55vh] bg-[#d9cdfc] rounded-xl">
              <ImageUploader
                setMicstate={setMicstate}
                setimgurls={setimgurls}
                imgUrls={imgUrls}
                setRemoveclikced={setRemoveclikced}
              />
            </div>
            <div className=" w-2/3 flex relative bg-[#d9cdfc51] ml-2 flex-col items-start justify-start p-3 gap-y-4">

            {StoryTest !== "" && <div className="text-[1.1rem] max-h-[50vh] overflow-y-scroll scrollbar-visibility bg-[#ddddfad6] rounded-2xl scroll-smooth font-[Merriweather] p-2" > <p className="p-2" >{StoryTest}</p></div>}
              <div>
                {story !== null && (
                  <audio controls className="audioes audioes-mute">
                    <source src={story} color="red" type="audio/flac" />
                  </audio>
                )}
              </div>
              {imgUrls && (
                <button
                  type="button"
                  disabled={micState ? "" : "disabled"}
                  className=" mt-11 absolute bottom-3 self-center flex flex-col items-center bg-[#6060ffe7] hover:bg-[#5959fd] rounded-xl p-3 "
                  onClick={pressed}
                >
                  <FaMicrophoneLines size={42} /> Generate Audio
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Fullapp;
