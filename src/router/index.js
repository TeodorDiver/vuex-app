import { createRouter, createWebHistory } from 'vue-router';
import ClientForm from '@/components/ClientForm.vue'; 
import ClientTable from '@/components/ClientTable.vue'; 
import ProductForm from '@/components/ProductForm.vue';
import ProductTable from '@/components/ProductTable.vue';

const routes = [
    { path: '/', redirect: '/clients' },
    { path: '/add-client', component: ClientForm },
    { path: '/clients', component: ClientTable },
    { path: '/add-product', component: ProductForm },
    { path: '/products', component: ProductTable }
];

const router = createRouter({
    history: createWebHistory(), 
    routes,                      
});

export default router; 