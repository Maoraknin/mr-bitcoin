<template>
  <div v-if="contact" class="contact-details main-layout">
    <img :src="'https://robohash.org/' + contact.name + '?set=set5'" alt="" />
    <!-- <img :src="'https://api.dicebear.com/5.x/open-peeps/svg?seed=' + contact.name" alt=""> -->
    <div class="info-container">
      <h2>{{ contact.name }}</h2>
      <h3>Email: {{ contact.email }}</h3>
      <h3>Phone: {{ contact.phone }}</h3>
      <RouterLink class="close-btn" to="/contact"
        ><span class="material-symbols-outlined">close</span></RouterLink
      >
      <a class="delete-btn" @click="removeContact(contact._id)"
        >Delete contact</a
      >
    </div>
  </div>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
import { eventBus } from "@/services/eventBus.service.js";

export default {
  data() {
    return {
      contact: null,
    };
  },
  async created() {
    const contactId = this.$route.params._id;
    this.contact = await contactService.getContactById(contactId);
  },
  methods: {
    async removeContact(contactId) {
      const msg = {
        txt: `Contacts ${contactId} deleted.`,
        type: "success",
        timeout: 2500,
      };
      await contactService.deleteContact(contactId);
      this.$router.push("/contact");
      eventBus.emit("user-msg", msg);
    },
  },
};
</script>

<style lang="scss"></style>
