<script>
    export let links
</script>

<nav class="sticky top-0 bg-emerald-900 py-2 px-4" style="height:40px;">
    <ul class="flex flex-row space-x-4 justify-end">
        {#each links as link}
            <li><a class="text-white" href={link.url}>{link.name}</a></li>
        {/each}
    </ul>
</nav>