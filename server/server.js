const express = require("express")
const path = require("path")
const cors = require("cors")
const mongoose = require("mongoose")
const User = require("./model/user")
const bcrypt = require("bcryptjs")

mongoose.connect("mongodb://localhost:27017/login-app-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const app = express()

app.use(express.json())
app.use(cors())
app.use("/", express.static(path.join(__dirname, "staitc")))
app.use(express.urlencoded({extended: true}))

app.post("/api/auth", async (req, res) => {
    const { email, password: plain } = req.body
    const password = await bcrypt.hash(password, 11)
    
    try {
        const response = await User.create({
            email,
            password
        })
        console.log(response)
    }
    catch (error) {
        console.log(error)
        return res.json({status: "error"})
    }
    
    res.json({status: "ok"})

})

app.listen(9999)