package com.kuzulu.blog.service.impl;
import com.kuzulu.blog.model.Users;
import com.kuzulu.blog.repository.UserRepository;
import com.kuzulu.blog.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void save(Users user) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
    }

    @Override
    public UserDetails findByUsername(String Username) throws UsernameNotFoundException {
        Users user = userRepository.findByUsername(Username);

        if(user == null){
            throw new UsernameNotFoundException(Username);
        }
        else {
            return new User(user.getUsername(), user.getPassword(), emptyList());
        }
    }

    @Override
    public void changePassword(Users user, String password) {
        user.setPassword(bCryptPasswordEncoder.encode(password));
        userRepository.save(user);
    }

    @Override
    public Users findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
