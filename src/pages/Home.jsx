import { useEffect, useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img.png';
import '../styles/home.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Services from '../services/Services';
import ProductsList from '../components/UI/ProductsList';
import products from '../assets/data/products';
import counterImg from '../assets/images/counter-timer-img.png';
import Clock from '../components/UI/Clock';


const Home = () => {


  const [TrendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [pillowProducts, setPillowProducts] = useState([]);
  const [tableProducts, setTableProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const year = new Date().getUTCFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      item => item.category === 'chair'
    );
    const filteredBestSalesProducts = products.filter(
      item => item.category ==='sofa'
    );
    const filteredPillowProducts = products.filter(
      item => item.category ==='pillow'
    );
    const filteredTableProducts = products.filter(
      item => item.category === 'table'
    );
    const filteredPopularProducts = products.filter(
      item => item.category === 'stool'
    );

    // Set filtered products to respective states
    setBestSalesProducts(filteredBestSalesProducts);
    setTrendingProducts(filteredTrendingProducts);
    setPopularProducts(filteredPopularProducts);
    setPillowProducts(filteredPillowProducts);
    setTableProducts(filteredTableProducts);
  }, []);

  return (
    <Helmet title="Home">
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Discover unique furniture and decor for your home and outdoor space.</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus officia hic,
                  molestias ipsam nihil harum asperiores veniam exercitationem aliquam rem!
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy_btn">
                  <Link to="/shop">SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="Hero" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            <ProductsList data={TrendingProducts} />
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Sales</h2>
            </Col>
            <ProductsList data={bestSalesProducts} />
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="Clock__top-content">
                <h4 className="text-white fs-7 mb-2">Limited Offer</h4>
                <h3 className="text-white fs-7 mb-3">Quality Armchair</h3>
              </div>

              <Clock />
              <motion.button whileTap={{ scale: 1.2 }} className="buy_btn store_btn">
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>

            <Col lg="6" md="6" className="text-end counter__img" >
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            <ProductsList data={pillowProducts} />
            <ProductsList data={tableProducts} />
          </Row>
        </Container>
      </section>

      <section className="Popular__Category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Popular in category</h2>
            </Col>
            <ProductsList data={popularProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;