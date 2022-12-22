const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()
// middle wares
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.pni5ntf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
 
      const propertyCollection = client.db('real_estate').collection('items')
   
      

   try {
    
     app.get('/properties' , async(req,res) => {
         const query = {};
         const result = await propertyCollection.find(query).toArray()
         res.send(result)
      
     } )
   
   app.get('/propertiesDetails/:id' , async(req,res) => {

     const id = req.params.id;
     const query = {_id: ObjectId(id)};
     const result = await propertyCollection.findOne(query);
     res.send(result)

   })
    


   }
   finally{
    
   }

}
 run().catch(error => console.log(error))


app.get('/' , (req, res) => {
    res.send('WishWorks_Real_estate  Server Running  ? ')
})

app.listen(port, () => {
    console.log(' server in running : ' , {port});
})