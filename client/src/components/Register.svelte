<script>
    let email = "";
    let password = "";
    let isLoading = false;
    let isSuccess = false;
    let errors = {};
    const handleSubmit = async () => {
        isLoading = true
        errors = {};
        const result = await fetch("http://localhost:9999/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then((res) => res.json())
        isLoading = false
        if (result.status === "ok") {
          //succeed
        }
        else {
          switch (result.error) {
            case "101":
              errors.Error = "Invalid email."
              break
            case "102":
              errors.Error = "Invalid password."
              break
            case "103":
              errors.Error = "Email is in use."
              break
            case "104":
              errors.Error = "Password must be at least 6 characters."
              break
            default:
              errors.Error = "An unknown error occured."
          }
        }
    };
</script>

<div id="page">
<form on:submit|preventDefault={handleSubmit}>
    {#if isSuccess}
      <div class="success">
        🔓
        <br />
        You've been successfully logged in.
      </div>
    {:else}
      <h1>Register</h1>
  
      <label for="email">Email</label>
      <input name="email" autocomplete="off" placeholder="name@example.com" bind:value={email} />
  
      <label for="password">Password</label>
      <input name="password" autocomplete="off" placeholder="6 Charcter Minimum" type="password" bind:value={password} />
  
      <button type="submit">
        {#if isLoading}Registering...{:else}Register 🔒{/if}
      </button>
      <br/>
      <a href="/#/login">Log In</a>
  
      {#if Object.keys(errors).length > 0}
        <ul class="errors">
          {#each Object.keys(errors) as field}
            <li>{field}: {errors[field]}</li>
          {/each}
        </ul>
      {/if}
    {/if}
  </form>
</div>



<style>
    #page {
        display: block;
        min-height: calc(100% - 75px - 8px);
        height: auto;
        background-color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    a {
      color: var(--black);
      text-decoration: none;
      transition: 0.2s ease all;
    }
    a:hover {
      color: var(--red);
    }
    form {
      background: #fff;
      padding: 50px;
      width: 250px;
      height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 20px 14px 8px rgba(0, 0, 0, 0.58);
    }
    label {
      margin: 10px 0;
      align-self: flex-start;
      font-weight: 500;
    }
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      transition: all 300ms ease-in-out;
      width: 100%;
    }
    input:focus {
      outline: 0;
      border-bottom: 1px solid #666;
    }
    button {
      margin-top: 20px;
      background: black;
      color: white;
      padding: 10px 0;
      width: 200px;
      border-radius: 25px;
      text-transform: uppercase;
      font-weight: bold;
      cursor: pointer;
      transition: all 300ms ease-in-out;
    }
    button:hover {
      transform: translateY(-2.5px);
      box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.58);
    }
    h1 {
      margin: 10px 20px 30px 20px;
      font-size: 40px;
    }
    .errors {
      list-style-type: none;
      padding: 10px;
      margin: 0;
      border: 2px solid #be6283;
      color: #be6283;
      background: rgba(190, 98, 131, 0.3);
    }
    .success {
      font-size: 24px;
      text-align: center;
    }
  </style>