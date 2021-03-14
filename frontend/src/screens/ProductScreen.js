import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import {Row, Col, Button, ListGroup, Card, Image, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating';
import axios from 'axios';

const ProductScreen = ({match}) => {
    const [product,setProduct] = useState({}) 

    useEffect(() => {
        const fetchProduct = async() => {
            const {data} = await axios.get(`/api/products/${match.params.id}`)
            setProduct(data); 
        }

        fetchProduct();
    }, [match])

    console.log(product);
    return (
        <>
         <Link to='/' className="btn btn-light my-3">Go Back</Link>
         <Row>
             <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
             </Col>
             <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description: Sample Text
                    </ListGroup.Item>
                </ListGroup>
             </Col>
             <Col md={3}>
                 <Card>
                     <ListGroup variant='flush'>
                         <ListGroupItem>
                            <Row>
                                <Col>
                                    Price
                                </Col>
                                <Col>
                                    <strong>{product.price}</strong> 
                                </Col>
                            </Row>
                         </ListGroupItem>
                     </ListGroup>

                     <ListGroup variant='flush'>
                         <ListGroupItem>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    <strong>{product.countIntStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong> 
                                </Col>
                            </Row>
                         </ListGroupItem>
                         <ListGroup.Item>
                            <Button className="btn-block" type='button' disabled={product.countInStock === 0}>
                              Add to Cart  
                            </Button>
                         </ListGroup.Item>
                     </ListGroup>
                 </Card>
             </Col>
         </Row>
        </>
    )
}

export default ProductScreen
