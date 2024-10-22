import './App.css'
import NavBar from './assets/components/NavBar/NavBar'
import ItemListContainer from './assets/components/ItemListContainer/ItemListContainer'
import { useState } from 'react'

function App() {
  const [valor, setValor] = useState(0)
  return (
    <>
       <NavBar valor={valor}/>
       <ItemListContainer mensaje="Bienvenido" fn={setValor}/>
    </>
  )
}

export default App
