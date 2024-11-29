import { createStore } from 'vuex';
import clients from './modules/clients';
import products from './modules/products';

export default createStore({
    modules: {
        clients,
        products,
    },  
});