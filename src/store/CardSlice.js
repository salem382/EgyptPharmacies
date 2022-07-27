import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify' ;
const initialState = {
    cartItems:[],
    quantity : 0,
    amount :0
}

const cardSlice = createSlice({
    name:'card',
    initialState,
    reducers:{
        addItemToCarElement : (state, action) => {
            state.cartItems.push({...action.payload,count : 1});
            toast.info(`المنتج ${state.cartItems[0].name} تم اضافته الي العربه `,{
                position: 'top-center'
            });
        },
        increaseCartItems : (state,action) => {
            let exist = state.cartItems.findIndex(it => it.name === action.payload.name);
            state.cartItems[exist].count ++;
            toast.info(`المنتج (${state.cartItems[0].name}) تم زيادته الي العربه `,{
                position: 'top-center'
            });
        },
        decreaseCartItems : (state, action) => {
            let exist = state.cartItems.findIndex(it => it.name === action.payload.name);

            if (state.cartItems[exist].count > 1) {
                state.cartItems[exist].count --;
                toast.warning(`المنتج (${state.cartItems[0].name})تم خفض عدده`,{
                    position: 'top-center'
                });
            } else {
                let x = [...state.cartItems];
                toast.error(`المنتج (${state.cartItems[exist].name})تم ازالته من العربه`,{
                    position: 'top-center'
                });
                x.splice(exist, 1);
                state.cartItems = [...x];
                
            }
        },
        collectNewData:(state) => {
            let {totalAmount, totalQuantity} = state.cartItems.reduce((totalTemp,item) => {
                const total = item.price * item.count;
                totalTemp.totalAmount += total;
                totalTemp.totalQuantity += item.count;
                return totalTemp;
            },{
                totalAmount : 0,
                totalQuantity : 0
            });
            state.amount = totalAmount;
            state.quantity = totalQuantity;
        },
        deleteItem : (state, action) => {
            let i = state.cartItems.findIndex(item => item.name === action.payload.name);
            let x = [...state.cartItems];
            toast.error(`المنتج (${state.cartItems[i].name})تم ازالته من العربه`,{
                position: 'top-center'
            });
            x.splice(i, 1);
            state.cartItems = [...x];
        }, 
        getTotalPrice : (state) => {
            state.cartItems.forEach((item, ind) => {
                let x = item.count * item.price;
                state.cartItems[ind].total = x;
            })
        },
        clearData : (state) => {
            state.cartItems = [];
            toast.error('تمت ازالة جميع عناصر العربه',{
                position: 'top-center'
            });
        }
    }
})

export default cardSlice.reducer;
export const {addItemToCarElement, increaseCartItems, decreaseCartItems, deleteItem, clearData, collectNewData, getTotalPrice} = cardSlice.actions;