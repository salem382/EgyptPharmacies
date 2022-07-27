import {msknat, alryadyaa, kohaa, otoar, sahatAlrajal, shaar} from '../appData'
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    itemsObj : {
        msknat:msknat,
        alryadyaa:alryadyaa,
        kohaa:kohaa,
        otoar:otoar,
        sahatAlrajal:sahatAlrajal,
        shaar:shaar
    },
    items:[],
    dependcyArr:[]
}

const categorySlice = createSlice({
    name:'cat',
    initialState,
    reducers:{
        openCate : (state, action) => {
            state.items = [];
            state.dependcyArr = [];
            state.dependcyArr.push(action.payload);
            let x = JSON.parse(JSON.stringify(state.itemsObj[action.payload]));
            state.items.push(...x);
            localStorage.setItem('depArr',JSON.stringify(state.dependcyArr));
        },
        handleCheckBox : (state, action) => {
            let i = state.dependcyArr.indexOf(action.payload);
            if (i === -1) {
                state.dependcyArr.push(action.payload)
            } else {
                state.dependcyArr.splice(i, 1);
            }
            let x = [];
            state.dependcyArr.forEach((ele) => {
                let y = JSON.parse(JSON.stringify(state.itemsObj[ele]));
                x.push(...y);
            })
            state.items = [...x]
            localStorage.setItem('depArr',JSON.stringify(state.dependcyArr));
        },
        search : (state, action) => {
            let x = [];
            state.dependcyArr.forEach((ele) => {
                let y = JSON.parse(JSON.stringify(state.itemsObj[ele]));
                x.push(...y);
            })
            state.items = [...x]
            let y = [...action.payload];
            
            let z = JSON.parse(JSON.stringify(state.items.filter(item => Number(item.price) >= Number(y[0]) && Number(item.price) <= Number(y[1])   )));
            state.items = [...z]
            localStorage.setItem('depArr',JSON.stringify(state.dependcyArr));
        },
        refreshPage : (state) => {
           let myItem =   JSON.parse(localStorage.getItem('depArr'));
           let f = myItem !== null && myItem;
           state.dependcyArr = [...f];
           let x = []
           state.dependcyArr.forEach((ele) => {
            let y = JSON.parse(JSON.stringify(state.itemsObj[ele]));
            x.push(...y);
        })
        state.items = [...x]
        }
    }
})

export default categorySlice.reducer;
export const {openCate, handleCheckBox, search, refreshPage} = categorySlice.actions;
