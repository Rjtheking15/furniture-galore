import React, { useState, useEffect, useCallback } from 'react';
import CommonSection from '../components/UI/CommonSection.jsx';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import '../styles/shop.css';
import products from '../assets/data/products';
import ProductsList from '../components/UI/ProductsList.jsx';

const Shop = () => {
  // Initial products data state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [productsData, setProductsData] = useState(products); // Initialize with the full list

  // Handle category filter
  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  // Handle search functionality
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Handle sort functionality
  const handleSort = (e) => {
    setSortOrder(e.target.value);
  };

  // Memoized function to filter products based on category and search term
  const filterProducts = useCallback(() => {
    let filtered = [...products]; // Copy the original products array

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory]); // Dependencies: changes in searchTerm or selectedCategory

  // Memoized function to sort products
  const sortProducts = useCallback((filteredProducts) => {
    let sorted = [...filteredProducts]; // Copy filtered products to avoid mutation

    if (sortOrder === 'ascending') {
      sorted.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (sortOrder === 'descending') {
      sorted.sort((a, b) => b.productName.localeCompare(a.productName));
    } else if (sortOrder === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    return sorted;
  }, [sortOrder]); // Dependencies: changes in sortOrder

  // Update productsData whenever filters or sorting changes
  useEffect(() => {
    let filtered = filterProducts();
    let sorted = sortProducts(filtered);
    setProductsData(sorted); // Update the productsData state with sorted products
  }, [filterProducts, sortProducts]); // Now dependencies are correctly set

  return (
    <Helmet title="Shop">
      <CommonSection title="Create a Cozy Home" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="4">
              <div className="filter__widget">
                <select onChange={handleCategoryFilter} value={selectedCategory}>
                  <option value="">Sort By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="chair">Chair</option>
                  <option value="table">Table</option>
                  <option value="pillow">Pillow</option>
                  <option value="stool">Stool</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className='text-end'>
              <div className="filter__widget">
                <select onChange={handleSort} value={sortOrder}>
                  <option value="">Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search....." 
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {
              productsData.length === 0 ? (
                <h1 className='text-center fs-4'>No products found!</h1>
              ) : (
                <ProductsList data={productsData} />
              )
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
