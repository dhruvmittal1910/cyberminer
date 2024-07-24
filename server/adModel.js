const mongoose = require("mongoose")

const adSchema = new mongoose.Schema({
    photo:String,
    description: String,
    amount: Number
})


const adModel = mongoose.model("ads", adSchema)

module.exports = adModel