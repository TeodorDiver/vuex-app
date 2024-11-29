import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = 'http://localhost:3000/clients';

export default createStore({
    state: {
        clients: [],
        filteredClients: [],
        pagination: {
            currentPage: 1,
            pageSize: 10,
        },
    },
    mutations: {
        SET_CLIENTS(state, clients) {
            state.clients = clients;
            state.filteredClients = clients;
        },
        ADD_CLIENT(state, client) {
            state.clients.push(client);
            state.filteredClients.push(client);
        },
        UPDATE_CLIENT(state, updatedClient) {
            const index = state.clients.findIndex(client => client.id === updatedClient.id);
            if (index !== -1) {
                state.clients[index] = updatedClient;
                state.filteredClients[index] = updatedClient;
            }
        },
        DELETE_CLIENT(state, clientId) {
            state.clients = state.clients.filter(client => client.id !== clientId);
            state.filteredClients = state.filteredClients.filter(client => client.id !== clientId);
        },
        FILTER_CLIENTS(state, name) {
            const lowerCaseName = name.toLowerCase();
            state.filteredClients = state.clients.filter(client => client.name.toLowerCase().includes(lowerCaseName));
        },
    },
    actions: {
        async fetchClients({ commit }) {
            const response = await axios.get(API_URL);
            commit('SET_CLIENTS', response.data);
        },
        async addClient({ commit }, client) {
            const response = await axios.post(API_URL, {
                name: client.name,
                email: client.email,
                phone: client.phone
            });
            commit('ADD_CLIENT', response.data); // Коммитим добавленного клиента
        },
        async updateClient({ commit }, client) {
            const response = await axios.put(`${API_URL}/${client.id}`, client);
            commit('UPDATE_CLIENT', response.data); // Коммитим обновленного клиента
        },
        async deleteClient({ commit }, clientId) {
            try {
                await axios.delete(`${API_URL}/${clientId}`);
                commit('DELETE_CLIENT', clientId); // Удаляем клиента из состояния
            } catch (error) {
                console.error('Ошибка при удалении клиента:', error);
            }
        },
    },
});