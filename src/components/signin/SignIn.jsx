import { useState, useRef } from 'react';
import '../signup/signup.scss';
import axios from "axios";
import Joi from 'joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom'

const SignIn = () => {

    const navigation = useNavigate()
    const [isFocusEmail, setIsFocusEmail] = useState(false);
    const [isFocusPass, setIsFocusPass] = useState(false);
    const email = useRef ();
    const password = useRef ();
    const [isPost, setIsPost] = useState (false);
    const [errArr, setErrArr] = useState([]);
    const [msg, setMsg] = useState('');
    const [userData, setUserData] = useState({
        email:"",
        password:""
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
            const {data} = await axios.post('https://route-egypt-api.herokuapp.com/signin',userData);
            setMsg(data.message)
            setTimeout(() => {
                setMsg('')

            },4000)
            setIsPost(false);
            if (data.message === 'success') {
                localStorage.setItem('ecommerceToken',data.token)
                navigation('/')
                email.current.value = '';
                password.current.value = '';
                setIsFocusEmail(false);
                setIsFocusPass(false);
            }
        }
    }

    const userValidation = () => {
        const schema = Joi.object({
            email:Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password:Joi.string().min(7).max(20).required()
        })
        return schema.validate(userData,{abortEarly:false});
    }

    return (
        <form onSubmit={(e) => submitData(e)}>
            <h3 className="text-center mt-5" style={{color:'#999'}}>تسجبل الدخول</h3>
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
            <button className='mt-5 border-0 text-white rounded-circle text-center shadow d-block mx-auto' style={{width:'50px',height:'50px', background:'#535070', lineHeight:'50px', cursor:'pointer'}}> {isPost ? <div className="spinner-border" role="status"></div>: <FontAwesomeIcon className='fs-4' icon={faArrowRightToBracket}/>}  </button>
            <p className='fw-bold text-info'>{msg}</p>
        </form>
    )
}

export default SignIn;