<script>
    export let params = {}
    const qjson = require("./problems.json")
    const qdata = qjson.problems[Number(params.qid) - 1]
    const function_name = qdata.qname.replace(/ /g, "_")
    const code = `public class Solve {
    public ${qdata.return_type} ${function_name}(${qdata.args}) {
        
    }
}`
    let resp = "This text will update when you submit code."
    let last_solved = "Never"
    let type_code
    function resetCode() {
        type_code.value = code
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
            <textarea bind:this={type_code} id="type_code" name="type_code" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">{code}</textarea>
        </div>
        <button>Submit</button>
        <button on:click={resetCode}>Reset</button>
        <h3>Server Response:</h3>
        <div id="resp">
            {resp}
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
        width: 100%;
        margin: 10px 0px;
        resize: none;
    }
    #resp {
        min-height: 500px;
        width: 100%;
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
</style>