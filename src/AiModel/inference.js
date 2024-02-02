// // import { HfInference } from "@huggingface/inference";
// // import { config } from "dotenv";
// // config();
// // console.log(process.env.VITE_api_key);

// // const hf = new HfInference(process.env.VITE_api_key);
// // const texttogenerate = "once upon a time";
// // const Textgeneration = await hf.({
// //   model: "bigscience/bloom-560m",
// //   inputs: texttogenerate,
// // });

// import { conversational, textGeneration } from "@huggingface/inference";
// import { HuggingFaceInference } from "@langchain/community/llms/hf";

// import { config } from "dotenv";
// config();

// const cat = await fetch(
// "https://media.istockphoto.com/id/583689556/photo/best-friends.jpg?s=612x612&w=0&k=20&c=8_aa7cNcJkqoMB_-ImmCtb-_GHZmDYa8y9sE3rK4uwE="
//     );
// const blobimg = await cat.blob();
// const model= new HuggingFaceInference({
//     model: "facebook/blenderbot-400M-distill",
//   apiKey:process.env.huggingFace
// })

// const answer= await model.invoke({ task:conversational ,inputs:"hello"})
// //({inputs:"hello my name is aron,how are you"})
// console.log(answer)

// import { imageReader } from "./src/AiModel/Imageprocessing.js"
// const image="https://media.istockphoto.com/id/583689556/photo/best-friends.jpg?s=612x612&w=0&k=20&c=8_aa7cNcJkqoMB_-ImmCtb-_GHZmDYa8y9sE3rK4uwE="
// const res= await imageReader(image)
// console.log(res)
