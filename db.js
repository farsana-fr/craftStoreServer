const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecommerce')

const User=mongoose.model('User',{
    name:String,
    email:String,
    password:String,
    cart:[]
})

const Product=mongoose.model('Product',{

id:String,
type:String,
typeId:Number,
typeName:String,
productName:String,
price:Number,
image:String

})
module.exports={
    User,
    Product
}