import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import useGetData from '../custom-hooks/useGetData';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const Users = () => {
    const { data: UsersData, loading } = useGetData('user');

    const deleteUser = async (uid) => {
        try {
            await deleteDoc(doc(db, 'users', uid)); 
            toast.success('User deleted!');
        } catch (error) {
            toast.error('Failed to delete user.');
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        <h4 className="fw-bold">Users</h4>
                    </Col>
                    <Col lg="12" className="pt-5">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            <h5 className="pt-5 fw-bold">Loading...</h5>
                                        </td>
                                    </tr>
                                ) : UsersData?.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            No users available.
                                        </td>
                                    </tr>
                                ) : (
                                    UsersData?.map((user) => (
                                        <tr key={user.uid}>
                                            <td>{user.displayName}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => {
                                                        deleteUser(user.uid);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Users;
