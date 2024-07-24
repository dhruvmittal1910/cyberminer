import { useState } from 'react';
import axios from "axios"
import "./Admin.css"
import { useNavigate } from 'react-router-dom';
function Admin() {


  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")
  const [isValid, setIsValid] = useState(false)
  const navigate = useNavigate();


  const urlPattern = /^(http:\/\/|https:\/\/)?(www\.)?[a-zA-Z0-9]+\.(edu|com|org|net|gov)$/;

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
    setIsValid(urlPattern.test(e.target.value))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isValid === true) {
      const addedData = {
        url: url,
        description: description,
      }
      console.log(addedData)

      // write the axios query to add to db
      await axios.post(process.env.REACT_APP_API_URL + "/add", { data: addedData })
        .then((res) => {
          // const parsedData = JSON.parse(res.config.data)
          setUrl("")
          setDescription("")
        })
    } else {
      alert('URL is invalid!');
    }
  }

  const handleLogout = (e) => {
    navigate("/login")
  }

  return (
    <div className="Admin">
      <h2>ADMIN PAGE</h2>
      <form onSubmit={handleSubmit}>
        <label>URL:
          <input type="text" value={url} name="url" onChange={handleUrlChange} />
        </label>
        <label>Description:
          <input type="text" value={description} name="description" onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button type="submit">Add</button>
      </form>
      <button onClick={handleLogout} >Logout</button>
    </div>
  );
}

export default Admin;
