import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark, faHeart} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {closePopUp} from '../../store/popUpSlice';
import {addToFavItems} from '../../store/favSlice'
import {toast} from 'react-toastify' ;

const PopUp = () => {

    const dispatch = useDispatch()
    const {item} = useSelector(state => state.popUp) 
    const {show} = useSelector(state => state.popUp) 
    const {favItems} = useSelector(state => state.fav);
    const [isFav, setIsFav] = useState(false);

    const checkFav = () => {
        let ii = favItems.find(it => it.name === item.name);
         if (ii !== undefined) {
            setIsFav(true)
         } else {
            setIsFav(false)
         }
    }
   const handleFavClick = () => {
        if (localStorage.getItem('ecommerceToken') === null) {
            toast.error(' يجب عليك تسجيل الدخول اولا للاضافه الي المفضله',{
                position: 'top-center'
            });
        } else {
            dispatch(addToFavItems(item))
            setIsFav((prev) => !prev);
        }
    }
    useEffect(() => {
        checkFav();
    },[show])

    return (
        <div className="pop-up position-fixed w-100 h-100 top-0 start-0" style={{display:show ? 'block' : 'none',background:'rgba(0,0,0,0.7)',zIndex:'999'}}>
            <div className="w-75 bg-white shadow position-absolute start-50 top-50 translate-middle rounded">
                <div className = 'position-absolute bg-danger rounded-circle text-center' style={{width:'40px',height:'40px',lineHeight:'50px',top:'-10px',right:'-10px',cursor:'pointer'}}>
                    <FontAwesomeIcon onClick={() => dispatch(closePopUp())} className='fs-3 text-white' icon={faXmark}/>
                </div>
                <div className='d-flex'>
                    <div className='w-50'><img style={{height:'400px'}} className='w-100' src ={item.imgSrc} alt='category'/>  </div>
                    <div className='w-50' style={{padding:'30px'}}>
                        <h2 className='mb-5'>{item.name}</h2>
                        <p style={{color:'#999'}}>الفئه : <span>{item.kind}</span></p>
                        <p style={{color:'#999'}} className='border-bottom pb-4'>{item.desc}</p>
                        <div className='d-flex mt-3 justify-content-between'>
                            <p className='fw-bold text-danger'>{item.price} ج.م</p>
                            <div onClick={handleFavClick} className='fs-4'><FontAwesomeIcon style={{color:isFav ? '#f00': '',cursor:'pointer'}} icon={faHeart}/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(PopUp);
