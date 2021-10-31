import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../store/store";
import { Button, Icon, Table } from "semantic-ui-react";
import {Link} from "react-router-dom";



function Dashboard() {
    const {productStore} = useStore()
    useEffect(() => {
        productStore.loadProducts()
    }, [productStore])
    return (
        <Table celled compact definition>
            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    productStore.productsList.map(product => (
                        <Table.Row key={product.id}>
                            <Table.Cell>{product.id}</Table.Cell>
                            <Table.Cell>{product.title}</Table.Cell>
                            <Table.Cell style={{overflow: 'hidden'}}>{product.description}</Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>

            <Table.Footer fullWidth>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan='4'>
                        <Button
                            floated='right'
                            icon
                            labelPosition='left'
                            primary
                            size='small'
                            as={Link} to='/dashboard/add'
                        >
                            <Icon name='add' /> Add Product
                        </Button>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}


export default observer(Dashboard)