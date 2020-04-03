package springrest.model.dao.jpa;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import springrest.model.Event;
import springrest.model.dao.EventDao;

@Repository
public class EventDaoImpl implements EventDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Event getEvent( Long id )
    {
        return entityManager.find( Event.class, id );
    }

    @Override
    public List<Event> getAllEvents()
    {
        return entityManager.createQuery( "from Event order by id", Event.class )
            .getResultList();
    }
    

    @Override
    @Transactional
    public Event saveEvent( Event event )
    {
        return entityManager.merge( event );
    }

}