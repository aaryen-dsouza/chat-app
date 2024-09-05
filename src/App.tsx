// import { useState } from 'react'
// import UserContextProvider from './context/UserContextProvider'
// import Register from './pages/Register'

import Chat from "./components/chat/Chat"
import Detail from "./components/detail/Detail"
import List from "./components/list/List"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='w-[80vw] h-[90vh] bg-chatscreen backdropFilterSat rounded-xl border-2 border-solid border-slate-50/[.125] flex'>
      <List />
      <Chat />
      <Detail/>
    </div>
  )
}

export default App
