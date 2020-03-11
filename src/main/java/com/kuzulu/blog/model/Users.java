package com.kuzulu.blog.model;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.Collection;

@Entity
@Data
@Table(name = "user")
public class Users implements Serializable, UserDetails {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer user_id;
    @NotEmpty(message = "Username can't be null.")
    private String username;
    @NotEmpty(message = "Password can't be null.")
    private String password;
    @NotEmpty(message = "Name can't be null.")
    private String name;
    @NotEmpty(message = "email can't be null.")
    @Email
    private String email;
    @Column(name = "isEnabled")
    private boolean isEnabled;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
