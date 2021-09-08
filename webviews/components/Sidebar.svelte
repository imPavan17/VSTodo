<script>
    import { onMount } from "svelte";

    let todos = [];
    let loading = true;
    let user = null;
    let accessToken = null;
    onMount(() => {
        window.addEventListener("message", async(e) => {
            const message = e.data; // the data that the extension sent
            console.log(message);
            switch (message.type) {
                case 'new-todo':
                    todos = [{ text: message.value }, ...todos];
                    break;
                case 'token': 
                    accessToken = message.value;
                    const res = await fetch('http://localhost:3002/me', {
                        headers: {
                            authorization: `Bearer ${accessToken}`
                        }
                    });
                    const data = await res.json();
                    user = data.user;
                    loading = false;
            }
        });

        tsvscode.postMessage({type: 'get-token', value: undefined})
    })
</script>

{#if loading}
    <div>loading....</div>
{:else if user} 
    <pre>{JSON.stringify(user)}</pre>
{:else}
    <pre>No user login</pre>
{/if}

<div>
    {#each todos as todo}
        <p>{todo.text}</p>
    {/each}
</div>

<button on:click={() => {
    tsvscode.postMessage({
        type: "onInfo",
        value: "Info pop up"
    })
}}>
    Click me for info
</button>

<button on:click={() => {
    tsvscode.postMessage({
        type: "onError",
        value: "Error pop up"
    })
}}>
    Click me for Error
</button>