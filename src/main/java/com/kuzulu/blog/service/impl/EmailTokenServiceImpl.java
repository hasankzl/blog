package com.kuzulu.blog.service.impl;

import com.kuzulu.blog.model.EmailToken;
import com.kuzulu.blog.repository.EmailTokenRepository;
import com.kuzulu.blog.service.EmailTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class EmailTokenServiceImpl implements EmailTokenService {

    public final EmailTokenRepository emailTokenRepository;

    @Override
    public void save(EmailToken emailToken) {
        Date dt = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(dt);
        c.add(Calendar.DATE, 1);
        emailToken.setCreatedDate(dt);
        emailToken.setExpiryDate(c.getTime());
        emailTokenRepository.save(emailToken);
    }

    @Override
    public EmailToken findByToken(String token) {
        return emailTokenRepository.findByToken(token);
    }
}
