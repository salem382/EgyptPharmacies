import { useSelector } from "react-redux";
import Card from '../card/Card'
import {Container, Row, Col} from 'react-bootstrap'
import PopUp from "../popup/PopUp";
import {Link} from 'react-router-dom'

const Search = () => {

    const {items} = useSelector(state => state.search);
    return (
        <>
        <Container className="mt-5">
            <Row className="gy-5">
                {items.length > 0 ? (
                    <>
                        {items.map((item, ind) => <Col key = {ind} md ={4}>
                            <Card data={item}/>
                        </Col> )}
                    </>
                )  : (
                    <>
                     <div className='bg-danger rounded-3 mt-4 py-2 text-white w-50 text-center'>لا توجد منتجات مطابقه للذي قمت بالبحث عنه</div> 
                    <Link to='/'><button className='btn text-white mt-4' style={{background:'#535070'}}>متابعة التسوق</button></Link>
                    </>
                   )}
            </Row>
        </Container>
        <PopUp />
        </>
        
    )
}
export default Search;