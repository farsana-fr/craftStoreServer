const db=require('./db')

login=(em,pwd)=>{
    console.log("LOGIN",em,pwd);
    return db.User.findOne({email:em,password:pwd}).then(data=>{
        console.log(data);
        if(data)
        {

           
            return{
                status:true,
                statusCode:200,
                message:"Welcome"
            }
        }
        else
        {
            
            return{
                status:false,
                statusCode:403,
                message:"Invalid Credentials"
            }
        }
    })
}
register=(nm,em,pwd)=>{
    console.log("REGISTER");
    return db.User.findOne({email:em}).then(user=>{
        console.log("user",user);
        if(user)
        {
            return{
                status:false,
                statusCode:403,
                message:"User Already Registered"
            }
        }
        else if(em=="" || em==" ")
        {
            return{
                status:false,
                statusCode:403,
                message:"Please Fill the Form"
            }
        }
        else
        {
            const newUser=new db.User({
                name:nm,
                email:em,
                password:pwd,
                cart:[]
            });
            newUser.save()

            return{
                status:true,
                statusCode:200,
                message:"New User Added"
            }
        }
    })
}

viewProducts=()=>{
    return db.Product.find().then(data=>{
        console.log("data",data);
        if(data)
        {
            
            return{
                status:true,
                statusCode:200,
                message:data
            }
        }
    })
}
addToCart=(em,pid,pimage,pname,pprice)=>{
    return db.User.findOne({email:em}).then(user=>{
        if(user){
            console.log(user);
            user.cart.push(
                {
                    pid:pid,
                    pimage:pimage,
      pname:pname,
      pprice:pprice
                }
            )
            user.save()
            return{
                status:true,
                statusCode:200,
                message:user
            }
        }
    })
}

viewCart=(em)=>{
    console.log(em);
    return db.User.findOne({email:em}).then(user=>{
        const res=[]
        console.log("USERRR",user);
        if(user){
           
            console.log("USERRR",user);
            console.log("ID");
            // user.cart.forEach(e=>
            //     {
            //         console.log(e);
            //         db.Product.findOne({id:e}).then(items=>{
            //             console.log("ITEMS",items);
                        
            //             res.push(items)
            //             // console.log(res,"RESULTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
            //         })
            //     }
                
            // )
            //  db.Product.findOne({id}).then(items=>{
            //     console.log(items);
            //  })
            // console.log(res,"RESULTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
            return{
                status:true,
                statusCode:200,
                message:user.cart
            }
        }
    })
}
viewProduct=(id)=>{
    return db.Product.find({id}).then(data=>{
        console.log("data",data);
        if(data)
        {
            
            return{
                status:true,
                statusCode:200,
                message:data
            }
        }
    })
}

addNewProduct=(id,type,name,price,img)=>{
    return db.Product.findOne({id}).then(data=>{
        if(data)
        {
            return{
                status:false,
                statusCode:403,
                message:"User Already Registered"
            }
        }
        else
        {
            const newProd=new db.Product({
                id,
                typeName:type,
                productName:name,
                price,
                image:img
            })
            newProd.save();

            
            return{
                status:true,
                statusCode:200,
                message:"Product Added Successfully"
            }
        }
    })
}

removeProduct=(id)=>{
    return db.Product.deleteOne({id}).then(data=>{
        console.log(data);
        if(data)
        {
            return{
                status:true,
                statusCode:200,
                message:"Product Deleted Successfully"
            }
        }
        
    })
}

editProduct=(id,type,name,price,img)=>{
    return db.Product.findOne({id}).then(data=>{
        if(data)
        {
            data.id=id
            data.typeName=type
            data.productName=name
            data.price=price
            data.image=img
            data.save()
            return{
                status:true,
                statusCode:200,
                message:"Updated"
            }
        }
    })
}
removeFromCart=(em,pid)=>{
    return db.User.findOne({email:em}).then(user=>{
        console.log(user);
        const index=user.cart.findIndex(e=>e.pid==pid)

        console.log(index);
        user.cart.splice(index,1)
        user.save()
         return{
            status:true,
            statusCode:200,
            message:"Removed"
        }
    })
}
module.exports={
    login,register,
    viewProducts,addToCart,viewCart,viewProduct,
    addNewProduct,removeProduct,editProduct,
    removeFromCart
}