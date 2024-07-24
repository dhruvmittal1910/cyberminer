const mongoose=require("mongoose")

const urlSchema=new mongoose.Schema({
    url:String,
    description:String,
    date:{
        type:Date,
        default:Date.now
    }
})


const urlModel=mongoose.model("utd",urlSchema)

module.exports=urlModel