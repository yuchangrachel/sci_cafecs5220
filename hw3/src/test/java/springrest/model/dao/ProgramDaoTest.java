/*
package springrest.model.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTransactionalTestNGSpringContextTests;
import org.testng.annotations.Test;

import springrest.model.Program;

@Test
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class ProgramDaoTest extends AbstractTransactionalTestNGSpringContextTests {

    @Autowired
    ProgramDao programDao;

    @Test
    public void getProgram()
    {
        assert programDao.getProgram( 1L ).getId() != null;
    }

    @Test
    public void getPrograms()
    {
        assert programDao.getAllPrograms().size() >= 2;
    }

    @Test
    public void saveProgram()
    {
        Program program = new Program();
        program.setName("testedit");
        program.setFullname("waiting for changing");
        program.setDescription("test for editing program");
        program = programDao.saveProgram( program );

        assert program.getId() != null;
    }
    
    

}
*/