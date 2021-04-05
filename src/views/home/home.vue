<template>
    <div class="home">Homepage</div>
</template>

<script lang="ts">
export default {
    name: 'Home',
    setup(): void {
        console.log(process.env.NODE_ENV);
    },
};
</script>
