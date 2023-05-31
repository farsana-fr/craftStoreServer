const express=require('express')
const cors=require('cors')

const server=express();

//Connect server with front-end
server.use(cors({origin:'http://localhost:3000'}))
//convert all json to JS
server.use(express.json())
const logic=require('./logic')

server.listen(8000,()=>{
    console.log("Server started......");
})



server.post('/login',(req,res)=>{
    logic.login(req.body.em,req.body.pwd).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

server.post('/register',(req,res)=>{
    logic.register(req.body.nm,req.body.em,req.body.pwd).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

server.get('/viewProducts',(req,res)=>{
    logic.viewProducts().then(result=>{
        res.status(result.statusCode).json(result)
    })
})

server.post('/addToCart',(req,res)=>{
    
    logic.addToCart(req.body.em,req.body.pid,req.body.pimage,req.body.pname,req.body.pprice).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

server.post('/myCart',(req,res)=>{
    
    logic.viewCart(req.body.em).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

server.post('/viewProduct',(req,res)=>{
    console.log("REQ",req.body);
    logic.viewProduct(req.body.id).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

server.post('/addNewProduct',(req,res)=>{
    logic.addNewProduct(req.body.id,req.body.type,req.body.name,req.body.price,req.body.img).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

server.delete('/removeProduct/:id',(req,res)=>{
    console.log(req);
    logic.removeProduct(req.params.id).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

server.post('/editProduct',(req,res)=>{
    logic.editProduct(req.body.id,req.body.type,req.body.name,req.body.price,req.body.img).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

server.post('/removeFromCart',(req,res)=>{
    logic.removeFromCart(req.body.em,req.body.pid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})