package com.kuzulu.blog.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@Table(name = "article")
public class Article implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    private String article_name;

    private String article_body;

    private Integer subject_id;

    private Date created_date;

    private Date updated_date;
}
