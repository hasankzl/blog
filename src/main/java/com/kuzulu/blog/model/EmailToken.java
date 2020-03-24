package com.kuzulu.blog.model;

import lombok.Data;
import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

@Data
@Entity
@Table(name = "emailToken")
public class EmailToken {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer token_id;

    @OneToOne(targetEntity = Users.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    private String email;

    private String token;
    @Column(name="created_date")
    private Date createdDate;
    @Column(name="expiry_date")
    private Date expiryDate;
    private Date calculateExpiryDate(int expiryTimeInMinutes){
        Calendar calendar =Calendar.getInstance();
        calendar.setTime(new Timestamp((calendar.getTime().getTime())));
        calendar.add(Calendar.MINUTE,expiryTimeInMinutes);
        return  new Date(calendar.getTime().getTime());
    }
}
