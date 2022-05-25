package com.hcl.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //Protecting the endpoint /api/orders
        http.authorizeRequests()
                .antMatchers("/api/orders/**")
                .authenticated()
                .and()
                .oauth2ResourceServer()
                .jwt();

        //Adding CORS filters
        http.cors();

        //force a non-empty response body for 401's to make a more friendly response
        Okta.configureResourceServer401ResponseBody(http);

        //Disabling CSRF since we're not using cookies
        http.csrf().disable();
    }
}
