const {Router}=require("express")
const multer=require('multer')
const path=require('path')
const router=Router()

const {getUrl,addUrl,getUsers,addUsers,newUsers,getAds,addAds,getSuggestions,getting}=require("./controller")

router.get("/",getting)

router.get("/get",getUrl)

router.post("/add",addUrl)

// router.put("/update/:id",updateBook)

// router.delete("/delete/:id",deleteBook)




router.get("/login",getUsers)

router.post("/login",addUsers)

router.post("/signin",newUsers)

router.get("/getAds",getAds)

router.get("/getSuggestions",getSuggestions)


// set storage
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,Daate.now()+"-"+file.originalname)
    }
})

const upload = multer({
    storage: storage
})

router.post("/addAds",addAds)

module.exports=router