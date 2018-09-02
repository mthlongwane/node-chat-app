//node module is called path. 
const path  = require ('path');
const publicPath = path.join(__dirname, '../public') // this is better that ../../ because it makes issues.
const port = process.env.PORT || 3000

const express =  require('express');

var app = express()


app.use(express.static(publicPath));

/*
app.get('/',(req, res) =>{
    res.send("Awe")
})
*/

app.listen(port, () => {
    console.log(`server up on port ${port}`);
})