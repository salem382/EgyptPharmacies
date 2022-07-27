import './header.scss';
import {Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faCartPlus, faImagePortrait, faXmark, faCartShopping , faBars, faPhone, faMobileAndroid, faAppleWhole, faUser, faCaretDown, faMagnifyingGlass, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {openCate} from '../../store/categorySlice';
import {collectNewData, deleteItem, clearData} from '../../store/CardSlice';
import {toast} from 'react-toastify' ;
import jwtDecode from 'jwt-decode';
import {searchIn} from '../../store/searchSlice'

const Header = () => {

    const Navigate = useNavigate()
    const cardState = useSelector(state => state.card);
    const inputSearch = useRef ();
    const {cartItems} = cardState;
    const [userData, setUserData] = useState({})
    const [open, setOpen] = useState(false);
    const [openUser, setOpenUser] = useState(false);
    const [openCard, setOpenCard] = useState(false);
    const [searcAbout, setSearchAbout] = useState('all');
    const dispatch = useDispatch ();
    const sideBar = useRef();
    const handlTalabatClick = () => {
        if (localStorage.getItem('ecommerceToken') !== null) {
            Navigate('/shoping')
        } else {
            toast.error('يجب عليك تسجيل الدخول اولا',{
                position: 'top-center'
            });
        }
        setOpenUser(false)
    }
    const handleLog = () => {
        if (localStorage.getItem('ecommerceToken') !== null) {
            localStorage.removeItem('ecommerceToken')
            Navigate('/login')
        } else {
           Navigate('/login')
        }
        setOpenUser(false)
    }
    const handleOpenCateg = (e) => {
        dispatch(openCate(e.target.id));
    }
    const handleFavorite = () => {
        if (localStorage.getItem('ecommerceToken') !== null) {
            Navigate('/favorite')
        } else {
            toast.error('يجب عليك تسجيل الدخول اولا',{
                position: 'top-center'
            });
        }
    }
    const handleSelect = (e) => {
        setSearchAbout(e.target.value)
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        let searchWord = inputSearch.current.value;
        dispatch(searchIn([searcAbout, searchWord]));
        Navigate('/search');
    }
    useEffect(() => {
        if (localStorage.getItem('ecommerceToken') !== null) {
            let x = localStorage.getItem('ecommerceToken')
            let y = jwtDecode(x)
            setUserData({...y});
            console.log (userData)
            console.log (userData)
        }
    }, [])
    useEffect(() => {
        dispatch(collectNewData());
    },[cartItems, dispatch])

    useEffect(() => {
        open ? sideBar.current.classList.add('open') : sideBar.current.classList.remove('open') ;
    },[open])
    return (
        <section className='header'>
            <div className='upper-part py-2'>
                <Container>
                    <Row className='align-items-center'>
                        <Col  sm={2} className='sb col-6 d-lg-none'>
                            <div className='menu fs-5'>
                              <FontAwesomeIcon onClick={() => setOpen(true)} icon={faBars}/>
                            </div>
                        </Col>
                        <Col sm= {8} md = {6} lg = {4} className ='d-none d-sm-block '>
                            <div className='phone-contact'>
                                <p>
                                    <span className='icon ms-1'><FontAwesomeIcon className='fa-flip-horizontal' icon={faPhone} /></span>
                                     الخط الساحن :
                                    <span className='num mx-1'>19110</span>
                                    حمل التطبيق الان
                                    <span className='mx-1'><FontAwesomeIcon icon={faMobileAndroid}/></span>
                                    <span className='mx-1'><FontAwesomeIcon icon={faAppleWhole}/></span>
                                </p>   
                            </div>
                        </Col>
                        <Col lg= {4} className = 'd-none d-lg-block '>
                            <div className='welcome-message text-center'>
                                <p>اهلا و سهلا في صيدليات مصر اون لاين !</p>
                            </div>
                        </Col>
                        <Col sm = {2} md = {4} lg= {4} className ='sb'>
                            <div className='user d-flex justify-content-end align-items-center'>
                                <div style={{width:'100px'}} className='mx-2 d-none d-md-block'> <img src='images/upper/1.png' alt='logo' className='w-100'/></div>
                                <p onClick={handleFavorite} className=' mx-2 d-none d-md-block' style={{cursor:'pointer',textDecoration:'underline'}}>المفضله</p>
                                <div className='mx-2 user-icon d-flex position-relative'>
                                    <div style={{cursor:'pointer'}} onClick={() => setOpenUser((prev) => !prev)}>
                                    <FontAwesomeIcon icon={faUser}/>
                                    <FontAwesomeIcon icon={faCaretDown}/>
                                    </div>
                                    <div className='text-dark rounded shadow  position-absolute bg-white start-50 translate-middle-x' style={{width:'150px',top:'20px', zIndex:'999999', display:openUser?'block' : 'none'}}>
                                         <div className='border-bottom px-3 py-4  d-flex justify-content-between align-items-center'>
                                            <FontAwesomeIcon className='fs-5' icon={faImagePortrait} />
                                            <p style={{fontSize:'11px'}}>
                                                {localStorage.getItem('ecommerceToken') !== null ? `${userData.first_name} ${userData.last_name}` : 'User'}
                                            </p>
                                         </div>
                                         <div className='border-bottom d-flex px-3 py-4 justify-content-between align-items-center'>
                                         <FontAwesomeIcon className='fs-5' icon={faCartPlus}/>
                                            <p style={{cursor:'pointer'}} onClick={handlTalabatClick}>طلباتي</p>
                                         </div>
                                         <div className='d-flex px-3 py-4 justify-content-between align-items-center'>
                                         <FontAwesomeIcon className='fs-5' icon={faArrowRightToBracket}/>
                                            <p style={{cursor:'pointer'}} onClick={handleLog}>{localStorage.getItem('ecommerceToken') !== null ? 'تسجيل الخروج' : 'تسجيل الدخول'}</p>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className = 'main-header py-1'>
                <Container>
                    <Row className='align-items-center'>
                        <Col lg = {3} className='col-6' >
                            <div className='logo'>
                               <Link to = '/'><img style={{width:'200px'}} src={'images/head/logo.png'} alt="logo"/></Link>
                            </div>
                        </Col>
                        <Col lg = {6} className = 'd-none d-lg-block'>
                            <form className='search-bar d-flex position-relative' style={{height:'40px'}} onSubmit={(e) => handleSearchSubmit(e)}>
                                {/******************************************* */}

                                {/********************************************** */}
                                <select onChange={(e) => handleSelect(e)}  defaultValue={'DEFAULT'} style={{color:'#999',width:'150px',fontSize:'16px',height:'100%'}} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                    <option value="all">كل الفئات</option>
                                    <option value="msknat">مسكنات</option>
                                    <option value="alryadyaa">التغذية الرياضية</option>
                                    <option value="kohaa">أدوية الكحه والحساسية</option>
                                    <option value="otoar">عطور</option>
                                    <option value="sahatAlrajal">صحة الرجل</option>
                                    <option value="shaar">الشعر والتصفيف</option>
                                </select>
                                <input ref={inputSearch} className='form-control' placeholder='ابحث هنا' type={'text'}/> 
                                    <FontAwesomeIcon style={{left:'10px',top:'12px',color:'#999'}} className='position-absolute search-icon' icon={faMagnifyingGlass}/>
                            </form>
                        </Col>
                        <Col lg = {3} className='col-6'>
                            <div className='text-white d-flex align-items-center justify-content-end'>
                                <div className='shoping-car position-relative'>
                                    <FontAwesomeIcon icon={faCartShopping} className=' fs-4'/>
                                   {cardState.quantity > 0 && <span className='text-center position-absolute bg-danger rounded-circle' style={{width:'20px',height:'20px',top:'-10px',right:'-10px',lineHeight:'20px'}}>{cardState.quantity}</span>} 
                                </div>
                                <div className='me-3 position-relative border-4'>
                                    <div onClick={() => setOpenCard((prev) => !prev)} style={{cursor:'pointer'}}>
                                        <p className='m-0'>عربة التسوف </p> 
                                        <span>{cardState.quantity > 0 && cardState.quantity + 'منتج'}</span> 
                                        <FontAwesomeIcon icon={faCaretDown}/>
                                    </div>
                                    <div className='rounded shadow position-absolute translate-middle-x border-2 bg-white' style={{left:'100px',width:'300px',zIndex:'9999',display:openCard ? 'block' : 'none'}}>
                                       <Link to='/shoping'><p onClick={() => setOpenCard(false)} className='border-bottom pb-3 text-center pt-2' style={{color:'#999',textDecoration:'underline',cursor:'pointer'}}>عرض السله</p></Link>
                                        {cartItems.length > 0 ? (<>
                                            {cartItems.map((item, ind) => <div key={ind} className='pb-3 text-dark d-flex align-items-center justify-content-between px-3'>
                                           <div> <FontAwesomeIcon onClick={() => dispatch(deleteItem(item))} className='text-danger fs-4' style={{cursor:'pointer'}} icon={faXmark} /></div>
                                           <div>
                                              <img  style={{width:'75px',height:'75px'}} src={item.imgSrc} alt=''/>
                                           </div>
                                           <div className='d-flex'>
                                                <p>{item.name.substring(0,14)}</p>
                                                <p className='me-2 fw-bold' style={{color:'#999'}}>{item.count}X</p>
                                           </div>
                                        </div>)}
                                        <div className='border-top d-flex justify-content-between px-3 py-2'>
                                            <p style={{color:'#999'}}>إجمالي</p>
                                            <p className='text-danger fw-bold'>{cardState.amount} ج . م</p>
                                        </div>
                                        <div className='px-3 pt-3 pb-1 border-top d-flex justify-content-between'>
                                            <p style={{color:'#999'}}>حذف الكل</p>
                                            <FontAwesomeIcon onClick={() => dispatch(clearData())} style={{cursor:'pointer'}} className='text-danger fs-4' icon={faTrashCan}/>
                                        </div>
                                        </>) :( <div className='text-center pb-2' style={{color:'#999'}}>لا يوجد منتجات لعرضها </div>)}
                                        
                                    </div>
                                </div>
                                <div>
                                 <FontAwesomeIcon className='d-lg-none me-4 fs-5' icon={faMagnifyingGlass}/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='navbar d-none d-lg-block shadow-sm'>
                <Container>
                    <ul className='list-unstyled d-flex justify-content-around w-75 pt-1' style={{fontSize:'14px',marginBottom:'0'}}>
                       <Link to='/' style={{textDecoration:'none'}}> <li style={{cursor:'pointer',color:'#999'}}>الصفحه الرئيسيه</li></Link>
                        <li className='dropdown position-relative' style={{zIndex:'9'}}>
                            <span className='title' style={{color:'#999'}}>
                                الأدويه  
                            </span>
                            <div className='bg-white drop-menu shadow position-absolute py-3 px-2 start-50 translate-middle-x' style={{width:'150px'}}>
                                <Link to='/category' style={{textDecoration:'none'}}> <p onClick={(e) => handleOpenCateg(e)} style={{cursor:'pointer'}} id = 'msknat'>مسكنات</p></Link>
                                <Link to='/category' style={{textDecoration:'none'}}><p onClick={(e) => handleOpenCateg(e)} style={{cursor:'pointer'}} id = 'kohaa'>أدوية الكحه والحساسيه</p></Link>
                            </div>
                        </li>
                        <li className='position-relative dropdown' style={{zIndex:'9'}}>
                            <div className='title' style={{color:'#999'}}>العنايه بالجمال</div>
                            <div className='bg-white drop-menu shadow position-absolute py-3 px-2 start-50 translate-middle-x' style={{width:'150px'}}>
                                <Link to='/category' style={{textDecoration:'none'}}><p onClick={(e) => handleOpenCateg(e)} style={{cursor:'pointer'}} id='otoar'>عطور</p></Link>
                                <Link to='/category' style={{textDecoration:'none'}}> <p onClick={(e) => handleOpenCateg(e)} style={{cursor:'pointer'}} id= 'shaar'> الشعر و التصفيف</p></Link>
                            </div>
                        </li>
                        <li className='position-relative dropdown' style={{zIndex:'9'}}>
                            <div className='title' style={{color:'#999'}}>الفيتامينات والتغذيه الصحيه</div>
                            <div className='bg-white drop-menu shadow position-absolute py-3 px-2 start-50 translate-middle-x' style={{width:'150px'}}>
                                 <Link to='/category' style={{textDecoration:'none'}}><p onClick={(e) => handleOpenCateg(e)} style={{cursor:'pointer'}} id='sahatAlrajal'>صحة الرجل</p></Link>
                                <Link to='/category' style={{textDecoration:'none'}}><p onClick={(e) => handleOpenCateg(e)} style={{cursor:'pointer'}} id='alryadyaa'>التغذيه الرياضيه</p></Link>
                            </div>
                        </li>
                    </ul>
                </Container>
            </div>
            <section className={ 'sidebar-content'} onClick={() => setOpen(false)} ref={sideBar}>
                <div onClick={(e) => {e.stopPropagation()}} className='sidebar-menu'>
                    <div className='sidebar-icon border-bottom'>
                        <FontAwesomeIcon onClick={() => setOpen(false)} icon={faXmark} className= 'text-danger fs-3 pb-3 me-4' style={{cursor:'pointer'}}/>
                    </div>
                    <h3 style={{color:'#999',fontSize:'16px'}} className = 'mt-3 me-4'>الادويه</h3>
                    <ul className='list-unstyled list'>
                        <li>عطور</li>
                        <li>الشعر و التصفيف</li>
                    </ul>
                    <h3 style={{color:'#999',fontSize:'16px'}} className = 'mt-3 me-4'>العنايه بالجمال</h3>
                    <ul className='list-unstyled list'>
                        <li>مسكنات</li>
                        <li>أدوية الحساسيه</li>
                    </ul>
                    <h3 style={{color:'#999',fontSize:'16px'}} className = 'mt-3 me-4'>الفيتيمنات و التغذيه الصحيه</h3>
                    <ul className='list-unstyled list'>
                        <li>صحة الرجل</li>
                        <li>التغذيه الرياضيه</li>
                    </ul>
                </div>
            </section>
        </section>
    )
}

export default Header;

