const express = require('express');
const app = express();
const joi = require('@hapi/joi');

app.use(express.json());
//Sample Data
const categories = [
    {id : 1, name : "mobiles", products : ['nokia', 'sony']},
    {id: 2, name : "laptops", products : ['hp', 'dell']}
];

// API for categories
app.get('/api/categories',(req,res) => {
    let temp = categories.map(({products, ...rest})=>rest );
    res.send(temp);
});

app.post('/api/categories' , (req,res) => {
    let {error} = validateCategory(req.body);
    if(error){
        console.log(error);
        res.status(400).send(error.details[0].message);
        return;
    }

    let category = categories.find(c => c.name === req.body.name);
    if(category) return res.status(400).send("Category already exists!");
    category = {
        id : categories.length+1,
        name : req.body.name,
        products :[]
    };

    categories.push(category);
    res.send({"id": category.id, "name" : category.name});
});

app.delete('/api/categories/:name',(req,res)=>{
    let category = categories.find(c => c.name === req.params.name);
    if(!category) return res.status(400).send("No Category is found for the given Name");

    let index = categories.indexOf(category);
    categories.splice(index,1);
    res.send(category);

})

app.put('/api/categories/:cat/:new_cat',(req,res)=>{
    let category = categories.find(c => c.name === req.params.cat);
    if(!category) return res.status(400).send("No Category is found for the given Name");

    category.name = req.params.new_cat;

    res.send({"id" : category.id, "name" : category.name});
    
})

//API for Products
app.get('/api/products/:category', (req,res) => {
    let category = categories.find(c => c.name === req.params.category);
    if(!category) return res.status(400).send("No such category found !!");

    res.send(category.products);
})

app.post('/api/products/' , (req, res) => {
    let {error} = validateProduct(req.body);
    if(error){
        console.log(error);
        return res.status(400).send(error.details[0].message);
    }

    let category = categories.find(c => c.name === req.body.category);
    if(!category){
        return res.status(400).send(`Category ${req.body.category} does'nt , Please create category and try again.`);
    }else{
        if(category.products.includes(req.body.name)){
            return res.status(400).send(`Product already exist in ${req.body.category} category !`);
        }
        category.products.push(req.body.name);
        res.send(category.products);
    }
})

app.delete('/api/products/:cat/:prod',(req,res)=>{
    console.log(req.params);
    let category = categories.find(c => c.name === req.params.cat);
    if(!category) return res.status(400).send("No Such Category Found");

    if(!category.products.includes(req.params.prod)) return res.status(400).send("Product Not Found");

    let index = category.products.indexOf(req.params.prod);
    category.products.splice(index,1);
    res.send(req.params.prod);

})
app.put('/api/products/:category/:prod_old/:prod_new',(req,res)=>{
    console.log(req);
    let category = categories.find(c => c.name === req.params.category);
    if(!category) return res.status(400).send("No Such Category Found");
    if(!category.products.includes(req.params.prod_old)) return res.status(400).send("Product Not Found");

    let index = category.products.indexOf(req.params.prod_old);
    category.products.splice(index,1,req.params.prod_new);
    res.send(req.params.prod_new);

})

//Starting Server
const port = 3000;
app.listen(port,() =>{
    console.log('Listening...');
})

//Validations
function validateCategory(category){
    let schema = joi.object({
        name : joi.string().required().min(5)
    });

    return schema.validate(category);
}

function validateProduct(product){
    let schema = joi.object({
        name : joi.string().required().min(5),
        category : joi.string().required().min(5)
    });

    return schema.validate(product);
}
