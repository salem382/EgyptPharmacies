
import {Container} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import './shoping.scss'
import {clearData, increaseCartItems, decreaseCartItems, deleteItem, getTotalPrice} from '../../store/CardSlice'
import { useEffect, useState } from 'react';
const Shoping = () => {

    const dispatch = useDispatch();
    const cardState = useSelector(item => item.card);
    const {cartItems} = cardState;
    const [isEmpty, setISEmpty] = useState(true);
    useEffect(() => {
        cartItems.length > 0 ? setISEmpty(false) : setISEmpty(true);
        dispatch(getTotalPrice());
    },[cartItems, dispatch])
    return (
        <>
        <Container>
            {isEmpty ? <>
                <div className='bg-danger rounded-3 mt-4 py-2 text-white w-25 text-center'>لا توجد منتجات لعرضها </div> 
                <Link to='/'><button className='btn text-white mt-4' style={{background:'#535070'}}>متابعة التسوق</button></Link>
            </>: <>
                <ul className=" shoping-row list-unstyled d-flex align-items-center py-3 border-bottom">
                <li>المنتج</li>
                <li>الاسم</li>
                <li>الكميه</li>
                <li>الاجمالي</li>
                <li><button className="btn btn-danger" onClick={() => dispatch(clearData())}>مسح الجميع</button> </li>
            </ul> 
            {cartItems.map((item, ind) => <ul key={ind} className="shoping-row list-unstyled d-flex align-items-center py-3 border-bottom">
                <li><img style={{width:'100px',height:'100px'}} src={item.imgSrc} alt='' /></li>
                <li><span className='fw-bold' style={{color:'#999'}}>{item.count + 'X'}</span> {item.name}</li>
                <li className='text-center'><span className='fs-4' style={{cursor:'pointer'}} onClick={() => dispatch(increaseCartItems(item))}>+</span><span className='mx-4' style={{color:'#999'}}>{item.count}</span><span className='fs-4' style={{cursor:'pointer'}} onClick={() => dispatch(decreaseCartItems(item))}>-</span></li>
                <li>{item.total} ج . م</li>
                <li onClick={() => dispatch(deleteItem(item))} className='rounded-circle bg-danger text-white text-center m-auto' style={{width:'45px',height:'45px',lineHeight:'45px',cursor:'pointer'}}> <FontAwesomeIcon className='fs-5'  icon={faXmark} /> </li>
            </ul>)} 
            <div className='d-flex justify-content-between align-items-center mt-3'>
                <Link to='/'><button className='btn text-white' style={{background:'#535070'}}>متابعة التسوق</button></Link>
                <div className='text-danger fw-bold'>المجموع  الكلي : <span>{cardState.amount} ج.م</span></div>
            </div>
            </>}
        </Container>  
        </>
    )
}

export default Shoping;