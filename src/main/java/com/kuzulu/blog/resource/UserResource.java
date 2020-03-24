package com.kuzulu.blog.resource;

import com.kuzulu.blog.dto.ResetPasswordDTo;
import com.kuzulu.blog.model.EmailToken;
import com.kuzulu.blog.model.PasswordToken;
import com.kuzulu.blog.model.UserToken;
import com.kuzulu.blog.model.Users;
import com.kuzulu.blog.service.EmailTokenService;
import com.kuzulu.blog.service.PasswordTokenService;
import com.kuzulu.blog.service.UserService;
import com.kuzulu.blog.service.UserTokenService;
import com.kuzulu.blog.utils.OnRegistrationSuccessEvent;
import com.kuzulu.blog.utils.error.CustomException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.hibernate.exception.SQLGrammarException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.UUID;

import static com.kuzulu.blog.security.SecurityConstants.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserResource {

    private final UserService userService;
    private final UserTokenService userTokenService;
    private final EmailTokenService emailTokenService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private  final PasswordTokenService passwordTokenService;
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
    @PostMapping("/changeEmail")
    public void changeEmail(@RequestBody Users user,HttpServletRequest httpServletRequest) throws Exception {
            Users currentUser = getUserFromToken(httpServletRequest);
        try {
            String token = UUID.randomUUID().toString();
            EmailToken emailToken = new EmailToken();
            emailToken.setUser(currentUser);
            emailToken.setToken(token);
            emailToken.setEmail(user.getEmail());
            emailTokenService.save(emailToken);
            String recipient = currentUser.getEmail();
            String subject = "Change Email";

            String url = "/changeEmailConfirm/?" + token;
            String message = "Please click the link to change your email adress ";

            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(recipient);
            email.setSubject(subject);
            email.setText(message + "http://localhost:3000/#" + url);
            mailSender.send(email);
        } catch (Exception re) {
            throw new Exception(re);
        }
    }
    @PostMapping("/changeEmailConfirm")
    public void changeEmailConfirm(@RequestBody EmailToken token) throws Exception {

        EmailToken emailToken= emailTokenService.findByToken(token.getToken());

        if (emailToken==null) {
            throw  new Exception("error");
        } else {
            Users user= emailToken.getUser();
            user.setEmail(emailToken.getEmail());
            userService.save(user);
        }
    }
    @GetMapping("/")
    public  Users getUser(HttpServletRequest httpServletRequest){
            Users user =  getUserFromToken(httpServletRequest);
            user.setPassword("");
            return user;
    }

    public Users getUserFromToken(HttpServletRequest request){
        String token = request.getHeader(HEADER_STRING);

        String user = Jwts.parser()
                .setSigningKey(SECRET.getBytes())
                .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                .getBody()
                .getSubject();

        return userService.getUserByUsername(user);
    }
    @PostMapping("/updateUser")
    public void update(@RequestBody Users update,HttpServletRequest request) throws Exception {

        Users currentUser =  getUserFromToken(request);
        // tokenden gelen kullanıcıyla aynı olduğu kontrol edilir
        if(bCryptPasswordEncoder.matches(update.getPassword(),currentUser.getPassword())){
            if(update.getUser_id().equals(currentUser.getUser_id())){
                update.setPassword(currentUser.getPassword());
                update.setEnabled(true);
                userService.update(update);
            }else{
                throw new Exception("don't try something like this !!");
            }
        }
        else{
            throw new Exception("Please check the password");
        }
    }
    @PostMapping("/changePassword")
    public void changePassword(@RequestBody Users user, HttpServletRequest request) throws Exception {
        Users currentUser = getUserFromToken(request);
        try {
            String token = UUID.randomUUID().toString();
            PasswordToken passwordToken = new PasswordToken();
            passwordToken.setUser(currentUser);
            passwordToken.setToken(token);
            passwordToken.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            passwordTokenService.save(passwordToken);
            String recipient = currentUser.getEmail();
            String subject = "Change Password";

            String url = "/changePasswordConfirm/?" + token;
            String message = "Please click the link to change your password ";

            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(recipient);
            email.setSubject(subject);
            email.setText(message + "http://localhost:3000/#" + url);
            mailSender.send(email);
        } catch (Exception re) {
            throw new Exception(re);
        }
    }
    @PostMapping("/changePasswordConfirm")
    public void changePasswordConfirm(@RequestBody PasswordToken token) throws Exception {
        PasswordToken passwordToken= passwordTokenService.findByToken(token.getToken());

        if (passwordToken==null) {
            throw  new Exception("error");
        } else {
            Users user= passwordToken.getUser();
            user.setPassword(passwordToken.getPassword());
            userService.update(user);
        }
    }
}
