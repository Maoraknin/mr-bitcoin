<template>
  <article>
    <!-- <img :src="'https://robohash.org/' + contact.name" alt="" /> -->
    <img :src="'https://api.dicebear.com/5.x/open-peeps/svg?seed=' + contact.name" alt="">
    <p>{{ contact.name }}</p>
  </article>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
