import SignIn from "../signin/SignIn";
import SignUp from "../signup/SignUp";
import {Container, Row, Col} from 'react-bootstrap'


const Register = () => {
    return (
        <Container>
            <Row>
                <Col md = {6}>
                    <SignUp />
                </Col>
                <Col md = {6}>
                    <SignIn />
                </Col>
            </Row>
        </Container>
    )
}

export default Register;
