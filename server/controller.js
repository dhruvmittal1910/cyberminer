const urlModel = require("./schema")
const userModel = require("./userModel")
const adModel = require("./adModel")
const fs = require('fs');
const multer = require("multer")
const path = require("path")

module.exports.getting=async(req,res)=>{
    res.send("working")
}


// autofill

module.exports.getSuggestions = async (req, res) => {

    const urls = await urlModel.find()
    res.send(urls)

}

// get url
module.exports.getUrl = async (req, res) => {
    const urls = await urlModel.find()
    res.send(urls)
}

// add a url

module.exports.addUrl = (req, res) => {
    const { data } = req.body
    urlModel.create(data)
        .then((res) => {
            res.status(201).send(res)
        }).catch(err => res.send(err))
}


// get users
module.exports.getUsers = async (req, res) => {
    const users = await userModel.find()
    res.send(users)
}

module.exports.addUsers = async (req, res) => {
    const userDetails = req.body.data

    userModel.findOne({ username: userDetails.username })
        .then((user) => {
            if (user) {
                if (user.password == userDetails.password) {
                    res.json("Success")
                } else {
                    res.json("Wrong Password")
                }
            } else {
                res.json("User not registered")
            }
        })
}

// signup
module.exports.newUsers = async (req, res) => {
    try {
        userModel.create(req.body.data)
            .then(data => res.send(data))
            .catch(err => res.send(err))
    } catch (err) {
        res.json(err)
    }
}

// ads

module.exports.getAds = async (req, res) => {
    const ads = await adModel.find()
    res.send(ads)
}



module.exports.addAds = async (req, res) => {
    try {
        const { photoPath, description, amount } = req.body
        // Decode base64 image and save it
        const base64Data = photoPath.replace(/^data:photoPath\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        const photo = `uploads/${Date.now()}.png`;
        fs.writeFileSync(path.join(__dirname, photo), buffer);

        const newItem = new Item({
            photo,
            description,
            amount
        });

        await newItem.save()
        res.status(201).send('Item saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving item');
    }

}



// fetch books
// module.exports.getBooks=async(req,res)=>{
//     const books=await bookModel.find()
//     // sending data to localhost:3333/get
//     res.send(books)
// }





// update a book
// module.exports.updateBook=(req,res)=>{
//     const {id}=req.params
//     const {book}=req.body
//     console.log(book)
//     bookModel.findByIdAndUpdate(id,book)
//     .then(()=>res.send("Updated the Book"))
//     .catch(err=>res.send(err))
// }

// delete a book
// module.exports.deleteBook=(req,res)=>{
//     const {id}=req.params
//     bookModel.findByIdAndDelete(id)
//     .then(()=>res.send("deleted the book"))
//     .catch(err=>res.send(err))
// }

