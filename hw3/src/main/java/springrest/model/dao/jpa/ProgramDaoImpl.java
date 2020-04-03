package springrest.model.dao.jpa;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import springrest.model.Program;
import springrest.model.dao.ProgramDao;

@Repository
public class ProgramDaoImpl implements ProgramDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Program getProgram( Long id )
    {
        return entityManager.find( Program.class, id );
    }

    @Override
    public List<Program> getAllPrograms()
    {
        return entityManager.createQuery( "from Program order by id", Program.class )
            .getResultList();
    }
    
    @Override
    @Transactional
    public void deleteProgram( Long id)
    {
    	Program program = entityManager.find(Program.class, id);
    	//entityManager.getTransaction().begin();
    	entityManager.remove(program);
    	//entityManager.getTransaction().commit();    	
    }
    

    @Override
    @Transactional
    public Program saveProgram( Program program )
    {
        return entityManager.merge( program );
    }
    
    

}