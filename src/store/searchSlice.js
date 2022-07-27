import {msknat, alryadyaa, kohaa, otoar, sahatAlrajal, shaar} from '../appData'
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    itemsObj : {
        all :[...msknat, ...alryadyaa, ...kohaa, ...otoar, ...sahatAlrajal, ...shaar],
        msknat:msknat,
        alryadyaa:alryadyaa,
        kohaa:kohaa,
        otoar:otoar,
        sahatAlrajal:sahatAlrajal,
        shaar:shaar
    },
    items:[]
}

const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        searchIn : (state, action) => {
            state.items = [];
            console.log (action.payload)
            let x = JSON.parse(JSON.stringify(state.itemsObj[action.payload[0]]));
            state.items.push(...x);
            let y =  state.items.filter(item =>item.name.includes(action.payload[1]));
            state.items = [...y];
        }
    }
})

export default searchSlice.reducer;
export const {searchIn} = searchSlice.actions;
