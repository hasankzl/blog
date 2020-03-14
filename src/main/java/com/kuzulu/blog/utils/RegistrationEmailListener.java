package com.kuzulu.blog.utils;

import com.kuzulu.blog.model.UserToken;
import com.kuzulu.blog.model.Users;
import com.kuzulu.blog.service.UserService;
import com.kuzulu.blog.service.UserTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class RegistrationEmailListener implements ApplicationListener<OnRegistrationSuccessEvent> {
    @Autowired
    private UserService userService;
    @Autowired
    private UserTokenService userTokenService;
    @Autowired
    private MailSender mailSender;
    @Override
    public void onApplicationEvent(OnRegistrationSuccessEvent event) {
        this.confirmRegistration(event);
    }

    private void confirmRegistration(OnRegistrationSuccessEvent event){
        Users user = event.getUser();
        String token = UUID.randomUUID().toString();
        UserToken userToken = new UserToken();
        userToken.setUser(user);
        userToken.setToken(token);
        userTokenService.createVerificationToken(userToken);

        String recipient = user.getEmail();

        String subject = "Registration Confirmation";

        String url = event.getAppUrl()+"/confirmRegistration?token="+token;
        String message = "Thank you for registering.Please click on the below link to activate your account /n ";

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipient);
        email.setSubject(subject);
        email.setText(message+"http://localhost:8080"+url);
        mailSender.send(email);
    }
    private void forgotPassword(OnRegistrationSuccessEvent event){
        Users user = event.getUser();
        String token = UUID.randomUUID().toString();
        UserToken userToken = new UserToken();
        userToken.setUser(user);
        userToken.setToken(token);
        userTokenService.createVerificationToken(userToken);

        String recipient = user.getEmail();

        String subject = "Reset Pasword";

        String url = event.getAppUrl()+"/resetPassword?token="+token;
        String message = "Please click the link to reset your password";

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipient);
        email.setSubject(subject);
        email.setText(message+"http://localhost:8080"+url);
        mailSender.send(email);
    }
}