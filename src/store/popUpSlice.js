import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    show:false,
    item:{}
}

const popUPSLice = createSlice({
    name:'popupslice',
    initialState,
    reducers : {
        closePopUp: (state) => {
            state.show = false;
        },
        openPopUp : (state) => {
            state.show = true;
        },
        addItem: (state,action) => {
            state.item = {...action.payload};
        }
    }
})

export default popUPSLice.reducer;

export const {closePopUp, openPopUp, addItem} = popUPSLice.actions;

