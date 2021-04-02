<script>
    export let args = "int[] nums"
    export let name = "Question"
    export let return_type = "int[]"
    var code = setCodeBox()
    function setCodeBox() {
        return `public class Solve {
    public ${return_type} ${name}(${args}) {
        
    }
}`
    }
</script>

<div id="page">
    <div id="problem_cont">
        <div id="dir">
            dis 
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