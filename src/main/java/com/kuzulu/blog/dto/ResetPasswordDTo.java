package com.kuzulu.blog.dto;

import lombok.Data;

@Data
public class ResetPasswordDTo {

    private String token;
    private String password;
}
