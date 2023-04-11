import React, {useEffect, useState} from 'react';
import './HomePage.css'
import {Link} from "react-router-dom";

function HomePage() {
    const [customers, setCustomers] = useState([]);

    const deleteCustomer = (name) => {
        fetch(`http://localhost:8080/delete/${name}`,{
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data =>{
                const updatedCustomers = customers.filter(customer => customer.name !== name);
                setCustomers(updatedCustomers);
            })
            .catch(error =>{ console.log(error) })
    }

    useEffect(() => {
        fetch("http://localhost:8080")
            .then(response => response.json())
            .then(data => setCustomers(data))
    }, []);

    return (
        <div>
            <nav>
                <Link to="/add">Add customers</Link>
                <Link to="/">Home</Link>
            </nav>
            <div className="container">
                {customers ? (
                    <ul>
                        {customers.map(customer => (
                            <li key={customer.id}>
                                <p>Customer name: {customer.name}</p>
                                <p>Address: {customer.address}</p>
                                <p>VAT number: {customer.identificationNumber}</p>
                                <Link to={`/edit/${customer.name}`}>Edit</Link>
                                <button onClick={() => deleteCustomer(customer.name)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>There are no customers</div>
                )}
            </div>
        </div>
    );
}

export default HomePage;