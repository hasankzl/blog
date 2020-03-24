package com.kuzulu.blog.service.impl;

import com.kuzulu.blog.model.PasswordToken;
import com.kuzulu.blog.repository.PasswordTokenRepository;
import com.kuzulu.blog.service.PasswordTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PasswordTokenServiceImpl implements PasswordTokenService {

    private final PasswordTokenRepository passwordTokenRepository;

    @Override
    public void save(PasswordToken passwordToken) {

        passwordTokenRepository.save(passwordToken);
    }

    @Override
    public PasswordToken findByToken(String token) {
        return passwordTokenRepository.findByToken(token);
    }
}
