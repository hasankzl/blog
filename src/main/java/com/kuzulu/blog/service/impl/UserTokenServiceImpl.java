package com.kuzulu.blog.service.impl;

import com.kuzulu.blog.model.UserToken;
import com.kuzulu.blog.model.Users;
import com.kuzulu.blog.repository.UserTokenRepository;
import com.kuzulu.blog.service.UserTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class UserTokenServiceImpl implements UserTokenService {

    private final UserTokenRepository userTokenRepository;
    @Override
    public void createVerificationToken(UserToken userToken) {
        Date dt = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(dt);
        c.add(Calendar.DATE, 1);
        userToken.setCreatedDate(dt);
        userToken.setExpiryDate(c.getTime());
    userTokenRepository.save(userToken);
    }

    @Override
    public UserToken findByToken(String token) {
        return  userTokenRepository.findByToken(token);
    }
}
