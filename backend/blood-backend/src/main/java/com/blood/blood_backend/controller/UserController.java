package com.blood.blood_backend.controller;


import com.blood.blood_backend.entity.User;
import com.blood.blood_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Signup/Register
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    // Login
    @PostMapping("/login")
    public User loginUser(@RequestBody User loginData) {
        return userService.login(loginData.getEmail(), loginData.getPassword());
    }

    // Get user by id (optional)
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}

