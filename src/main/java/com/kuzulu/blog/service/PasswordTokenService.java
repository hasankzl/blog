package com.kuzulu.blog.service;

import com.kuzulu.blog.model.PasswordToken;

public interface PasswordTokenService {

    void save(PasswordToken passwordToken);
    PasswordToken findByToken(String token);
}
