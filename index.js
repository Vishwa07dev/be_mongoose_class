const mongoose = require('mongoose')
const studentModel = require("./models/student.model1")


/**
 * Write the code to connect with MongoDB
 */
mongoose.connect("mongodb://localhost/be_demodb")

const db = mongoose.connection //Start the connection with MongoDB

db.once("open",()=>{
    console.log("Connected to MongoDB")
    //Logic to insert data into the db
    init()

    //Running the queries on MongoDB
    dbQueries()
})

db.on("error", ()=>{
    console.log("Error while connecting to DB")
});

async function init(){
    //Logic to insert data in the DB
    const student = {
        name : "Vishwa",
        age : 99,
        email : "kankvish@gmail.com",
        subjects : ["Maths", "English"]
    }

    const std_obj = await studentModel.create(student)

    console.log(std_obj)

    
}

async function dbQueries(){
    //Read the student data
    console.log("Inside the dbQueries function")
    // Read the student data based on the id 
    try{
        const student = await studentModel.findById("65d0c0bdad496cbca3346d3f")
        console.log(student)
    }catch(err){
        console.log(err)
    }

    //I want to go and search based on name
    try{
      //const students = await studentModel.find({name:"Mohan"}) []
      //const students = await studentModel.findOne({name:"Mohan"})  null
      const students = await studentModel.find({})  //acts like a find all
      console.log(students)
    }catch(err){
        console.log(err)
    }

    /**
     * Deal with the multiple conditions
     */
    const stds = await studentModel.where("age").gt("10").where("name").equals("Vishwa").limit(2)
    console.log(stds)

    

    /**
     * Delete one document where name = "Vishwa"
     */

    const student = await studentModel.deleteOne({name : "Vishwa"})
    console.log(student)


}

