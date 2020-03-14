package com.kuzulu.blog.resource;

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
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.validation.ConstraintViolationException;
import javax.validation.constraints.Email;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.EventListener;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserResource {

    private final UserService userService;
    private final UserTokenService userTokenService;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @RequestMapping(value = "/sign-up", method = RequestMethod.POST)
    public void signUp(@RequestBody Users users, WebRequest request) throws Exception {
        try{
            users.setEnabled(false);
            userService.save(users);
        }catch (Exception e) {
            String error= e.getMessage().split(";")[2];
            throw new CustomException(error.substring(error.indexOf('.')+1,error.indexOf('_')));
        }
        try {
            String appUrl = request.getContextPath();
            eventPublisher.publishEvent(new OnRegistrationSuccessEvent(users, appUrl));
        } catch (Exception re) {
            re.printStackTrace();
        }

    }
    @RequestMapping(value = "/sendPasswordEmail",method = RequestMethod.POST)
    public void changePassword(@RequestBody  Users userEmail, WebRequest request) throws Exception {
        Users user = userService.findByEmail(userEmail.getEmail());
        if(user != null){

        try {
            String appUrl = request.getContextPath();
            eventPublisher.publishEvent(new OnRegistrationSuccessEvent(user, appUrl));
        } catch (Exception re) {
            re.printStackTrace();
        }  }
        else{
            throw new Exception();
        }

    }
    @GetMapping("/confirmRegistration")
    public String confirmRegistration(WebRequest webRequest, Model model, @RequestParam("token") String token) {
        UserToken userToken = userTokenService.findByToken(token);
        if (userToken == null) {
            return "access denied";
        }
        Users user = userToken.getUser();
        Calendar calendar = Calendar.getInstance();
        if (userToken.getExpiryDate().getTime() - calendar.getTime().getTime() <= 0) {
            return "access denied";
        }
        user.setEnabled(true);
        userService.save(user);
        return null;
    }
    @PostMapping("/resetPassword")
    public String ResetPassword(WebRequest webRequest, Model model, @RequestParam("token") String token,@RequestParam("password") String password) {
        UserToken userToken = userTokenService.findByToken(token);
        if (userToken == null) {
            return "access denied";
        }
        Users user = userToken.getUser();
        Calendar calendar = Calendar.getInstance();
        if (userToken.getExpiryDate().getTime() - calendar.getTime().getTime() <= 0) {
            return "access denied";
        }
        userService.changePassword(user,password);
        return null;
    }
}
