import {configureStore} from '@reduxjs/toolkit';
import popUp from './popUpSlice'; 
import categ from './categorySlice';
import card from './CardSlice';
import fav from './favSlice';
import search from './searchSlice'
export default configureStore({
        reducer:{
            popUp,
            categ,
            card,
            fav,
            search
        }
})
