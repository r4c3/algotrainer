const User = require("./models/user")
const express = require("express")
const path = require("path")
const cors = require("cors")
const tests = require("./tests.json")
const vm = require("vm")

const app = express()

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
        if (result.globalVar[0] != question.o1) {
            return res.json({status: "incorrect", error: "200", tried: question.t1, expected: question.o1, got: result.globalVar[0]})
        }
        if (result.globalVar[1] != question.o2) {
            return res.json({status: "incorrect", error: "201", tried: question.t2, expected: question.o2, got: result.globalVar[1]})
        }
        if (result.globalVar[2] != question.o3) {
            return res.json({status: "incorrect", error: "202", tried: question.t3, expected: question.o3, got: result.globalVar[2]})
        }
        return res.json({status: "ok", data: "correct submission"})
    }
    catch (e) {
        return res.json({status: "error", data: [e.name, e.message]})
    }
})

console.log("port 9999")
app.listen(9999)