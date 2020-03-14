package com.kuzulu.blog.utils.error;

import lombok.Data;

@Data
public class CustomException extends RuntimeException {
    private String message;

    public CustomException(String s){
       this.message = s;
    }
}
