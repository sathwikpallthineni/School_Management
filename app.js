import 'dotenv/config'
console.log(process.env.DB_HOST);
import mysql from 'mysql2/promise';
import express from 'express'
import schoolSchema from './validation.js';
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const connection = await mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   port: process.env.DB_PORT
});
app.listen(3000,(req,res) => {
    console.log("server started listening")
})


app.post("/addSchool",async(req,res,next) => {
    if(!req.body){
   return res.status(400).json({
      message:"Request body required"
   });
   }
    const {name,address,latitude,longitude} = req.body;
    let {error} = schoolSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: error.details[0].message,
        })
    }
    try{
        let query = "INSERT INTO schools(name,address,latitude,longitude) VALUES(?,?,?,?)";
        await connection.query(query,[name,address,latitude,longitude]);
        return res.status(201).json({
            message: "School added successfully"
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: "Error adding school"
        })
    }
});

function calculateDistance(lat1, lon1, lat2, lon2) {

    const toRad = (value) => value * Math.PI / 180;

    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

app.get("/getSchools",async(req,res,next) => {
    try{
        if(!req.query.latitude || !req.query.longitude){
            return res.status(400).json({
                message: "Latitude and Longitude are required"
            })
        }
        let {latitude,longitude} = req.query;
        let [schools] = await connection.query("SELECT * FROM schools");

        let sortedSchools = schools.map((school) => {
            let distance = calculateDistance(latitude,longitude,school.latitude,school.longitude); 
            return {
                ...school,
                distance: distance
            }
        })
        sortedSchools.sort((a,b) => a.distance - b.distance);
        return res.status(200).json({
            message: "schools fetched successfully",
            schools: sortedSchools
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            message: "Error fetching schools"
        })
    }
})


