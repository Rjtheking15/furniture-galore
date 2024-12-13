import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from 'react-toastify';
import { db } from '../firebase.config.jsx'; // Firestore import only
import { addDoc, collection } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState('');
  const [enterShortDesc, setEnterShortDesc] = useState('');
  const [enterDiscription, setEnterDiscription] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [setEnterProductImg] = useState(null); // Image is not going to be uploaded
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const AddProducts = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ensure all fields are filled out
      if (!enterTitle || !enterShortDesc || !enterPrice || !enterCategory) {
        toast.error("Please fill out all fields.");
        setLoading(false);
        return;
      }

      const docRef = collection(db, 'products');

      await addDoc(docRef, {
        title: enterTitle,
        shortDesc: enterShortDesc,
        description: enterDiscription,
        category: enterCategory,
        price: enterPrice,
      
      });

      setLoading(false);
      toast.success('Product successfully added!');
      navigate('/dashboard/all-products');
    } catch (err) {
      setLoading(false);
      toast.error('Product not added!');
      console.error("Error adding product:", err);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            {
              loading ? <h4 className='py-5'>Loading......</h4> : <>
                          <h4>Add Product</h4>
            <Form onSubmit={AddProducts}>
              <FormGroup className='form_group'>
                <span>Product Title</span>
                <input
                  type="text"
                  placeholder='Sofa'
                  value={enterTitle}
                  onChange={e => setEnterTitle(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className='form_group'>
                <span>Short Description</span>
                <input
                  type="text"
                  placeholder='Lorem....'
                  value={enterShortDesc}
                  onChange={e => setEnterShortDesc(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className='form_group'>
                <span>Description</span>
                <input
                  type="text"
                  placeholder='Description....'
                  value={enterDiscription}
                  onChange={e => setEnterDiscription(e.target.value)}
                  required
                />
              </FormGroup>
              <div className='d-flex align-items-center justify-content-between gap-5'>
                <FormGroup className='form_group w-50'>
                  <span>Price</span>
                  <input
                    type="number"
                    placeholder='$899'
                    value={enterPrice}
                    onChange={e => setEnterPrice(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className='form_group w-50'>
                  <span>Category</span>
                  <select
                    className='w-100 p-2'
                    value={enterCategory}
                    onChange={e => setEnterCategory(e.target.value)}
                  >
                    <option value="chair">Chair</option>
                    <option value="sofa">Sofa</option>
                    <option value="table">Table</option>
                    <option value="pillow">Pillow</option>
                    <option value="stool">Stool</option>
                  </select>
                </FormGroup>
              </div>
              <div>
                <FormGroup className='form_group'>
                  <input
                    type="file"
                    onChange={e => setEnterProductImg(e.target.files[0])} // This will still allow image input but not upload
                  />
                </FormGroup>
              </div>
              <button className="buy_btn" type="submit">Add Product</button>
            </Form>
              
              </>
            }
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
