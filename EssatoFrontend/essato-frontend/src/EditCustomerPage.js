import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';

function EditCustomerPage() {
    const { name } = useParams();
    const [updatedCustomer, setUpdatedCustomer] = useState({
        name: "",
        identificationNumber: "",
        address: ""
    });
    const [customerData, setCustomerData] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8080/${name}`)
            .then(response => response.json())
            .then(data => setCustomerData(data))
    }, [name]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!updatedCustomer.name) {
            console.error("Name cannot be empty");
            return;
        }
        editCustomer(name, updatedCustomer);    };

    const editCustomer = (name, updatedCustomer) => {
        fetch(`http://localhost:8080/${name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCustomer)
        })
            .then(response => response.json())
            .then(data => console.log('Customer updated: ', data))
    }

    return (
        <div>
            <nav>
                <Link to="/add">Add customers</Link>
                <Link to="/">Home</Link>
            </nav>
            <h1>Edit customer</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={updatedCustomer.name || customerData.name}
                    onChange={handleChange}
                />
                <label htmlFor="identificationNumber">VAT identification number:</label>
                <input
                    type="text"
                    id="identificationNumber"
                    name="identificationNumber"
                    placeholder={updatedCustomer.identificationNumber || customerData.identificationNumber}
                    onChange={handleChange}
                />
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder={updatedCustomer.address || customerData.address}

                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default EditCustomerPage;