package springrest.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springrest.model.Role;
import springrest.model.User;

@RestController
public class TestController {
	//Run in webiste: http://localhost:8080/springrest/api/users   result can see in the database

	//run http://localhost:8080/springrest/api/test   result as below
    @RequestMapping("/test")
    public User test()
    {
        Role role = new Role();
        role.setId( 1L );
        role.setName( "Administrator" );

        User user = new User();
        user.setId( 1L );
        user.setUsername( "cysun" );
        user.getRoles().add( role );

        return user;
    }
    
    
    

}