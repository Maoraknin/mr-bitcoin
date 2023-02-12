<template>
    <div class="main-container main-layout">
        <UserMsg />
        <ContactsFilter @filter="onSetFilterBy" />
        <RouterLink to="/contact/edit"><button>Add a Contacts</button></RouterLink>
        <ContactsList @remove="removeContacts" v-if="contacts" :contacts="filteredContacts" />
    </div>
</template>

<script>
import { contactService } from '@/services/contact.service.js'
import { bitcoinService } from '@/services/bitcoin.service.js'
import { eventBus } from '@/services/eventBus.service.js'

import ContactsList from '@/cmps/contact-list.vue'
import ContactsFilter from '@/cmps/contact-filter.vue'
import UserMsg from '@/cmps/user-msg.vue'

export default {
    data() {
        return {
            contacts: null,
            filterBy: {},
        }
    },
    async created() {
        this.contacts = await contactService.getContacts()
        
    },
    methods: {
        async removeContacts(contactId) {
            const msg = {
                txt: `Contacts ${contactId} deleted.`,
                type: 'success',
                timeout: 2500,
            }
            await contactService.deleteContact(contactId)
            this.contacts = this.contacts.filter(contact => contact._id !== contactId)
            eventBus.emit('user-msg', msg)
        },
        onSetFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        filteredContacts() {
            const regex = new RegExp(this.filterBy.name, 'i')
            return this.contacts.filter(contact => regex.test(contact.name))
        },
    },
    components: {
        ContactsList,
        ContactsFilter,
        UserMsg,
    },
}
</script>

<style lang="scss">
.main-container {
    position: relative;
}
</style>
