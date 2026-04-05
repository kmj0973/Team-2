import { useState } from 'react'
import Header from './components/Header';
import About from './components/About';
import Hobby from './components/Hobby';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <main>
        <About></About>
        <Hobby></Hobby>
      </main>
    </>

  );
}

export default App
