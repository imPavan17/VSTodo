<script>
    // export let tsvscode;
</script>

<div>

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