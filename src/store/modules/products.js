import axios from 'axios';

const API_URL = 'http://localhost:3000/products';

const state = {
    products: [],
    filteredProducts: [],
    pagination: {
        currentPage: 1,
        pageSize: 10,
    },
};

const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products;
        state.filteredProducts = products;
    },
    ADD_PRODUCT(state, product) {
        state.products.push(product);
        state.filteredProducts.push(product);
    },
    UPDATE_PRODUCT(state, updatedProduct) {
        const index = state.products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
            state.products[index] = updatedProduct;
            state.filteredProducts[index] = updatedProduct;
        }
    },
    DELETE_PRODUCT(state, productId) {
        state.products = state.products.filter(product => product.id !== productId);
        state.filteredProducts = state.filteredProducts.filter(product => product.id !== productId);
    },
    FILTER_PRODUCTS(state, filter) {
        const lowerCaseFilter = filter.toLowerCase();
        state.filteredProducts = state.products.filter(product => 
            product.name.toLowerCase().includes(lowerCaseFilter)
        );
    },
};

const actions = {
    async fetchProducts({ commit }) {
        const response = await axios.get(API_URL);
        commit('SET_PRODUCTS', response.data);
    },
    async addProduct({ commit }, product) {
        const response = await axios.post(API_URL, product);
        commit('ADD_PRODUCT', response.data);
    },
    async updateProduct({ commit }, product) {
        const response = await axios.put(`${API_URL}/${product.id}`, product);
        commit('UPDATE_PRODUCT', response.data);
    },
    async deleteProduct({ commit }, productId) {
        await axios.delete(`${API_URL}/${productId}`);
        commit('DELETE_PRODUCT', productId);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};