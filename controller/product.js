const Product = require('../model/Product')

const getStaticProducts = async (req,res)=>{
    const products = await Product.find({})
    res.status(200).json({nbHits:products.length, products})
}

const getAllProducts = async (req,res)=>{
    const { featured,company,name ,sort,fields, numericFilters } = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true'?true:false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name, $options:'i'}
    }


    let result =  Product.find(queryObject)

    if(sort){
        const sortItem = sort.split(',').join(' ')
        result = result.sort(sortItem)
    }
    if(fields){
        const sortFields = fields.split(',').join(' ')
        result = result.select(sortFields)
    }

    if(numericFilters){
        const objectRep ={
            '>':"$gt",
            '>=':"$gte",
            '=':"$eq",
            '<':"$lt",
            '<=':"$lte"
        }
        
        const regEx = /\b(>|>=|=|<|<=)\b/g
        let filter = numericFilters.replace(regEx,(match)=> `-${objectRep[match]}-`)
        
        const options = ['price','rating']
        filter = filter.split(',').forEach((item)=>{
            const [field,operator,no] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(no)}
            }
        })
        console.log(queryObject)
             
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) * limit
    result = result.skip(skip).limit(limit)

    const products = await result

    res.status(200).json({nbHits:products.length, products})

}

module.exports = {getAllProducts,getStaticProducts}