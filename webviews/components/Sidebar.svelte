<script>
    import { onMount } from "svelte";

    let todos = [];

    onMount(() => {
        window.addEventListener("message", (e) => {
            const message = e.data; // the data that the extension sent
            console.log(message);
            switch (message.type) {
                case 'new-todo':
                todos = [{ text: message.value }, ...todos];
                break;
            }
        })
    })
</script>

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