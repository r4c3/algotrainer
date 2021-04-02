<script>
    export let qid
    export let qname
    export let qdiff

</script>

<a href="/#/problem/{qid}">
    <div id="bar">
        <p>ID: {qid}</p>
        {#if (qdiff == 0)}
            <p id="ve">Very Easy</p>
        {:else if (qdiff == 1)}
            <p id="ea">Easy</p>
        {:else if (qdiff == 2)}
            <p id="me">Medium</p>
        {:else}
            <p id="ha">Hard</p>
        {/if}
    </div>
</a>

<a href="/#/problem/{qid}"><p id="qname">{qname}</p></a>

<style>
    a {
        text-decoration: none;
        color: var(--black);
    }
    #bar {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin: 12px 0px;
        background-color: var(--white);
        padding: 4px;
        transition: 0.2s ease all;
    }
    p {
        user-select: none;
    }
    #ve {
        background-color: rgb(128, 212, 218);
        border-radius: 8px;
        padding: 4px;
    }
    #ea {
        background-color: rgb(128, 218, 128);
        border-radius: 8px;
        padding: 4px;
    }
    #me {
        background-color: rgb(233, 182, 88);
        border-radius: 8px;
        padding: 4px;
    }
    #ha {
        background-color: rgb(228, 119, 119);
        border-radius: 8px;
        padding: 4px;
    }
    #qname {
        font-weight: bold;
        position: absolute;
        left: 50%;
        transform: translateX(-50%) translateY(-130%);
        transition: 0.2s ease all;
        width: 500px;
        height: 30px;
        text-align: center;
    }
    #qname:hover {
        color: var(--red);
    }
</style>