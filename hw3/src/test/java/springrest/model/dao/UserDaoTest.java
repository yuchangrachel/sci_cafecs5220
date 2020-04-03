package springrest.model.dao;
/*
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTransactionalTestNGSpringContextTests;
import org.testng.annotations.Test;

import springrest.model.User;

@Test(groups = "UserDaoTest")
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class UserDaoTest extends AbstractTransactionalTestNGSpringContextTests {

    @Autowired
    UserDao userDao;

    @Test
    public void getUser()
    {
        assert userDao.getUser( 1L ).getUsername().equalsIgnoreCase("yuk");
    }

    @Test
    public void getUsers()
    {
        assert userDao.getAllUsers().size() >= 2;
    }

    @Test
    public void saveUser()
    {
        User user = new User();
        user.setUsername( "test7" );
        user.setPassword( "abcd" );
        user.setFirstname("tester");
        user.setLastname("Smith");
        user.setEmail("ggfa@gmail.com");
        user.setPosition("student");
        user.setMajor("economic");
        user = userDao.saveUser( user );

        assert user.getId() != null;
    }
    
    

}
*/