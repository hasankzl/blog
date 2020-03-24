package com.kuzulu.blog.repository;

import com.kuzulu.blog.model.EmailToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailTokenRepository extends JpaRepository<EmailToken, Integer> {
    EmailToken findByToken(String token);
}
