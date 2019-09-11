const express = require ('express');
const morgan = require ('morgan');
const parser = require('body-parser');
const mysql = require ('mysql');

const app = express();
var html_dir = "./public/";//routes to serve the static html files



//making node access our html file/s in public dir
app.use(express.static('./public'));

//utilising morgan console details display
app.use(morgan('short'));

app.use(parser.urlencoded({extended:false}));


app.get("/customerinformation", function (req, res) {
    res.sendfile(html_dir + "toyota.html")

});




const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'toyotamailform',
})

app.post('/orders',(req,res) =>{

    const customerid = req.body.customer_id;
    const name = req.body.user_name;
    const town = req.body.town;
    const partnum = req.body.part_num;
    const priceperpart = req.body.unit_price;
    const quantity = req.body.quantity;
    const method = req.body.ship_bill;
    const total= req.body.total_bill;
   
    
    const querystring = 'INSERT INTO customerinformation(customerid,name,town,partnumber,priceperpart,quantity,method,total) VALUES (?,?,?,?,?,?,?,?)';
    connection.query(querystring, [customerid,name,town,partnum,priceperpart,quantity,method,total]);
    console.log(method)
    console.log('getting the form input ' + req.body.name);

    setTimeout(function(){
    res.redirect('/customerinformation')
    res.end();
},20000);
   
});


app.listen(4005);
console.log('running at port 4005');