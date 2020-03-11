package com.kuzulu.blog.utils;

import com.kuzulu.blog.model.Users;
import org.springframework.context.ApplicationEvent;

public class OnRegistrationSuccessEvent extends ApplicationEvent {
    private static final long serialVersionUID = 1L;
    private String appUrl;
    private Users user;

    public OnRegistrationSuccessEvent(Users user, String appUrl) {
        super(user);
        this.user = user;
        this.appUrl = appUrl;
    }

    public String getAppUrl() {
        return appUrl;
    }

    public void setAppUrl(String appUrl) {
        this.appUrl = appUrl;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}