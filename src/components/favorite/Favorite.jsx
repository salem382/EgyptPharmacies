import './favorite.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { increaseCartItems, decreaseCartItems, addItemToCarElement } from '../../store/CardSlice';
import {Link} from 'react-router-dom';
import {removeItemsFromFav} from '../../store/favSlice';

const Favorite = () => {
    
    const dispatch = useDispatch ();
    const {cartItems} = useSelector(state => state.card);
    const {favItems} = useSelector(state => state.fav);
    useEffect(() => {
       
    }, [])



    const AddToCart = (item) => {
            let z = cartItems.find(it => it.name === item.name)
            if (z === undefined) {
                return (
                    <div onClick={() => dispatch(addItemToCarElement(item))} className='text-white py-2 px-3' style={{cursor:'pointer',background:'#535070',borderRadius:'17px'}}>اضافه الي العربه</div>
                )
            } else {
                return (
                    <div>
                    <span onClick={() => dispatch(increaseCartItems(item))} className='mx-2 fs-4' style={{cursor:'pointer'}}>+</span> <span  className='mx-2' style={{color:'#999'}}>{z.count}</span> <span onClick={() => dispatch(decreaseCartItems(item))} style={{cursor:'pointer'}} className='mx-2 fs-4' >-</span>
                </div>
                )
            }
    }
    return (
        <>
        {favItems.length > 0 ? (
            <>
                <ul className="py-4 row-items list-unstyled p-0 d-flex text-center align-items-center">  
                <li>المنتج</li>
                <li>الاسم</li>
                <li>السعر</li>
                <li>كميه</li>
                <li></li>
            </ul>
            
                {favItems.map((item, ind) => <ul key={ind} className="py-4 row-items list-unstyled p-0 d-flex text-center align-items-center">
                    <li><img src={item.imgSrc} alt='' style={{width:'80px',height:'80px'}}/></li>
                    <li style={{fontSize:'14px'}}>{item.name}</li>
                    <li>{item.price} ج.م </li>
                    <li>
                        {AddToCart(item)}
                    </li>
                    <li onClick={() => dispatch(removeItemsFromFav(item))} className='bg-danger text-white rounded-circle text-center mx-auto' style={{width:'50px',height:'50px',lineHeight:'50px',cursor:'pointer'}}><FontAwesomeIcon icon={faXmark} className='fs-4'/></li>
                </ul>)} 
            </>
        ) : (
            <>
                <div className='bg-danger rounded-3 mt-4 py-2 text-white w-25 text-center'>لا توجد منتجات لعرضها </div> 
                <Link to='/'><button className='btn text-white mt-4' style={{background:'#535070'}}>متابعة التسوق</button></Link>
            </>
        )}
            
        </>
    )
}

export default Favorite;