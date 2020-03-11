package com.kuzulu.blog.resource;

import com.kuzulu.blog.model.UserToken;
import com.kuzulu.blog.model.Users;
import com.kuzulu.blog.service.UserService;
import com.kuzulu.blog.service.UserTokenService;
import com.kuzulu.blog.utils.OnRegistrationSuccessEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

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
    public void signUp(@RequestBody Users users, WebRequest request) {
      userService.save(users);

        try{
            String appUrl = request.getContextPath();
            eventPublisher.publishEvent(new OnRegistrationSuccessEvent(users, appUrl));
        }catch(Exception re)
        {re.printStackTrace();}

    }
    @GetMapping("/confirmRegistration")
    public String confirmRegistration(WebRequest webRequest, Model model,@RequestParam("token") String token){
        UserToken userToken= userTokenService.findByToken(token);
        if(userToken ==null){
            return "access denied";
        }
        Users user = userToken.getUser();
        Calendar calendar= Calendar.getInstance();
        if(userToken.getExpiryDate().getTime() - calendar.getTime().getTime()<=0){
            return "access denied";
        }
        user.setEnabled(true);
        userService.save(user);
        return null;
    }
}
