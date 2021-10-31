import React, {useEffect} from "react";
import {useStore} from "../store/store";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import ProductCard from "./parts/ProductCard";
import {Container, Grid, List} from "semantic-ui-react";

function Product() {
    const {productStore} = useStore()
    const {id} = useParams<{ id: string }>()
    const {product} = productStore

    useEffect(() => {
        productStore.loadProduct(id)
    }, [productStore, id])

    return (
        <Container style={{marginTop: '7em'}}>
            <Grid stackable={true}>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <ProductCard product={product}/>
                    </Grid.Column>

                    <Grid.Column>
                        <List>
                            {
                                product?.modifiers.map(modifier => (
                                    <List.Item key={modifier.id}>
                                        <List.Header>{modifier.name}</List.Header>
                                            {
                                                <List as='ol'>
                                                    {
                                                        modifier.modifierDetails.map(option => (
                                                            <List.Item key={option} as='li' value='*'>
                                                                {option}
                                                            </List.Item>
                                                        ))
                                                    }
                                                </List>
                                            }
                                    </List.Item>
                                ))
                            }
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

export default observer(Product)