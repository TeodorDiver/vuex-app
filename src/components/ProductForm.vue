<template>
    <form @submit.prevent="submit">
        <input v-model="product.name" placeholder="Наименоване" required />
        <input v-model="product.price" placeholder="Цена" required />
        <input v-model="product.weight" placeholder="Вес" required />
        <button type="submit">Сохранить</button>
    </form>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';

export default {
    data() {
        return {
            product: { id: null, name: '', price: '', weight: '' }
        };
    },
    methods: {
        ...mapActions('products', ['addProduct', 'updateProduct']),

        async submit() {
            if (this.product.id) {
                await this.updateProduct(this.product);
            } else {
                await this.addProduct(this.product);
            }
            this.resetForm();
            this.$router.push('/products');
        },

        resetForm() {
            this.product = { id: null, name: '', price: '', weight: '' };
        },

        async fetchProductData() {
            const productId = this.$route.query.id;
            if (productId) {
                const response = await axios.get(`http://localhost:3000/products/${productId}`);
                this.product = response.data;
            }
        }
    },
    created() {
        this.fetchProductData();
    }
};
</script>
