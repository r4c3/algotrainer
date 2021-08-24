<script>
    let burger_clicked = false
    let nav_height = "90px"
    let bar_rotation = "0deg"
    function toggleBurgerMenu() {
        if (burger_clicked) {
            let page = document.getElementById("page")
            page.style.minHeight = "calc(100% - 90px - 8px)"
            burger_clicked = false
            nav_height = "90px"
        }
        else {
            document.body.style.overflow = "initial"
            let page = document.getElementById("page")
            page.style.minHeight = "calc(100% - 140px - 8px)"
            burger_clicked = true
            nav_height = "140px"
        }
    }
</script>

<nav style="--nav_height: {nav_height}; --bar_rotation: {bar_rotation}">
    <div>
        {#if burger_clicked}
            <ul on:click={burger_clicked = false, toggleBurgerMenu()}>
                <li><a href="/#/">Home</a></li>
                <li><a href="/#/problems">All Problems</a></li>
                <li><a href="https://github.com/r4c3/algotrainer">Contribute (GitHub)</a></li>
            </ul>
        {:else}
        <a href="/#/"><h1>AlgoTrainer</h1></a>
        {/if}
        <div class="burger" on:click={() => (toggleBurgerMenu())}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</nav>

<style>
    nav {
        width: 100%;
        height: var(--nav_height);
        border-bottom: 6px solid var(--red);
        background-color: #fcfcfc;
        transition: 0.5s ease all;
    }
    nav div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 90%;
        height: 100%;
        margin: 0 auto;
    }
    h1 {
        font-size: 2rem;
    }
    .burger {
        display: flex;
        flex-direction: column;
        height: 30px;
        width: auto;
        margin: 0;
    }
    .burger:hover {
        cursor: pointer;
    }
    .burger:hover div {
        background-color: var(--red);
    }
    .burger div {
        height: 4px;
        width: 35px;
        background-color: var(--black);
        transition: 0.3s ease all;
    }
    
    ul {
        list-style: none;
        transform: translateY(-2px);
    }
    li {
        margin: 12px 0px;
        font-size: 22px;
    }
    a {
        text-decoration: none;
        color: var(--black);
        transition: 0.2s ease all;
        font-weight: bold;
    }
    a:hover {
        color: var(--red);
    }
</style>