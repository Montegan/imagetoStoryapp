import { HfInference } from "@huggingface/inference"
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { HumanMessage } from "@langchain/core/messages";

//initializing the hugging face
const hf= new HfInference(import.meta.env.VITE_APP_api_key)

//Here is the image to text model
const imageReader=async(img)=>{
   console.log("img reader " + img)
   const image= await fetch(img)
   console.log(image)
    const imageblob= await image.blob();
    const result= await hf.imageToText({ model:"Salesforce/blip-image-captioning-large",data:imageblob})
    return result.generated_text
}

//Initilaizing the open ai gpt model
const openai = new ChatOpenAI({ openAIApiKey: import.meta.env.VITE_APP_Openai });
const hello =`You are a helpfull and very creative at describing images. Your job is to list the objects in the image and provide explanation about the image for visually impared people, based on the image caption generated using an image to text model, caption{word};`
const helloPrompt = ChatPromptTemplate.fromTemplate(hello);
const helloRunnable = RunnableSequence.from([
  helloPrompt,
  openai,
  new StringOutputParser(),
]);

// function that calls all the models and translates the image into an audio description.
export const storyteller= async(imgurl)=>{
    const image= imgurl
    const Inputword= await imageReader(image);
    const answer= await helloRunnable.invoke({word:Inputword})
    const audioRes= await  hf.textToSpeech({model:"facebook/mms-tts-eng", data: answer})
    const audioUrl= URL.createObjectURL(audioRes);
    return({audio:audioUrl, TextStory:answer});
}

//https://media.istockphoto.com/id/583689556/photo/best-friends.jpg?s=612x612&w=0&k=20&c=8_aa7cNcJkqoMB_-ImmCtb-_GHZmDYa8y9sE3rK4uwE=
































// import { ChatOpenAI } from "@langchain/openai";
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { RunnableSequence } from "@langchain/core/runnables";
// import { StringOutputParser } from "@langchain/core/output_parsers";
// import { imageReader } from "./Imageprocessing.js";
// import { HumanMessage } from "@langchain/core/messages";
// import { config } from "dotenv";
// config();

// const openai = new ChatOpenAI({ openAIApiKey: import.meta.VITE_Openai });

// const hello = "You are a very creative at describing images. You will write a short story of 200 words, based on the image caption generated using an image to text model, caption{word}";
// const helloPrompt = ChatPromptTemplate.fromTemplate(hello);

// const helloRunnable = RunnableSequence.from([
//   helloPrompt,
//   openai,
//   new StringOutputParser(),
// ]);

// export const storyteller= async()=>{
//     const image="https://media.istockphoto.com/id/583689556/photo/best-friends.jpg?s=612x612&w=0&k=20&c=8_aa7cNcJkqoMB_-ImmCtb-_GHZmDYa8y9sE3rK4uwE="
//     const Inputword= await imageReader(image);
//     const answer= await helloRunnable.invoke({word:Inputword})
//     return(answer);
// }


// //const res = await openai.invoke([new HumanMessage(hello)]);
