import React, { useState } from "react";
import './AddCustomerPage.css'
import {Link} from "react-router-dom";

function AddCustomerPage() {
    const [customer, setCustomer] = useState({
        name: "",
        identificationNumber: "",
        creationDate: new Date().toISOString().substr(0, 10),
        address: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!customer.name) {
            console.error("Name cannot be empty");
            return;
        }
        console.log(customer);
        try {
            const response = await fetch("http://localhost:8080/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(customer),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <nav>
                <Link to="/add">Add customers</Link>
                <Link to="/">Home</Link>
            </nav>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={customer.name}
                onChange={handleChange}
            />
            <label htmlFor="identificationNumber">
                VAT identification number:
            </label>
            <input
                type="text"
                id="identificationNumber"
                name="identificationNumber"
                value={customer.identificationNumber}
                onChange={handleChange}
            />
            <label htmlFor="address">Address:</label>
            <input
                type="text"
                id="address"
                name="address"
                value={customer.address}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}

export default AddCustomerPage;