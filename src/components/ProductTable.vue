<template>
    <div>
        <input v-model="filter" placeholder="Фильтр по наименованию" @input="filterProducts" />

        <table>
            <thead>
                <tr>
                    <th>Наименование</th>
                    <th>Цена</th>
                    <th>Вес</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in paginatedProducts" :key="product.id">
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.weight }}</td>
                    <td>
                        <button @click="editProduct(product)">Редактировать</button>
                        <button @click="deleteProduct(product.id)">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="addProduct">Добавить продукт</button>
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
        ...mapState('products', ['filteredProducts', 'pagination']),
        paginatedProducts() {
            const start = (this.pagination.currentPage - 1) * this.pagination.pageSize;
            return this.filteredProducts.slice(start, start + this.pagination.pageSize);
        },
        totalPages() {
            return Math.ceil(this.filteredProducts.length / this.pagination.pageSize);
        }
    },
    methods: {
        ...mapActions('products', ['fetchProducts', 'deleteProduct']),

        filterProducts() {
            this.$store.commit('products/FILTER_PRODUCTS', this.filter);
        },

        editProduct(product) {
            this.$router.push({ path: '/add-product', query: { id: product.id } });
        },

        addProduct() {
            this.$router.push('/add-product');
        },

        async deleteProduct(productId) {
            await this.$store.dispatch('products/deleteProduct', productId);
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
        this.fetchProducts();
    }
};
</script>

<style scoped>
.pagination {
    margin-top: 20px;
}
</style>