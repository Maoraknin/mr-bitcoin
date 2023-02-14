<template>
  <header class="app-header full main-layout">
    <div className="header-container">
      <div class="logo-container">
        <img src="../assets/img/bitcoin-logo.svg" alt="" />
        <h2><RouterLink @click="toggleNavbar" to="/" class="logo">Mr.Bitcoin</RouterLink></h2>
      </div>
      <span class="material-symbols-outlined menu-btn" @click="toggleNavbar">menu</span>

      <div class="user-info">
        <span v-if="user">{{ user.name }}</span>
      </div>
      <span class="rate" v-if="rate">1$ = {{ rate }}₿</span>
      <nav ref="nav">
        <RouterLink @click="toggleNavbar" to="/home">Home</RouterLink>
        <RouterLink @click="toggleNavbar" to="/contact">Contacts</RouterLink>
        <RouterLink @click="toggleNavbar" to="/stats">Stats</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script>
import { userService } from "../services/user.service.js";
import { bitcoinService } from "../services/bitcoin.service.js";
export default {
  data() {
    return {
      user: null,
      rate: null,
    };
  },
  async created() {
    this.rate = await bitcoinService.getRate();
    this.user = await userService.getLogedUser()
  },
  methods: {
    toggleNavbar() {
      this.$refs.nav.classList.toggle("menu-open")
    },
  },
};
</script>
