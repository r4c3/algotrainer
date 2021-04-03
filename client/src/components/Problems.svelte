<script>
    const problem_data = require("./problems.json")
    const { default: ProblemBar } = require("./sub/ProblemBar.svelte")
    const problems = problem_data.problems
    console.log(problems)
</script>

<div id="page">
    <div id="problem_cont">
        {#each problems as { qid, qname, qdiff }}
            <ProblemBar qid={qid} qname={qname} qdiff={qdiff}/>
        {/each}
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
</style>