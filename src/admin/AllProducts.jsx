import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import useGetData from '../custom-hooks/useGetData'
import { toast } from 'react-toastify';
const AllProducts = () => {
  const { data:productsData, loading, error } = useGetData('products');

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id)); 
    toast.success('Deleted!');
  };

  if (error) {
    return <h4 className='py-5 text-center fw-bold'>Error fetching products: {error.message}</h4>;
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      <h5 className="pt-5 fw-bold">Loading...</h5>
                    </td>
                  </tr>
                ) : productsData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">No products available</td>
                  </tr>
                ) : (
                  productsData.map((item) => (
                    <tr key={item.id}>
                       <td>
                      <img src={item.img} alt='' />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td>
                        <button
                          onClick={() => {
                            deleteProduct(item.id);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>w
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
