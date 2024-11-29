<template>
    <form @submit.prevent="submit">
        <input v-model="client.name" placeholder="Имя" required />
        <input v-model="client.email" placeholder="Email" required />
        <input v-model="client.phone" placeholder="Телефон" required />
        <button type="submit">Сохранить</button>
    </form>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';

export default {
    data() {
        return {
            client: { id: null, name: '', email: '', phone: '' }
        };
    },
    methods: {
        ...mapActions('clients',['addClient', 'updateClient']),
        
        async submit() {
            if (this.client.id) {
                await this.updateClient(this.client);
            } else {
                await this.addClient(this.client);
            }
            this.resetForm();
            this.$router.push('/clients'); // Возврат на страницу списка клиентов
        },

        resetForm() {
            this.client = { id: null, name: '', email: '', phone: '' }; // Сброс формы
        },

        async fetchClientData() {
            const clientId = this.$route.query.id;
            if (clientId) {
                const response = await axios.get(`http://localhost:3000/clients/${clientId}`);
                this.client = response.data; // Загружаем данные клиента для редактирования
            }
        }
    },
    created() {
        this.fetchClientData(); // Загружаем данные клиента при создании компонента
    }
};
</script>

