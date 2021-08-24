<script>
</script>

<div id="page">
    <h1>The free platform to study data structures and algorithms in JavaScript.</h1>
    <a href="/#/problems"><button><h1 style="text-decoration: none;">View Problems</h1></button></a>
</div>

<style>
    #page {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: calc(100% - 75px - 8px);
        height: auto;
        background-color: var(--white);
        padding: 40px;
    }
    h1 {
        font-size: 100px;
        text-align: center;
        transition: 0.2s ease all;
    }
    button {
        background-color: var(--black);
        border-radius: 8px;
        font-size: 20px;
        font-weight: 700;
        color: var(--white);
        padding: 38px;
        cursor: pointer;
    }
    button:hover h1 {
        color: var(--red);
    }
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 48px 0px;
        width: 50%;
        text-decoration: none;
    }
</style>