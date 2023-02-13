<template>
  <form @submit.prevent="save" v-if="contact" class="contact-edit main-layout">
    <h2>{{getTitle}}</h2>
    <img :src="'https://robohash.org/' + contact.name" alt="" />
    <input
      type="text"
      v-model="contact.name"
      placeholder="Enter contact name"
    />
    <input
      type="text"
      v-model="contact.email"
      placeholder="Enter contact email"
    />
    <input
      type="text"
      v-model.number="contact.phone"
      placeholder="Enter contact phone"
    />
    <button class="primary">Save</button>
    <RouterLink to="/contact"
      ><span class="material-symbols-outlined">close</span></RouterLink
    >
  </form>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
export default {
  data() {
    return {
      contact: null,
    };
  },
  async created() {
    const contactId = this.$route.params._id;
    if (contactId) {
      this.contact = await contactService.getContactById(contactId);
    } else {
      this.contact = contactService.getEmptyContact();
    }
  },
  methods: {
    async save() {
      await contactService.saveContact(this.contact);
      this.$router.push("/contact");
    },
  },
  computed: {
    getTitle(){
        return (this.contact._id? `Edit ${this.contact.name}` : 'Add new contact')
    }
  }
};
</script>

<style lang="scss"></style>
