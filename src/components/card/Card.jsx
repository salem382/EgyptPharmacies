import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faHeart} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {openPopUp, addItem} from '../../store/popUpSlice';
import './card.scss';
import {toast} from 'react-toastify' ;
import {addItemToCarElement, decreaseCartItems, increaseCartItems} from '../../store/CardSlice';
import {useState, useEffect} from 'react';
import {addToFavItems} from '../../store/favSlice'

const Card = ({data}) => {

    //this is for add two themes add item || increase item
    //and i found this is mistake an ana a5lyaa al a3tmaad an ana 
    //adyaf two themes dependend in two place 
    // y3nyaa kan mfrwas m3wal4yaa is found

    const [isFound, setIsFound] = useState(false);
    // this for card item
    const [myItem, setMyItem] = useState({});
    const [isFav, setIsFav] = useState(false)
    const {cartItems} = useSelector(state => state.card) 
    const dispatch = useDispatch();
    const {favItems} = useSelector(state => state.fav)
    let c = null;
    const {show} = useSelector(state =>state.popUp)

    const checkFav = () => {
        //3h4an lmaa ant2all mn safhaa lltanyaa al2yaa is fav not change
        //y3nyaa lmam akwaan fya al categoty wa adoas favority mrh4yaa 3laa
        //main page wa alayaa favroitr at8yaar
       let ii = favItems.find(item => item.name === data.name);
        if (ii !== undefined) {
            setIsFav(true)
        } else {
            setIsFav(false)
        }
    }
    useEffect(() => {
        c = cartItems.find(item => item.name === data.name);
    },[]) 
    useEffect(() => {
        //dyaa 3haan law dyaft fav mn al pop up
        checkFav();
    },[show])

    useEffect (() => {
        // han al m4kalla al fo2aa 5alass al hyaa ana 5alat al item mo3tmaad
        //3laa mknyann y3nyaa m42aa allah 3lyaa
        if (isFound || c !== undefined) {
            setIsFound(true);
            let x = cartItems.find(item => item.name === data.name);
            x === undefined && setIsFound(false);
            setMyItem({...x});
        }
    },[cartItems])

    const handleAddItemtoCar = () => {
        dispatch(addItemToCarElement(data))
        setIsFound(true);
    }
    const handleinCreaseItemtoCar = () => {
        dispatch(increaseCartItems(data))
    }
    const handledeCreaseItemtoCar = () => {
        dispatch(decreaseCartItems(data))
        if (myItem.count === 1) {
            setIsFound(false);
        }
    }
    const addItemToCar = () => {
        return (
            <div onClick={handleAddItemtoCar} className='text-white py-2 px-3' style={{cursor:'pointer',background:'#535070',borderRadius:'17px'}}>اضافه الي العربه</div>
        )
    }
    const increaseItem = () => {
        return (
            <div>
                <span onClick={handleinCreaseItemtoCar} className='mx-2 fs-4' style={{cursor:'pointer'}}>+</span> <span  className='mx-2' style={{color:'#999'}}>{myItem.count}</span> <span style={{cursor:'pointer'}} className='mx-2 fs-4' onClick={handledeCreaseItemtoCar}>-</span>
            </div>
        )
    }
    const handlePopUp = () => {
        dispatch(openPopUp());
        dispatch(addItem(data));
    }
    const handleFavClick = () => {
        if (localStorage.getItem('ecommerceToken') === null) {
            toast.error(' يجب عليك تسجيل الدخول اولا للاضافه الي المفضله',{
                position: 'top-center'
            });
        } else {
            dispatch(addToFavItems(data))
            setIsFav((prev) => !prev)
        }
    }
    return (
        <div className="card-item border px-4 py-2 mx-auto" style={{width:'300px'}}>
            <div className="photo">
                <img  style={{height:'100px'}} className="w-100" src={data.imgSrc} alt="msknat"/>
            </div>
            <h5 className="text-center mt-2">{data.kind}</h5>
            <p>
                {data.name.substring(0,25)}
            </p>
            <h4 className="text-danger my-3">{data.price} ج.م</h4>
            <div className="contols border-top pt-3 d-flex align-items-center  justify-content-space-between;">
                <FontAwesomeIcon onClick={handlePopUp} style={{cursor:'pointer'}} icon={faEye} className='fs-5'/>
                {isFound ? increaseItem() : addItemToCar() }
                <FontAwesomeIcon onClick= {handleFavClick} style={{cursor:'pointer', color:isFav ? 'red' : ''}} icon={faHeart} className = 'fs-5'/>
            </div>
        </div>
    )
}

export default Card;
