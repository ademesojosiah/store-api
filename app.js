require('dotenv').config()

// to handle async errors
require('express-async-errors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3030

//import route
const productRoute = require('./route/product')

//import connect to mongo db
const connectDB = require('./db/connect')

// import middlewares

const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')


//routes 
app.use('/api/v1/products',productRoute)


app.get('/',(req,res)=>{
    res.send("<h1>welcome to store Api!!!!</h1> <a href='/api/v1/products'>Products</a>")
})




//not found middleware
app.use(notFound)
//error Handler
app.use(errorHandler)


const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`server is listening to port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()


