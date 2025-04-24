import { useEffect, useState } from 'react'
import * as webllm from "@mlc-ai/web-llm";
import "./app.css"


function App() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState("")
  const[messages,setMessages] = useState([{
    role: "system",
    content: "Hello, how can I help you?"
  }
  ])
  const [engine, setEngine] = useState(null)
  const [isThinking, setIsThinking] = useState(false)


  useEffect(() => {
    const selectModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC";;    //Here Model is selected

    webllm.CreateMLCEngine(               // Then Engine is created 
      selectModel,
      {
        initProgressCallback:(initProgress)=>{
          console.log("initProgress", initProgress)          // Then the progress is logged because the model is downloaded firt in System
      }
    }).then(engine => {
      setEngine(engine)

      const initialmessage = [...messages,{
        role: "assistant",
        content: "Hello, how can I help you?"
      }]
      setMessages(initialmessage)
    })
  },[])

  async function sendMessageToLLM(){
    const tempMmessages = [...messages]
    tempMmessages.push({
      role: "user",
      content: input
    })  
    setMessages(tempMmessages)
    setInput("")
    // Show thinking message while model is processing
    setIsThinking(true)

    engine.chat.completions.create({                   // This Function Give Input To THe LLM 
      messages : tempMmessages,
    }).then((reply) => {
      console.log("reply", reply)
      const text = reply.choices[0].message.content
      setMessages([...tempMmessages, {
        role: "assistant",
        content: text
      } ])
      // Hide thinking message
      setIsThinking(false)
    })

  }
  return (
    <main>
      <section>
        <div className='Conv-Area'>

          <div className="messages">
            {
              messages.filter(message=>message.role!=="system").map((message, index) => {
                return (
                  <div className={`message ${message.role}`} key={index}>
                    {message.content}
                  </div>
                );
              })
            }
            {/* Show thinking message while waiting for the model to respond */}
            {isThinking && (
              <div className="message assistant">Thinking...</div>
            )}
          </div>


          <div className='user-Area'>
            <input 
            onChange={(e) => setInput(e.target.value)}
            value={input} 
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessageToLLM()
              }
            }}
            type='text' placeholder='How Can I Help You ? '/>
            <button 
            onClick={() => {
              sendMessageToLLM()
            }}
            >Send</button>
          </div>

        </div>
      </section>
    </main>
  )
}

export default App
