import './App.css';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Microlink from '@microlink/react'
// import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import fuzzysort from "fuzzysort"
function App() {
  const [userInput1, setUserInput1] = useState("")
  const [selectedValue, setSelectedValue] = useState('AND');
  const [allWords, setAllWords] = useState([])

  const [cursorPosition, setCursorPosition] = useState(0);

  const [suggestions, setSuggestions] = useState([]);

  const [data, setData] = useState([])
  const [result, setResult] = useState([]);

  const [visible, setVisible] = useState(2);

  const navigate = useNavigate();



  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(process.env.REACT_APP_API_URL + "/get")
      setData(response.data)
      const desc = response.data.map(item => item.description)


      const wordSet = new Set()
      desc.forEach(id => {
        id.split(/\s+/).forEach(word => {
          wordSet.add(word.replace(/[^a-zA-Z0-9\s]/g, ''))
        })
      })

      setAllWords(Array.from(wordSet))

    }
    getData()


  }, [])

  useEffect(() => {

    if (userInput1.length < 2) {
      setSuggestions([])
      return;
    }

    const words = userInput1.slice(0, cursorPosition).split(/\s+/)
    const currentWord = words[words.length - 1]

    const results = fuzzysort.go(currentWord, allWords, {
      limit: 10,
      threshold: -10000
    })

    console.log(results)

    const newSugg = results.map(res => {
      const suggWords = [...words]
      suggWords[suggWords.length - 1] = res.target
      return suggWords.join(' ')
    })

    setSuggestions(newSugg)


  }, [userInput1, data, cursorPosition])



  const handle = (e) => {
    setSelectedValue(e.target.value)
  }

  const handleSubmit = (e) => {
    setUserInput1(userInput1)
    setSelectedValue(selectedValue)
    console.log(userInput1, selectedValue)
    getResults();
    setVisible(5);
  }

  // and/or/not results
  const getResults = () => {
    const queryWords = userInput1.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').split(' ')


    if (selectedValue == 'AND') {
      const filteredResults = data.filter(item => {
        const descripWords = item.description.toLowerCase().split(' ')
        return queryWords.every(word => descripWords.includes(word))
      })
      filteredResults.sort((a, b) => a.description.localeCompare(b.description));
      console.log(filteredResults, "output")
      setResult(filteredResults)
    }
    else if (selectedValue == 'OR') {
      const filteredResults = data.filter(item => {
        const descripWords = item.description.toLowerCase().split(' ')
        return queryWords.some(word => descripWords.includes(word))
      })
      filteredResults.sort((a, b) => a.description.localeCompare(b.description));
      console.log(filteredResults, "output")
      setResult(filteredResults)
    } else if (selectedValue == 'NOT') {
      const filteredResults = data.filter(item => {
        const descripWords = item.description.toLowerCase().split(' ');
        // Return true if NONE of the query words are in the description
        return !queryWords.some(word => descripWords.includes(word));
      });
      filteredResults.sort((a, b) => a.description.localeCompare(b.description));
      console.log(filteredResults, "output");
      setResult(filteredResults);
    }

  }

  const handleLoad = (e) => {
    setVisible(prev => prev + 5)
  }

  const redirectTo = () => {
    navigate("/login")
  }

  const redirectToAdd = () => {
    navigate("/advertiser")
  }

  const newClick = (e) => {
    setCursorPosition(e.target.selectionStart)
    setUserInput1(e.target.value)
  }
  const handleClick = (suggestion) => {
    const words = userInput1.split(/\s+/)
    words[words.length - 1] = suggestion.split(/\s+/).pop()
    const newQ = words.join(' ')
    setUserInput1(newQ)
    setSuggestions([])
  }

  // const noOutput=()=>{
  //   alert("ok")
  // }

  return (
    <div className="App">

      <input
        type="search"
        placeholder="Search here"
        onChange={newClick}
        // onChange={handleChange}
        value={userInput1}
        onKeyUp={(e) => setCursorPosition(e.target.selectionStart)}
        onClick={(e) => setCursorPosition(e.target.selectionStart)} />

      {suggestions.length > 0 && (
        <div className="suggestion-list">
          {suggestions.map((suggestion, index) => (
            <p className="suggestion-item" key={index} onClick={() => handleClick(suggestion)} style={{ cursor: "pointer" }}>
              <strong>{suggestion}</strong>
            </p>
          ))}
        </div>
      )}

      <select value={selectedValue} onChange={handle}>
        <option value="AND">AND</option>
        <option value="OR">OR</option>
        <option value="NOT">NOT</option>
      </select>
      <button className='adminBtn' onClick={redirectTo}>Admin Login</button>
      <button className='advertiserBtn' onClick={redirectToAdd}>Advertiser Login</button>
      <button className='submitBtn' onClick={handleSubmit}>submit</button>

      <div className='results-container' style={{ display: "flex", flexWrap: "flex" }}>
        {result.length > 0 ?
          result.slice(0, visible).map((item, index) => (
            <div key={item.id} className='result-item'>
              <p >{item.description}</p>
              <Microlink url={item.url} />
            </div>
          )) : <strong style={{ textAlign: "center", marginLeft: "40%" }}>No Result Found for the current Inputs</strong>}
      </div>

      {result.length > visible && (
        <button onClick={handleLoad}>Load More</button>
      )}




    </div>
  );
}

export default App;
