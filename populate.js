const connectDB = require('./db/connect')
const Product = require('./model/Product')
require('dotenv').config()
const product = require('./products.json')




const start = async ()=>{
    try {
        
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(product)
        console.log('success!!!!');
        process.exit(0)
    } catch (error) {
        console.log(error);
    }

}

start()