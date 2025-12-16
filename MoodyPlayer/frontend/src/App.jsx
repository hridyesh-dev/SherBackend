
import { useState } from 'react'
import './App.css'
import FacialExpression from './components/FacialExpression'
import MoodSongs from './components/MoodSongs'
import MoodyNavbar from './components/MoodyNavbar'

function App() {


    // jo bhi songs rahege idhar dikhe ge 
    //mood ke according songs idhar aaye ge 
    const [Songs , setSongs] = useState([]) 

  return (
    <>
      <MoodyNavbar/>
      {/* yaha mood detect hoga : yeh expression detect karke server pe request karega aur set krr dega  */}
      <FacialExpression setSongs={setSongs}/>
      {/* yaha songs jaaye ge  */}
      <MoodSongs Songs={Songs} />
    </>
  )
}

export default App
