import { useState, useRef } from 'react';
import './signup.scss';
import axios from "axios";
import Joi from 'joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';


const SignUp = () => {

    const [isFocusFN, setIsFocusFN] = useState(false);
    const [isFocusLN, setIsFocusLN] = useState(false);
    const [isFocusEmail, setIsFocusEmail] = useState(false);
    const [isFocusPass, setIsFocusPass] = useState(false);
    const fName = useRef (null);
    const lName = useRef ();
    const email = useRef ();
    const password = useRef ();
    const [isPost, setIsPost] = useState (false);
    const [errArr, setErrArr] = useState([]);
    const [msg, setMsg] = useState('');
    const [userData, setUserData] = useState({
        first_name:"",
	    last_name:"",
        email:"",
        password:"",
        age:""
    });
  
    const  handleBlur = (e, x) => {
        if (e.target.value === '') {
            x(false)
        } else {
            x (true)
        }
    } 
    const postData = (e) => {
        let usr = {...userData};
        usr[e.target.name] = e.target.value;
        setUserData(usr)
    }

    const submitData = async (e) => {
        e.preventDefault();
        if (userValidation().error) {
            let errs = userValidation().error.details.map(item =>item.message )
            setErrArr(errs)
        } else {
            setErrArr([]);
            setIsPost(true);
            const {data} = await axios.post('https://route-egypt-api.herokuapp.com/signup',userData)
            setMsg(data.message)
            setTimeout(() => {
                setMsg('')

            },4000)
            setIsPost(false);
            if (data.message === 'success') {
                fName.current.value = '';
                lName.current.value = '';
                email.current.value = '';
                password.current.value = '';
                setIsFocusFN(false);
                setIsFocusLN(false);
                setIsFocusEmail(false);
                setIsFocusPass(false);
            }
        }
    }

    const userValidation = () => {
        const schema = Joi.object({
            first_name:Joi.string().alphanum().min(3).max(10).required(),
            last_name:Joi.string().alphanum().min(3).max(10).required(),
            email:Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password:Joi.string().min(7).max(20).required(),
            age:''
        })
        return schema.validate(userData,{abortEarly:false});
    }

    return (
        <form onSubmit={(e) => submitData(e)}>
            <h3 className="text-center mt-5" style={{color:'#999'}}>ليس لديك حساب؟ سجل معنا الان!</h3>
            <div className="w-100 position-relative mt-5" style={{height:'40px'}}>
                <p className="position-absolute" style={{color:'#999',top:isFocusFN ? '-30px': '0', fontSize:isFocusFN ? '12px':'16px', transition:'all .3s'}}>الاسم الاول</p>
                <input ref={fName} onChange={(e) => postData(e)} name='first_name' onFocus={() => setIsFocusFN(true)} onBlur = {(e) => handleBlur(e, setIsFocusFN)} type='text' className="border-0 border-bottom w-100 bg-transparent border-dark position-absolute bottom-0" />
                <p className='text-danger position-absolute' style={{bottom:'-45px'}}>{errArr.filter(item => item.includes('first_name'))}</p>
            </div>
            <div className="w-100 position-relative mt-5" style={{height:'40px'}}>
                <p className="position-absolute" style={{color:'#999',top:isFocusLN ? '-30px': '0', fontSize:isFocusLN ? '12px':'16px', transition:'all .3s'}}> الاسم الأخير</p>
                <input ref={lName} onChange={(e) => postData(e)} name='last_name'  onFocus={() => setIsFocusLN(true)} onBlur = {(e) => handleBlur(e, setIsFocusLN)} type='text' className="border-0 border-bottom w-100 bg-transparent border-dark position-absolute bottom-0" />
                <p className='text-danger position-absolute' style={{bottom:'-45px'}}>{errArr.filter(item => item.includes('last_name'))}</p>
            </div>
            <div className="w-100 position-relative mt-5" style={{height:'40px'}}>
                <p className="position-absolute" style={{color:'#999',top:isFocusEmail ? '-30px': '0', fontSize:isFocusEmail ? '12px':'16px', transition:'all .3s'}}>البريد الألكتروني</p>
                <input ref={email} onChange={(e) => postData(e)} name='email'  onFocus={() => setIsFocusEmail(true)} onBlur = {(e) => handleBlur(e, setIsFocusEmail)} type='email' className="border-0 border-bottom w-100 bg-transparent border-dark position-absolute bottom-0" />
                <p className='text-danger position-absolute' style={{bottom:'-45px'}}>{errArr.filter(item => item.includes('email'))}</p>
            </div>
            <div className="w-100 position-relative mt-5" style={{height:'40px'}}>
                <p className="position-absolute" style={{color:'#999',top:isFocusPass ? '-30px': '0', fontSize:isFocusPass ? '12px':'16px', transition:'all .3s'}}>كلمة السر</p>
                <input ref={password} onChange={(e) => postData(e)} name='password'  onFocus={() => setIsFocusPass(true)} onBlur = {(e) => handleBlur(e, setIsFocusPass)} type='password' className="border-0 border-bottom w-100 bg-transparent border-dark position-absolute bottom-0" />
                <p className='text-danger position-absolute' style={{bottom:'-45px'}}>{errArr.filter(item => item.includes('password'))}</p>
            </div>
            <button className='border-0 text-white rounded-circle text-center shadow d-block mx-auto mt-5' style={{width:'50px',height:'50px', background:'#535070', lineHeight:'50px', cursor:'pointer'}}> {isPost ? <div className="spinner-border" role="status"></div>: <FontAwesomeIcon className='fs-5' icon={faUserPlus}/>}  </button>
            <p className='fw-bold text-info'>{msg}</p>
        </form>
    )
}

export default SignUp;