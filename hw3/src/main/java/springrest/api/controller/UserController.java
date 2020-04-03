package springrest.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import springrest.api.error.RestException;
import springrest.model.User;
import springrest.model.dao.UserDao;

@RestController
public class UserController {

    @Autowired
    private UserDao userDao;

    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    public User getUser( @PathVariable Long id )
    {
        return userDao.getUser( id );
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<User> getUsers()
    {
        return userDao.getAllUsers();
    }
    
    
    //user registration like addUser
    @RequestMapping(value= "/users", method = RequestMethod.POST)
    public User addUser(@RequestBody User user ) {
    	if((user.getUsername() == null || user.getPassword() == null || user.getFirstname() == null || user.getLastname() == null || user.getPosition() == null || user.getEmail() == null) 
    			|| (user.getMajor() == null && user.getUnit() == null))
            throw new RestException( 400, "Failed registration since missing part of user's information." );
    	
    	try {
    		return userDao.saveUser( user );
    	} catch(Exception e) {
    		throw new RestException(400, "Username already registered/exists");
    	}
    }
    
    
    
}
