import { useState } from 'react'
import "./app.css"


function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <section>
        <div className='Conv-Area'>


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
