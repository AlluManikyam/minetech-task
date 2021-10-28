import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import theme from '../../assets/images/theme.jpg';

function Register() {
    const history = useHistory()
    const [initialState, setIntialState] = useState({
        name: '',
        email: '',
        password: '',
        cPassword: '',
        dob: '',
        phone: '',
    })
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .strict(false)
            .trim()
            .min(3, "Minimum of 3 characters")
            .max(100, "Maximum of 100 characters")
            .matches(/^[aA-zZ\s]+$/, "Only characters are allowed"),

        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string().required('No password provided.')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&]{8,}$/, "Password should contain letter,number and special character")
            .min(8, 'Password should be 8 chars minimum.'),

        cPassword: Yup.string().required('Confirm password is required.')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
        ,
        phone: Yup.string()
            .required('Mobile Number is required')
            .matches(/^[0-9\s]+$/, "Only numbers are allowed")
            .min(10, 'Invalid Mobile Number')
            .max(10, 'Invalid Mobile Number'),
        dob: Yup.date()
            .nullable()
            .required('DOB is required'),
    });



    const handleRegister = (values) => {
        console.log("values...", values);
        const user = {
            name: values.name,
            email: values.email,
            password: values.password,
            dob: values.dob,
            phone: values.phone,
        }
        const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : []
       
        if (users.findIndex((u) => u.email === user.email) === -1) {
            users.push(user)
            localStorage.setItem("users", JSON.stringify(users))
            setIntialState({
                name: '',
                email: '',
                password: '',
                cPassword: '',
                dob: '',
                phone: '',
            })
            alert("User registered successfully")
        } else {
            alert("Email already exists")
        }
    }

    return (
        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <img className="bg-img" alt="theme" src={theme} width="100%" />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 py-2">
                <h3 className="text-center text-bold">SIGNUP</h3>
                <>
                    <Formik
                        initialValues={initialState}
                        onSubmit={handleRegister}
                        validationSchema={validationSchema}
                        enableReinitialize
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
                                        <Col lg={10} md={10} sm={10} xl={10}>
                                            <FormGroup>
                                                <Label for="name" className="lbl-text">Name</Label>
                                                <Input type="text" name="name" id="name" value={values.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={
                                                        errors.name && touched.name
                                                            ? "error-feedback custom-input"
                                                            : "custom-input"
                                                    }
                                                />
                                                {errors.name && touched.name && (
                                                    <div className="error-feedback">{errors.name}</div>
                                                )}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <Col lg={10} md={10} sm={10} xl={10}>
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
                                        <Col lg={5} md={5} sm={5} xl={5}>
                                            <FormGroup>
                                                <Label for="phone" className="lbl-text">Phone Number</Label>
                                                <Input type="text" name="phone" id="phone" value={values.phone}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={
                                                        errors.phone && touched.phone
                                                            ? "error-feedback custom-input"
                                                            : "custom-input"
                                                    }
                                                />
                                                {errors.phone && touched.phone && (
                                                    <div className="error-feedback">{errors.phone}</div>
                                                )}
                                            </FormGroup>
                                        </Col>
                                        <Col lg={5} md={5} sm={5} xl={5}>
                                            <FormGroup>
                                                <Label for="dob" className="lbl-text">DOB</Label>
                                                <Input type="date" name="dob" id="dob" value={values.dob}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={
                                                        errors.dob && touched.dob
                                                            ? "error-feedback custom-input"
                                                            : "custom-input"
                                                    }
                                                />
                                                {errors.dob && touched.dob && (
                                                    <div className="error-feedback">{errors.dob}</div>
                                                )}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <Col lg={5} md={5} sm={5} xl={5}>
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
                                        <Col lg={5} md={5} sm={5} xl={5}>
                                            <FormGroup>
                                                <Label className="lbl-text" for="cpassword">Confirm Password</Label>
                                                <Input type="password" name="cPassword" id="cPassword" value={values.cPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={
                                                        errors.cPassword && touched.cPassword
                                                            ? "error-feedback custom-input"
                                                            : "custom-input"
                                                    }
                                                />
                                                {errors.cPassword && touched.cPassword && (
                                                    <div className="error-feedback">{errors.cPassword}</div>
                                                )}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center py-4">
                                        <Button className="custom-button" >Sign up</Button>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <div className="signup-btm"> Already have an account? <span className="text-bold primary-color px-1 pointer" onClick={() => history.push('/login')}>Login</span>  </div>
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

export default Register;
