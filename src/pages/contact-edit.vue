<template>
    <form @submit.prevent="save" v-if="contact" class="contact-edit main-layout">
        <input type="text" v-model="contact.name">
        <input type="text" v-model="contact.email">
        <input type="text" v-model.number="contact.phone">
        <button class="primary">Save</button>
        <RouterLink to="/contact"><span class="material-symbols-outlined">close</span></RouterLink>
    </form>
</template>

<script>
import { contactService } from '@/services/contact.service.js'
export default {
    data() {
        return {
            contact: null,
        }
    },
    async created(){
        const contactId = this.$route.params._id
        if(contactId) {
            this.contact = await contactService.getContactById(contactId)
        } else {
            this.contact = contactService.getEmptyContact()
        }
    },
    methods: {
        async save() {
            await contactService.saveContact(this.contact)
            this.$router.push('/contact')
        }
    }
}
</script>

<style lang="scss"></style>
