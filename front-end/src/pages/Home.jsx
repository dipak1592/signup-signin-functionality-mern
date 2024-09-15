import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const url = "signup-signin-functionality-mern-api.vercel.app/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                },
            };
            const response = await fetch(url, headers);
            const result = await response.json();
            setProducts(result);
        } catch (err) {
            handleError(err.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Welcome, <span className="text-indigo-600">{loggedInUser}</span>
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
                    >
                        Logout
                    </button>
                </div>

                <h2 className="text-xl font-semibold text-gray-700 mb-6">Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products && products.length > 0 ? (
                        products.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                            >
                                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                                <p className="text-gray-600">Price: ${item.price}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No products available.</p>
                    )}
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Home;
