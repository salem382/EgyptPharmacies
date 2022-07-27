import './footer.scss';
import {Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLocationPin, faPhoneFlip, faEnvelope, faMobileScreenButton} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {

    return (
        <>
        <section className='footer py-5 mt-5'>
            <Container>
                <Row>
                    <Col lg= {6}>
                        <div className='connection-info d-flex text-white  justify-content-between'>
                            <ul className='list-unstyled p-0'>
                                <h5>روابط سريعة </h5>
                                <li>حسابي </li>
                                <li>تواصل معنا </li>
                                <li>المفضله</li>
                                <li>الدفع</li>
                            </ul>
                            <ul className='list-unstyled p-0'>
                                <h5>معلومات للتواصل </h5>
                                <li><FontAwesomeIcon className = 'ms-3'  icon={faLocationPin}/> 29 شارع القدس الشريف ، المهندسين ، الجيزة ، مصر</li>
                                <li> <FontAwesomeIcon className = 'ms-3'  icon={faPhoneFlip}/>19110</li>
                                <li> <FontAwesomeIcon className = 'ms-3'  icon={faEnvelope}/>misr-online.support@misrpharmacies.com</li>
                                <li><FontAwesomeIcon className = 'ms-3'  icon={faMobileScreenButton}/>حمل التطبيق الان </li>
                            </ul>
                        </div>
                    </Col>
                    <Col lg = {6}>
                        <iframe className='w-100' title="myFrame" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d219834.21298304148!2d32.096840547982495!3d30.5800978945601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f85956191e10b9%3A0x3b0933775b0f5b95!2sIsmailia%2C%20Ismailia%20Governorate!5e0!3m2!1sen!2seg!4v1658018981894!5m2!1sen!2seg"  height="150"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" frameBorder="0"></iframe>
                    </Col>
                </Row>
            </Container>
        </section>
        <section className='copy-right text-center text-white pt-2 pb-1'>
            <p>حقوق الطبع والنشر © 2022 جميع الحقوق محفوظة</p>
        </section>
        </>
    )
}

export default Footer;