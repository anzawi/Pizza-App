import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../store/store";
import {Button, Container, Form, Grid, Icon} from "semantic-ui-react";

import {Formik, FormikValues} from "formik";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import {randomBytes} from "crypto";
import Modifiers from "../components/Modifiers";
import PhotoWidget from "../components/image/PhotoWidget";
import {history} from "../../index";

function AddProduct() {
    const {productStore} = useStore()
    const {modifiers, setModifiers} = productStore
    useEffect(() => {
        productStore.loadProducts()
    }, [productStore])

    const [inputList, setInputList] = useState([])
    const [ids] = useState([{}])
    // const {imagUri/*, setImagUri*/} = productStore
     const {uploading} = productStore

    const handleAddModifier = () => {
        const id = randomBytes(20).toString('hex')
        const ob = {
            parent: id,
            child: []
        }
        setModifiers(id)
        ids.push(ob)
        // @ts-ignore
        setInputList(inputList.concat(<Modifiers key={id} id={id} ids={ids} />));
    }

    function handleSubmitForm(values: FormikValues) {
        productStore.create(values, ids).then(() => history.push('/dashboard'))
    }


    function uploadImage(file: Blob | null) {
        productStore.uploadImg(file).then((/*data*/) => {
            //setImagUri(`/public/images/${data}`)
        })
    }

    return (
        <Formik
            initialValues={{
                title: '',
                description: '',
                modifiers: modifiers,
                }}
            onSubmit={values => handleSubmitForm(values)}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                    <Form className='ui large form' onSubmit={handleSubmit}  autoComplete='off'>
                        <Input placeholder='Title' name='title' />
                        <TextArea placeholder='Description' name='description' />
                        <div style={{backgroundColor: '#eee', marginBottom: '10px'}}>
                            <Button
                                type='button'
                                icon
                                labelPosition='left'
                                primary
                                size='small'
                                onClick={handleAddModifier}
                            >
                                <Icon name='add' /> Add Modifier
                            </Button>
                            {inputList}
                        </div>
                        <Grid>
                            <Grid.Column>
                                <Container style={{padding: '15px', backgroundColor: '#e1e1e1', marginBottom: '20px'}}>
                                    <PhotoWidget uploadImage={uploadImage} uploading={uploading} />
                                </Container>
                            </Grid.Column>
                        </Grid>
                        <Button style={{marginBottom: '100px'}} disabled={isSubmitting} loading={isSubmitting} content='Save' positive fluid type='submit' />
                    </Form>
            )}
        </Formik>
    )
}


export default observer(AddProduct)