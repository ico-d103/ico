package com.ico.api.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic()
                .and()
                .authorizeRequests()
                .antMatchers("/teacher/**").access("hasRole('Teacher') and principal.teacher.role == 'Teacher'")    // UserDetails 객체를 생성할 때, Teacher 엔티티 정보를 포함시켜야 한다.
                .antMatchers("student/**").hasRole("Student")
                .antMatchers("admin/**").hasRole("iCoAdmin")
                .anyRequest().permitAll()
                .and()
                .csrf().disable();
    }
}
