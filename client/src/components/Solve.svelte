<script>
    export let params = {}
    const qjson = require("./problems.json")
    const qdata = qjson.problems[Number(params.qid) - 1]
    const function_name = qdata.qname.replace(/ /g, "_")
    console.log(function_name)
    const code = `public class Solve {
    public ${qdata.return_type} ${function_name}(${qdata.args}) {
        
    }
}`
</script>

<div id="page">
    <div id="problem_cont">
        <div id="dir">
            <h3>{qdata.qname}</h3><br/>
            <p>{qdata.dirs}</p><br/>
        </div>
        <div id="code">
            <textarea id="type_code" name="type_code" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">{code}</textarea>
        </div>
        <button>Submit</button>
        <button>Run</button>
        <button type="reset" for="type_code">Reset</button>
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
    #code {
        height: auto;
    }
    #type_code {
        min-height: 500px;
        width: 100%;
    }
</style>