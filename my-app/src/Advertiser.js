import { useState } from 'react';
import axios from "axios"
import "./Advertiser.css"

import { useNavigate } from 'react-router-dom';
import FileBase64 from "react-file-base64"
function Advertiser() {

  const navigate = useNavigate()

  const [photo, setPhoto] = useState("")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")

  const handleImageChange=(e)=>{
    const file=e.target.files[0].name
    const reader=new FileReader()
    // reader.onloadend=()=>{
    //   setPhoto(reader.result)
    // }
    
    setPhoto(file)
    // if(file){
    //   reader.readAsDataURL(file)
    // }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const addedData = {
      photo: photo,
      description: description,
      amount: amount
    }
    console.log(addedData)
    // write the axios query to add to db
    await axios.post("http://localhost:3333/addAds",{photo,description,amount})
      .then((res) => {
        console.log(res)
        const parsedData = JSON.parse(res.config.data)
        setPhoto(null)
        setDescription("")
        setAmount("")
      })
    

  }

  const handleLogout = (e) => {
    navigate("/login")
  }


  return (
    <div className="Advertiser">
      <h3>Advertier Page</h3>
      <form onSubmit={handleSubmit}>
        <label>Photos (png,jpeg):
          {/* <FileBase64
          multiple={false} onDone={({e})=>setPhoto({image:e.target.value})}
          /> */}
          <input type="file" accept='image/*' name="photo" onChange={handleImageChange} />
        </label>
        <label>Description:
          <input type="text" value={description} name="description" onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label htmlFor="usd-amount">Amount (USD):
          <input type="number" value={amount} name="usd-amount" onChange={(e) => setAmount(e.target.value)} />
        </label>
        <button type="submit">Add</button>
      </form>
      <button onClick={handleLogout} >Logout</button>
    </div>
  );
}

export default Advertiser;
