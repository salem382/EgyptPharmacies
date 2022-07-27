import Controls from "../controls/Controls";
import {Container, Row, Col} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import Card from "../card/Card";
import {useEffect} from 'react';
import {refreshPage} from '../../store/categorySlice'

const Category = () => {

    const {items} = useSelector(state => state.categ);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(refreshPage())
    },[])

    return (
        <div className="mt-5">
            <Container>
                <Row>
                    <Col md ={3} className='d-none d-lg-block'>
                        <Controls />
                    </Col>
                    <Col md={9} className='col-12'>
                        <Row className="gy-4">
                            {items.map((item, ind) => <Col key={ind} md = {6} sm = {12}>
                                <Card data = {item}/>
                            </Col> )}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Category;
