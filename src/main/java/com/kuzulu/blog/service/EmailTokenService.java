package com.kuzulu.blog.service;

import com.kuzulu.blog.model.EmailToken;

public interface EmailTokenService {

  void save(EmailToken emailToken);
  EmailToken findByToken(String token);
}
