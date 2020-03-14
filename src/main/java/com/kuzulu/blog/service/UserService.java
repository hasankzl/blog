package com.kuzulu.blog.service;

import com.kuzulu.blog.model.Users;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {

    void save(Users users);

    UserDetails findByUsername(String Username);

    void changePassword(Users user,String password);

    Users findByEmail(String email);
}
