import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify' ;
const initialState = {
    favItems: []
}

const favSlice = createSlice({
    name:'fav',
    initialState,
    reducers:{
        addToFavItems : (state, action) => {
            let x = state.favItems.findIndex(item => item.name === action.payload.name) 
            if (x === -1) {
                state.favItems.push(action.payload)
                toast.info(`المنتج (${action.payload.name}) تم اضافة الي المفضله `,{
                    position: 'top-center'
                });
            } else {
                toast.error(`تم ازاله المنتج ${action.payload.name} من المفضله`,{
                    position: 'top-center'
                });
                state.favItems.splice(x, 1);   
            }
        }, 
        removeItemsFromFav : (state, action) => {
            let x = state.favItems.filter(item  => item.name !== action.payload.name);
            state.favItems = [...x]
            toast.warning(`تم ازاله المنتج  من المفضله`,{
                position: 'top-center'
            });
        }
    }
})

export default favSlice.reducer;
export const {addToFavItems, removeItemsFromFav} = favSlice.actions;