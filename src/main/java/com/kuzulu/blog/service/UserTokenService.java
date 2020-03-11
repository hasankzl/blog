package com.kuzulu.blog.service;

import com.kuzulu.blog.model.UserToken;
import com.kuzulu.blog.model.Users;

public interface UserTokenService {

    void createVerificationToken(UserToken userToken);
    UserToken findByToken(String token);
}
