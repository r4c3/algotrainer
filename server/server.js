const User = require("./models/user")
const express = require("express")
const path = require("path")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const app = express()

mongoose.connect("mongodb://localhost/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("db connected"))


app.use(express.json())
app.use(cors())
app.use("/", express.static(path.join(__dirname, "staitc")))
app.use(express.urlencoded({extended: true}))

app.post("/api/login", async (req, res) => {
    res.json({status: "ok", data: "coming"})
})

app.post("/api/register", async (req, res) => {
    const { email, password: plain } = req.body

    const email_test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || typeof email !== "string" || !email_test.test(String(email).toLowerCase())) {
        return res.json({status: "error", error: "101"})
    }
    if (!plain || typeof plain !== "string") {
        return res.json({status: "error", error: "102"})
    }
    if (plain.length < 6) {
        return res.json({status: "error", error: "104"})
    }

    const password = await bcrypt.hash(plain, 11)
    
    try {
        const response = await User.create({
            email,
            password
        })
    }
    catch (error) {
        if (error.code === 11000) {
            return res.json({status: "error", error: "103"})
        }
        throw error
    }
    
    res.json({status: "ok"})
})

app.listen(9999)