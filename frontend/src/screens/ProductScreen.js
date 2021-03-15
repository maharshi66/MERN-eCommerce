import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import {Row, Col, Button, ListGroup, Card, Image, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating';
import {listProductDetails, listProducts} from '../actions/productActions'
import { productDetailsReducer } from '../reducers/productReducers';
import Loader from '../components/Loader';
import Message from '../components/Message'

const ProductScreen = ({match}) => {

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    useEffect(() => {
         dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    console.log(product);
    return (
        <>
         <Link to='/' className="btn btn-light my-3">Go Back</Link>
         {loading ? <Loader /> : error ? 
                    <Message variant='danger'>{error}</Message>
                : (
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

                )   }
  
        </>
    )
}

export default ProductScreen
