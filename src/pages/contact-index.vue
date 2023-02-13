<template>
  <div class="contact-index main-layout full">
    <ContactsFilter @filter="onSetFilterBy" />
    <RouterLink class="add-link" to="/contact/edit"
      ><button class="primary">Add a Contacts</button></RouterLink
    >
    <ContactsList
      @remove="removeContact"
      v-if="contacts"
      :contacts="contacts"
    />
  </div>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
import { eventBus } from "@/services/eventBus.service.js";

import ContactsList from "@/cmps/contact-list.vue";
import ContactsFilter from "@/cmps/contact-filter.vue";

export default {
  data() {
    return {
      contacts: null,
      filterBy: {},
    };
  },
  async created() {
    this.loadContacts();
  },
  methods: {
    async loadContacts() {
      this.contacts = await contactService.getContacts(this.filterBy);
    },
    async removeContact(contactId) {
      const msg = {
        txt: `Contacts ${contactId} deleted.`,
        type: "success",
        timeout: 2500,
      };
      await contactService.deleteContact(contactId);
      this.contacts = this.contacts.filter(
        (contact) => contact._id !== contactId
      );
      eventBus.emit("user-msg", msg);
    },
    onSetFilterBy(filterBy) {
      this.filterBy = filterBy;
      this.loadContacts();
    },
  },
  components: {
    ContactsList,
    ContactsFilter,
  },
};
</script>

<style lang="scss"></style>
