<script>
    export let params = {}
    const qjson = require("./problems.json")
    const qid = Number(params.qid)
    const qdata = qjson.problems[qid - 1]
    const function_name = qdata.qname.replace(/ /g, "_")
    const code = `function Solve(${qdata.args}) {
    
};`
    let resp = "This text will update when you submit code."
    let last_solved = "Never"
    let type_code
    function resetCode() {
        type_code.value = code
    }
    async function sendCode() {
        let code_to_submit = type_code.value
        const result = await fetch("http://localhost:9999/api/solve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code_to_submit,
                qid
            })
        }).then((res) => res.json())
        if (result.status == "ok") {
            resp = `Good Job! Your submission passed all test cases.`
        }
        else if (result.status == "incorrect") {
            resp = `Your submission failed at least one test case.<br/>Test Input: ${result.tried}<br/>Expected Output: ${result.expected}<br/>Observed Output: ${result.got}`
        }
        else {
            resp = `Your code exited with an error.</br><b>${result.data[0]}</b>: ${result.data[1]}.`
        }
    }
</script>

<div id="page">
    <div id="problem_cont">
        <div id="dir">
            <div id="head"><h2>{qdata.qname}</h2>Last Solved: {last_solved}</div>
            <p><b>Directions:</b> {qdata.dirs}</p>
            <p><b>Example Input 1:</b> {qdata.ei1}</p>
            <p><b>Example Output 1:</b> {qdata.eo1}</p>
            <p><b>Example Input 2:</b> {qdata.ei2}</p>
            <p><b>Example Output 2:</b> {qdata.eo2}</p><br/>
            <h3>Your Code:</h3>
        </div>
        <div id="code">
            <textarea class="spad" bind:this={type_code} id="type_code" name="type_code" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">{code}</textarea>
        </div>
        <button on:click={sendCode}>Submit</button>
        <button on:click={resetCode}>Reset</button>
        <h3>Server Response:</h3>
        <div id="resp" class="spad">
            {@html resp}
        </div>
    </div>
</div>

<style>
    #page {
        min-height: calc(100% - 75px - 8px);
        height: auto;
        background-color: var(--white);
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }
    #problem_cont {
        background: #fff;
        padding: 12px;
        width: 500px;
        margin: 100px 0px;
        height: auto;
        display: block;
        box-shadow: 0px 10px 14px 8px rgba(0, 0, 0, 0.58);
    }
    #head {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    #code {
        height: auto;
    }
    #type_code {
        min-height: 500px;
        margin: 10px 0px;
        resize: none;
    }
    #resp {
        min-height: 500px;
        margin: 10px 0px;
        border: 1px solid black;
        border-radius: 3px;
        font-family: monospace;
    }
    button {
        padding: 2px;
        margin: 8px 4px 8px 0px
    }
    p {
        margin: 6px 0px;
    }
    .spad {
        padding: 4px;
        width: calc(100% - 8px);
    }
</style>