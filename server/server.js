const User = require("./models/user")
const express = require("express")
const path = require("path")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tests = require("./tests.json")
const vm = require("vm")

const app = express()

const JWT_SECRET = "Living off bo#$rrowed timesDJKFHsfun38urn8yfn7238@n7%92f$#3m)&*8smdofuf2n8y39y7nf3yasddsa471157925793"

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

app.post('/api/solve', async (req, res) => {
    const { code_to_submit, qid } = req.body
    const question = tests.tests[qid - 1]
    let code = code_to_submit
    code += "\n\n"
    code += `let a = Solve(${question.t1})\n`
    code += `let b = Solve(${question.t2})\n`
    code += `let c = Solve(${question.t3})\n`
    code += `globalVar = [a, b, c]`
    try {
        const script = new vm.Script(code)
        let result = {}
        script.runInNewContext(result)
        console.log(result)
        let valid = true
        if (result.globalVar[0] != question.o1) {
            return res.json({status: "incorrect", error: "200", tried: question.t1, expected: question.o1, got: result.globalVar[0]})
        }
        if (result.globalVar[1] != question.o2) {
            return res.json({status: "incorrect", error: "201", tried: question.t2, expected: question.o2, got: result.globalVar[1]})
        }
        if (result.globalVar[2] != question.o3) {
            return res.json({status: "incorrect", error: "202", tried: question.t3, expected: question.o3, got: result.globalVar[2]})
        }
        await User.updateOne
        return res.json({status: "ok", data: "correct submission"})
    }
    catch (e) {
        return res.json({status: "error", data: [e.name, e.message]})
    }
})

app.post('/api/changepw', async (req, res) => {
    const { new_password: plain, token } = req.body

    if (!plain || typeof plain !== "string") {
        return res.json({status: "error", error: "108"})
    }
    if (plain.length < 6) {
        return res.json({status: "error", error: "109"})
    }

    const hashed_password = await bcrypt.hash(plain, 11)
    
    try {
        const user = jwt.verify(token, JWT_SECRET)
        const _id = user.id

        await User.updateOne({ _id }, {
            $set: { password: hashed_password }
        })
        res.json({status: "ok"})
    }
    catch {
        res.json({status: "error", error: "107"})
    }
})

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).lean()

    if (!user) {
        return res.json({ status: "erorr", error: "105"})
    }

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({
            id: user._id, email: user.email
        }, JWT_SECRET)
        console.log("in")
        return res.json({ status: "ok", data: token})
    }

    res.json({status: "error", data: "106"})
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