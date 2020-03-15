package com.kuzulu.blog.resource;

import com.kuzulu.blog.dto.ResetPasswordDTo;
import com.kuzulu.blog.model.UserToken;
import com.kuzulu.blog.model.Users;
import com.kuzulu.blog.service.UserService;
import com.kuzulu.blog.service.UserTokenService;
import com.kuzulu.blog.utils.OnRegistrationSuccessEvent;
import com.kuzulu.blog.utils.error.CustomException;
import lombok.RequiredArgsConstructor;
import org.hibernate.exception.SQLGrammarException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.validation.ConstraintViolationException;
import javax.validation.constraints.Email;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.EventListener;
import java.util.UUID;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserResource {

    private final UserService userService;
    private final UserTokenService userTokenService;

    @Autowired
    private ApplicationEventPublisher eventPublisher;
    @Autowired
    private MailSender mailSender;

    @RequestMapping(value = "/sign-up", method = RequestMethod.POST)
    public void signUp(@RequestBody Users users, WebRequest request) throws Exception {
        try {
            users.setEnabled(false);
            userService.save(users);
        } catch (Exception e) {
            String error = e.getMessage().split(";")[2];
            throw new CustomException(error.substring(error.indexOf('.') + 1, error.indexOf('_')));
        }
        try {
            String appUrl = request.getContextPath();
            eventPublisher.publishEvent(new OnRegistrationSuccessEvent(users, appUrl));
        } catch (Exception re) {
            re.printStackTrace();
        }

    }

    @RequestMapping(value = "/sendPasswordEmail", method = RequestMethod.POST)
    public void changePassword(@RequestBody Users userEmail, WebRequest request) throws Exception {
        Users user = userService.findByEmail(userEmail.getEmail());
        if (user != null) {

            try {
                String token = UUID.randomUUID().toString();
                UserToken userToken = new UserToken();
                userToken.setUser(user);
                userToken.setToken(token);
                userTokenService.createVerificationToken(userToken);

                String recipient = user.getEmail();

                String subject = "Reset Pasword";

                String url = "/forgotPassword/?" + token;
                String message = "Please click the link to reset your password ";

                SimpleMailMessage email = new SimpleMailMessage();
                email.setTo(recipient);
                email.setSubject(subject);
                email.setText(message + "http://localhost:3000/#" + url);
                mailSender.send(email);
            } catch (Exception re) {
                re.printStackTrace();
            }
        } else {
            throw new Exception();
        }

    }

    @PostMapping("/confirmRegistration")
    public String confirmRegistration(WebRequest webRequest, Model model, @RequestBody ResetPasswordDTo token) {
        UserToken userToken = userTokenService.findByToken(token.getToken());
        if (userToken == null) {
            return "access denied";
        }
        Users user = userToken.getUser();
        Calendar calendar = Calendar.getInstance();
        if (userToken.getExpiryDate().getTime() - calendar.getTime().getTime() <= 0) {
            return "access denied";
        }
        user.setEnabled(true);
        userService.confirmEmail(user);
        return null;
    }

    @PostMapping("/resetPassword")
    public String ResetPassword(WebRequest webRequest, Model model, @RequestBody ResetPasswordDTo resetPasswordDTo) throws Exception {
        UserToken userToken = userTokenService.findByToken(resetPasswordDTo.getToken());
        if (userToken == null) {
            throw new Exception();
        }
        Users user = userToken.getUser();
        Calendar calendar = Calendar.getInstance();
        if (userToken.getExpiryDate().getTime() - calendar.getTime().getTime() <= 0) {
            throw new Exception();
        }
        userService.changePassword(user, resetPasswordDTo.getPassword());
        return "Password changed succesfully";
    }
}
