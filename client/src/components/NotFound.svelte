<script>
    let qid_array = ["0001", "0002", "0003", "0004"]
    let random_index = Math.floor(Math.random() * qid_array.length);
    let random_qid = qid_array[random_index]
</script>

<div id="page">
    <h1>Error 404: Page Not Found</h1>
    <p>Use the navigation bar to visit an existing page, or <a href="/#/problem/{random_qid}">click here to go to a random problem</a>.</p>
</div>

<style>
    #page {
        min-height: calc(100% - 75px - 8px);
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: var(--white);
        transition: 0.3s ease all;
    }
    a {
        color: var(--black);
        text-decoration: none;
        transition: 0.3s ease all;
    }
    a:hover {
        color: var(--red);
    }
</style>