import { useState } from 'react'
import "./app.css"


function App() {
  const [count, setCount] = useState(0)
  const[messages,setMessages] = useState([{
    role: "model",
    content: "Hello, how can I help you?"
  },{
    role: "user",
    content: "Hello , How are you ?"
  }, {
    role: "model",
    content: "What kind of job are you looking for?"
  }, {
    role: "user",
    content: "I am looking for a software engineer position"
  }, {
    role: "model",
    content: "My Name Is GPT"
  }
  ])
    
  return (
    <main>
      <section>
        <div className='Conv-Area'>

          <div className="messages">
            {
              messages.map((message, index) => {
                return (
                  <div className={`message ${message.role}`} key={index}>
                    {message.content}
                  </div>
                );
              })
            }
          </div>


          <div className='user-Area'>
            <input type='text' placeholder='How Can I Help You ? '/>
            <button>Send</button>
          </div>

        </div>
      </section>
    </main>
  )
}

export default App
