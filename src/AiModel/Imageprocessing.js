// import { HfInference } from "@huggingface/inference"
// const hf= new HfInference(import.meta.VITE_api_key)
// export const imageReader=async(img)=>{
//     const image= await fetch(img)
//     const imageblob= await image.blob();
//     const result= await hf.imageToText({ model:"Salesforce/blip-image-captioning-large",data:imageblob})
//     return result.generated_text
// }



//code from app.jsx file 

{/* {result} <br />
      <img
        height={500}
        width={500}
        src="https://media.istockphoto.com/id/583689556/photo/best-friends.jpg?s=612x612&w=0&k=20&c=8_aa7cNcJkqoMB_-ImmCtb-_GHZmDYa8y9sE3rK4uwE="
        alt=""
      />
      <br />
      <br />
      <button type="button" onClick={callgenerator}>
        generate
      </button> */}


       // const [result, setResult] = useState("hello");
  // console.log(import.meta.env.VITE_api_key);
  // //const texttogenerate="./assets/R.jpeg"

  // const openai = new OpenAI({
  //   apiKey: "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",
  //   dangerouslyAllowBrowser: true,
  // });

  // const callgenerator = async () => {
  //   const hf = new HfInference(import.meta.env.VITE_api_key);
  //   //const texttogenerate=require("./assets/R.jpeg")
  //   const cat = await fetch(
  //     "https://media.istockphoto.com/id/583689556/photo/best-friends.jpg?s=612x612&w=0&k=20&c=8_aa7cNcJkqoMB_-ImmCtb-_GHZmDYa8y9sE3rK4uwE="
  //   );
  //   const blobimg = await cat.blob();
  //   const Textgeneration = await hf.imageToText({
  //     data: blobimg,
  //     model: "Salesforce/blip-image-captioning-large",
  //   });
  //   console.log(Textgeneration.generated_text)
  //   const result = await openai.chat.completions.create({
  //     messages: [
  //       {
  //         role: "user",
  //         content: `generate a short description from the following image caption ${Textgeneration.generated_text} `,
  //       },
  //     ],
  //     model: "gpt-3.5-turbo",
  //   });
   
  //   setResult(result.choices[0].message.content);
  // };




