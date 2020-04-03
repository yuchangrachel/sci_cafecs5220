package springrest.model.dao;

import java.util.List;

import springrest.model.User;

public interface UserDao {

    User getUser( Long id );

    List<User> getAllUsers();

    User saveUser( User user );

}