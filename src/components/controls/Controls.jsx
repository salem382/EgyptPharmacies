import React, {useRef} from "react";
import {useSelector, useDispatch} from 'react-redux';
import PopUp from "../popup/PopUp";
import {handleCheckBox, search} from '../../store/categorySlice';

const Controls = () => {

    const lowerCase = useRef ();
    const upperCase = useRef ();
    const dispatch = useDispatch();
    const {dependcyArr} = useSelector(state => state.categ);
    const checkboxItems = [{arName:'مسكنات',enName:'msknat'},{arName:'عطور',enName:'otoar'},{arName:'صحة الرجل',enName:'sahatAlrajal'},{arName:'التغذيه الرياضيه',enName:'alryadyaa'},{arName:'الشعر و التصفيف',enName:'shaar'},{arName:'أدوية الكحه و الحساسيه',enName:'kohaa'}]
   
    return (
        <div className="bg-white w-100 shadow-sm mt-1 p-3">
            <div className="pb-4 border-bottom">
                <h6 className=" pt-4 mb-3 ">السعر</h6>
                <div className="d-flex align-items-center">
                <input ref={lowerCase} defaultValue ='3' className="form-control border-0" type='number'  style={{background:'#f1f1f1'}}/>
                <label className="mx-2">الي</label>
                <input ref={upperCase} defaultValue ='1000'  className="form-control border-0"  type='number' style={{background:'#f1f1f1'}}/>
                </div>
                <button onClick={() => dispatch(search([lowerCase.current.value, upperCase.current.value]))} className="btn text-white mt-3" style={{background:'#535070',fontSize:'14px'}}> اعادة الضبط</button>
            </div>
            <div className="my-4">
                <h6 className="mb-3">الأصناف</h6>
                {checkboxItems.map((item, ind) => <div key={ind}>
                    <input onChange={() => dispatch(handleCheckBox(item.enName))} type='checkbox' checked={item.enName === dependcyArr.find(it => it === item.enName)} className="ms-3 msknat checkbox"/><span  style={{fontSize:'14px'}}>{item.arName}</span>
                </div>)}
            </div>
            <PopUp />
        </div>
    )
}

export default React.memo(Controls);