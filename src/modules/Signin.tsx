import { Container, Button, Col, Form, Row, Alert } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';
import { appState, signinAsync } from "../stores/appSlice";
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './common/Loader';

const Signin = () => {

    const navigate = useNavigate();
    const dispatchApp = useAppDispatch();
    const { status, signin, isAuthenticated } = useAppSelector(appState);

    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    });

    const handleSubmitFun = (values: any) => {
        var data = {
            username: values.username,
            password: values.password,
            expiresInMins: 30,
        }
        dispatchApp(signinAsync(data));
    };

    useEffect(() => {
        isAuthenticated && navigate('/');
    }, [isAuthenticated]);

    if (status === "loading") {
        return <Loader />;
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mb-4 text-center">Sign In</h2>
                    {signin.message && <Alert variant='danger'>{signin.message}</Alert>}
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmitFun}
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>

                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        isValid={touched.username && !errors.username}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isValid={touched.password && !errors.password}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="dark" type="submit" className="w-100">Sign In</Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}

export default Signin;
