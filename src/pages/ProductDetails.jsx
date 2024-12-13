import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import products from '../assets/data/products';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection.jsx';
import '../styles/products-details.css';
import { motion } from 'framer-motion';
import Productlist from '../components/UI/ProductsList.jsx';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice.jsx';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const [tab, setTab] = useState('desc'); // 'desc' or 'reviews' tab
  const reviewUser = useRef('');
  const reviewMsg = useRef('');
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = products.find(item => item.id === id);
  
  const [rating, setRating] = useState(null); // Rating for the product
  const [reviewRating, setReviewRating] = useState(null); // Rating for the review
  const [currentReviews, setCurrentReviews] = useState(product.reviews); // Local state for reviews

  const { imgUrl, productName, price, avgRating, description, shortDesc, category } = product;
  const relatedProducts = products.filter(item => item.category === category);

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    if (!reviewUserName || !reviewUserMsg || !reviewRating) {
      toast.error('Please fill out all fields and provide a rating!');
      return;
    }

    const newReview = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating: reviewRating,
    };

    // Add new review to local state
    setCurrentReviews((prevReviews) => [...prevReviews, newReview]);

    toast.success('Review Submitted');
    // Reset the form after submission
    reviewUser.current.value = '';
    reviewMsg.current.value = '';
    setReviewRating(null); // Reset review rating after submission
  };

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id,
      image: imgUrl,
      productName,
      price,
    }));
    toast.success('Product added successfully');
  };

  useEffect(() => {
    window.scrollTo(0, 0);  // Improved scroll position reset
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />

      <section>
        <Container>
          <Row>
            <Col lg="5">
              <img src={imgUrl} alt={productName} />
            </Col>

            <Col lg="7">
              <div className="products_details">
                <h2>{productName}</h2>
                <div className="product_rating d-flex align-items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} onClick={() => setRating(star)}>
                      <i className={star <= rating ? 'ri-star-fill' : 'ri-star-line'}></i>
                    </span>
                  ))}
                </div>
                <p>({avgRating} ratings)</p>

                <div className="d-flex align-items-center gap-5">
                  <span className="product_price">${price}</span>
                  <span>Category: {category}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>

                <motion.button whileTap={{ scale: 1.2 }} className="buy_btn mt-3" onClick={addToCart}>
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab_wrapper d-flex align-items-center gap-5">
                <h6 className={`${tab === 'desc' ? 'active_tab' : ''}`} onClick={() => setTab('desc')}>
                  Description
                </h6>
                <h6 className={`${tab === 'reviews' ? 'active_tab' : ''}`} onClick={() => setTab('reviews')}>
                  Reviews ({currentReviews.length})
                </h6>
              </div>

              <div className="tab_content mt-5">
                {tab === 'desc' ? (
                  <p>{description}</p>
                ) : (
                  <div className="product_review mt-5">
                    {currentReviews.length === 0 ? (
                      <p>No reviews yet.</p>
                    ) : (
                      <div className="review_wrapper">
                        <ul>
                          {currentReviews.map((item, index) => (
                            <li key={index} className="mb-4">
                              <h6>{item.userName}</h6>
                              <span>{item.rating} stars</span>
                              <p>{item.text}</p>
                            </li>
                          ))}
                        </ul>
                        <div className="review_form">
                          <h4>Leave your experience</h4>
                          <form onSubmit={submitHandler}>
                            <div className="form_group">
                              <input type="text" placeholder="Enter name" ref={reviewUser} required />
                            </div>
                            <div className="form_group d-flex align-items-center gap-5 rating_group">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <motion.span whileTap={{ scale: 1.2 }} key={star} onClick={() => setReviewRating(star)}>
                                  <i className={star <= reviewRating ? 'ri-star-s-fill' : 'ri-star-s-line'}></i>
                                </motion.span>
                              ))}
                            </div>

                            <div className="form_group">
                              <textarea ref={reviewMsg} rows={4} placeholder="Review Message..." required />
                            </div>
                            <motion.button whileTap={{ scale: 1.2 }} type="submit" className="buy_btn">
                              Submit
                            </motion.button>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related_title">You might also like</h2>
            </Col>
            <Productlist data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
