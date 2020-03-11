package com.kuzulu.blog.security;

public class SecurityConstants {
    public static final String SECRET = "Emakina";
    public static final long EXPIRATION_TIME = 423_000_000; // 5 gün
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "/user/sign-up";
    public static final String CONFIRM_REGISTRATION="/user/confirmRegistration";
}
