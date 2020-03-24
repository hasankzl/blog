package com.kuzulu.blog.repository;

import com.kuzulu.blog.model.PasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordTokenRepository extends JpaRepository<PasswordToken,Integer> {

    PasswordToken findByToken(String token);
}
