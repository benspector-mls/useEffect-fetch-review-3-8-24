import { useState, useEffect } from 'react'
import './App.css'

const dogAPI = "https://dog.ceo/api/breeds/image/random";
const backupDog = {
  "message": "https://images.dog.ceo/breeds/shihtzu/n02086240_6585.jpg",
  "status": "success"
}

const fetchData = async (url) => {
  try {
    const r = await fetch(url);
    const data = await r.json();
    return [data, null];
  } catch (error) {
    console.error(error);
    return [null, error]
  }
}

/* 
Two ways to fetch data:
1. The user does something (clicks on the button, submit a form)
2. The component renders
*/

// State change -> re-render -> effect runs

function App() {
  const [count, setCount] = useState(0)
  const [dog, setDog] = useState(backupDog)
  const [error, setError] = useState(null)
  const [inputText, setInputText] = useState('hello');

  useEffect(() => {
    const doFetch = async (e) => {
      console.log('click')
      const [data, error] = await fetchData(dogAPI)
      if (data) setDog(data);
      if (error) setError(error);
    }
    doFetch();
  }, []) // <-- try putting dog, count, inputText, or a combination in here

  const handleClick = async (e) => {
    console.log('click')
    const [data, error] = await fetchData(dogAPI)
    if (data) setDog(data);
    if (error) setError(error);
  }

  console.log('app rendering')

  if (error) return <p>{error.message}</p>

  return (
    <>
      <input
        type="text"
        name=""
        id=""
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <img style={{ width: '500px' }} src={dog.message}></img>
      <button onClick={handleClick}>Get Dog</button>
      <button onClick={() => setCount((count) => count + 1)}>Count: {count}</button>
    </>
  )
}

export default App
