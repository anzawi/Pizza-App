import React from "react";
import {Formik, Form, ErrorMessage} from "formik";
import Input from "../../components/Input";
import {Button, Container, Label} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/store";

export default observer(function LoginForm() {
    const {userStore} = useStore()
    return (
            <Container className='ui center aligned middle aligned grid' fluid textAlign='center'>
                   <Formik
                       initialValues={{email: '', password: '', error: null}}
                       onSubmit={(values, {setErrors}) => userStore.login(values)
                           .catch(err => {setErrors({error : 'Incorrect email or password'})})}
                   >
                       {({handleSubmit, isSubmitting, errors}) => (
                           <Form className='ui large form' onSubmit={handleSubmit}  autoComplete='off'>
                               <Input placeholder='Email' name='email' type='email' />
                               <Input placeholder='Password' name='password' type='password' />
                               <ErrorMessage
                                   name='errors'
                                    render={() => <Label style={{marginTop: '10px', marginBottom: '10px'}}
                                    basic color={'red'}
                                                         content={errors.error}
                                />}
                               />
                               <Button disabled={isSubmitting} loading={isSubmitting} content='Login' positive fluid type='submit' />
                           </Form>
                       )}
                   </Formik>
                <Container>
                    <p>
                        for test reason, use : <br />
                        <details open={true}>
                            <strong>email : </strong> <span>admin@smartmediajo.com</span>
                            <strong>password : </strong> <span>Smart1234</span>
                        </details>
                    </p>
                </Container>
            </Container>
    )
})