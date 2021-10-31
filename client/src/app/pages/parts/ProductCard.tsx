import React from "react";
import {Card, Icon, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Product} from "../../models/Product";



interface Props {
    product: Product | undefined
}

function ProductCard({product}: Props) {
    return (
        <Card>
            <Image as={Link} to={`/products/${product?.id}`}
                   wrapped ui={true}
                   style={{maxHeight: '19rem'}}
                   src={product?.img}  alt={product?.title}/>
            <Card.Content>
                <Card.Header as={Link} to={`/products/${product?.id}`}>{product?.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                </Card.Meta>
                <Card.Description style={{wordWrap: 'break-word'}}>
                    {product?.description}
                </Card.Description>
            </Card.Content>
            {
                !product?.modifiers ?
            <Card.Content extra>
                        <a href='/'>
                            <Icon name='options' />
                            Click to see options..
                        </a>
            </Card.Content>
                    :
                    ''
            }
        </Card>
    )
}


export default ProductCard