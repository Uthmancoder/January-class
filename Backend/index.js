const express = require("express")
const ConnectDb = require("./Config/dbConfig")
const env = require("dotenv").config()
const userRoutes = require("./Routes/UserRoutes")
const productRoutes = require("./Routes/productRoutes")  
const cors = require("cors")
const ErrorHandler = require("./Middlewares/ErrorHandler")
const app = express()

app.use(express.json())
app.use(cors({origin : "*"}))
app.use("/Api/User", userRoutes)
app.use("/Api/products", productRoutes)
app.use(ErrorHandler)


console.log("Working Tree Clean ")
const port = process.env.PORT || 4001

ConnectDb()

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})