import React from 'react';
import '../styles/cart.css';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection.jsx';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import { cartActions } from '../redux/slices/cartSlice.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const totalAmount = useSelector(state=>state.cart.totalAmount);
  // Function to handle item removal
  const handleRemoveItem = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  return (
    <Helmet title='Cart'>
      <CommonSection title='Shopping Cart' />
      <section>
        <Container>
          <Row>
            <Col lg='9'>
              {cartItems.length === 0 ? (
                <h2>No item added to the cart</h2>
              ) : (
                <table className='table bordered'>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr 
                        key={index} 
                        item={item} 
                        handleRemoveItem={handleRemoveItem} // Passing the function as a prop
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg='3'>
              <div>
                <h6 className='d-flex align-items-center justify-content-between'>Subtotal
                <span className='fs-4 fw-bold'>${totalAmount}</span>
                </h6>
              </div>
              <p className='fs-6 mt-2'>taxes and shipping will calculate in checkout</p>
              <div>
                <button className="buy_btn mt-3 w-100">
                  <Link to='/checkout'>Checkout</Link>
                  </button>
                  <button className="buy_btn mt-3 w-100 ">
                  <Link to='/shop'>Continue shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

// Tr component now receives handleRemoveItem as a prop
const Tr = ({ item, handleRemoveItem }) => {

  const dispatch = useDispatch()
  const deleteProduct = ()=>{
    dispatch(cartActions.deleteItem(item.id))
  }
  return (  
    <tr>
      <td><img src={item.imgUrl} alt="" /></td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>  
      <td>
        <motion.i
          className="ri-delete-bin-6-line"
          whileTap={{ scale: 1.2 }}
          onClick={deleteProduct} // Now we can call the function
        ></motion.i>
      </td>
    </tr>
  );
};

export default Cart;
