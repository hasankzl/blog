package com.kuzulu.blog.service;

import com.kuzulu.blog.model.Users;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {

    void save(Users user);

    void update(Users user);

    UserDetails findByUsername(String Username);

    Users getUserByUsername(String username);

    void changePassword(Users user,String password);

    Users findByEmail(String email);

    void confirmEmail(Users user);
}
