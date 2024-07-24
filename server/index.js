const express=require("express")
const mongoose=require("mongoose")
const multer=require("multer")
const cors=require("cors")
const {scheduleTask}=require("./deleteOldUrls")
const PORT=3333
const app=express()


const routes=require("./routes")

app.use(express.json())
app.use(cors())
app.use(routes)



mongoose
.connect("mongodb+srv://dhruvmittal1910:dhruvmittal1910@clusterooad.jmvldza.mongodb.net/cyberminer")
.then(()=>{
    console.log("connnection made")
}).catch(err=>{
    console.log(err)
})


app.use("/",routes)
scheduleTask()

app.listen(PORT,()=>{
    console.log("Server running on ",PORT)
})