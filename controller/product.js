const getStaticProducts =(req,res)=>{
    res.send('all static Products')
}

const getAllProducts = (req,res)=>{
    res.send('all your Products here')

}

modules.exports={ getAllProducts,getStaticProducts}
