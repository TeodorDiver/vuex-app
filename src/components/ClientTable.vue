<template>
    <div>
        <input v-model="filter" placeholder="Фильтр по имени" @input="filterClients" />

        <table>
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Телефон</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="client in paginatedClients" :key="client.id">
                    <td>{{ client.name }}</td>
                    <td>{{ client.email }}</td>
                    <td>{{ client.phone }}</td>
                    <td>
                        <button @click="editClient(client)">Редактировать</button>
                        <button @click="deleteClient(client.id)">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="addClient">Добавить клиента</button>
        <div class="pagination">
            <button @click="prevPage" :disabled="pagination.currentPage === 1">Назад</button>
            <span>Страница {{ pagination.currentPage }} из {{ totalPages }}</span>
            <button @click="nextPage" :disabled="pagination.currentPage === totalPages">Вперед</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';


export default {
    data() {
        return { filter: '' };
    },
    computed: {
        ...mapState(['filteredClients', 'pagination']),
        paginatedClients() {
            const start = (this.pagination.currentPage - 1) * this.pagination.pageSize;
            return this.filteredClients.slice(start, start + this.pagination.pageSize);
        },
        totalPages() {
            return Math.ceil(this.filteredClients.length / this.pagination.pageSize);
        }
    },
    methods: {
        ...mapActions(['fetchClients', 'deleteClient']),

        filterClients() {
            this.$store.commit('FILTER_CLIENTS', this.filter);
        },

        editClient(client) {
            this.$router.push({ path: '/add-client', query: { id: client.id } });
        },

        addClient() {
            this.$router.push('/add-client');
        },

        async deleteClient(clientId) {

            await this.$store.dispatch('deleteClient', clientId);

        },

        prevPage() {
            if (this.pagination.currentPage > 1) {
                this.pagination.currentPage--;
            }
        },

        nextPage() {
            if (this.pagination.currentPage < this.totalPages) {
                this.pagination.currentPage++;
            }
        }
    },
    created() {
        this.fetchClients();
    }
};
</script>

<style scoped>
.pagination {
    margin-top: 20px;
}
</style>