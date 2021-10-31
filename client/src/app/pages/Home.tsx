import React, {useEffect} from "react";
import {useStore} from "../store/store";
import {observer} from "mobx-react-lite";
import {Grid} from "semantic-ui-react";
import ProductCard from "./parts/ProductCard";

function Home() {
    const {productStore} = useStore()
    const {productsList: products} = productStore

    useEffect(() => {
        productStore.loadProducts()
    }, [productStore])
    return (
        <>
            <Grid columns={4} doubling={true}>
                {
                    products.map(product => (
                        <Grid.Column key={product.id}>
                            <ProductCard  product={product}/>
                        </Grid.Column>
                    ))
                }
            </Grid>
        </>
    );
}

export default observer(Home)