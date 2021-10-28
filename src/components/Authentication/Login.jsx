import { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import theme from '../../assets/images/theme.jpg';


function Login() {
    const history = useHistory()
    const [initialState] = useState({
        email: '',
        password: '',
    })
    
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string().required('No password provided.')
    });

    const handleLogin = (values) => {
        const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : []
        const user=users.find((u) => u.email === values.email && u.password === values.password)
        if(user){
            alert("Login successfully")
            history.push('/dashboard')
        }else{
            alert("Invalid credentials")
        }
    }

    return (
        <div className="row">
            <div className="col-6">
                <img className="bg-img" alt="theme" src={theme} width="100%" />
            </div>
            <div className="col-6 py-5">
                <h3 className="text-center text-bold">LOGIN</h3>
                <>
                    <Formik
                        initialValues={initialState}
                        onSubmit={handleLogin}
                        validationSchema={validationSchema}
                    >
                        {props => {
                            const {
                                values,
                                touched,
                                errors,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                            } = props;
                            return (
                                <Form
                                    className="registration-form"
                                    onSubmit={handleSubmit}
                                    style={{ backgroundColor: 'white' }}
                                >
                                    <Row className="justify-content-center">
                                        <Col md={10}>
                                            <FormGroup>
                                                <Label for="email" className="lbl-text">Email</Label>
                                                <Input type="email" name="email" id="email" value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={
                                                        errors.email && touched.email
                                                            ? "error-feedback custom-input"
                                                            : "custom-input"
                                                    }
                                                />
                                                {errors.email && touched.email && (
                                                    <div className="error-feedback">{errors.email}</div>
                                                )}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <Col md={10}>
                                            <FormGroup>
                                                <Label className="lbl-text" for="password">Password</Label>
                                                <Input type="password" name="password" id="password" value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={
                                                        errors.password && touched.password
                                                            ? "error-feedback custom-input"
                                                            : "custom-input"
                                                    }
                                                />
                                                {errors.password && touched.password && (
                                                    <div className="error-feedback">{errors.password}</div>
                                                )}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center py-5">
                                        <Button className="custom-button" >Log in</Button>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <div className="signup-btm"> Don't have an account? <span className="text-bold primary-color px-1 pointer" onClick={() => history.push('/register')}>Sign Up</span>  </div>
                                    </Row>
                                </Form>
                            );
                        }}
                    </Formik>
                </>
            </div>
        </div >
    );
}

export default Login;
