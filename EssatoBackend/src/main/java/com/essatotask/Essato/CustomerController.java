package com.essatotask.Essato;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("")
    public List<Customer> getAllCustomers(){
        return customerRepository.findAll();
    }

    @GetMapping("/{name}")
    public Customer getCustomerByName(@PathVariable String name){
        return customerRepository.findByName(name);
    }
    @PutMapping("/{name}")
    public ResponseEntity<?> editCustomer(@RequestBody Customer updatedCustomer, @PathVariable String name){
        Customer customer = customerRepository.findByName(name);

        customer.setName(updatedCustomer.getName());
        customer.setAddress(updatedCustomer.getAddress());
        customer.setIdentificationNumber(updatedCustomer.getIdentificationNumber());

        Customer savedCustomer = customerRepository.save(customer);

        return ResponseEntity.ok().body(savedCustomer);
    }

    @PostMapping("/add")
    public Customer addCustomer(@RequestBody Customer customer){
        return customerRepository.save(customer);
    }

    @DeleteMapping("/delete/{name}")
    public ResponseEntity<?> deleteCustomer(@PathVariable String  name){
        Customer customer =customerRepository.findByName(name);
        if(customer == null){
            return ResponseEntity.notFound().build();
        }
        customerRepository.delete(customer);
        return ResponseEntity.ok().build();
    }



}
