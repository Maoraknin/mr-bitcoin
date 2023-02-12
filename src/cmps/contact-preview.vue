<template>
    <article>
        <p>{{ contact.name }}</p>
        <p>{{ contact.email }}</p>
        <p>{{ contact.phone }}</p>
    </article>
</template>

<script>
export default {
    props: {
        contact: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style lang="scss"></style>
