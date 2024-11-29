import { createRouter, createWebHistory } from 'vue-router';
import ClientForm from '@/components/ClientForm.vue'; 
import ClientTable from '@/components/ClientTable.vue'; 

const routes = [
    { path: '/', redirect: '/clients' },
    { path: '/add-client', component: ClientForm },  // Для добавления нового клиента
    { path: '/clients', component: ClientTable }      // Для отображения списка клиентов
];

const router = createRouter({
    history: createWebHistory(), 
    routes,                      
});

export default router; 