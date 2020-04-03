package springrest.api.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import springrest.api.error.RestException;
import springrest.model.Event;
import springrest.model.User;
import springrest.model.dao.EventDao;
import springrest.model.dao.UserDao;

@RestController
public class EventController {

	@Autowired
	private EventDao eventDao;
	
	@Autowired
	private UserDao userDao;

	// get a event by id
	@RequestMapping(value = "/events/{id}", method = RequestMethod.GET)
	public Event getEvent(@PathVariable Long id) {
		Event event = eventDao.getEvent(id);
		if (event == null)
			throw new RestException(404, "No such event.");

		return event;
	}

	// get all events
	@RequestMapping(value = "/events", method = RequestMethod.GET)
	public List<Event> getEvents() {
		return eventDao.getAllEvents();
	}

	// add a new event
	@RequestMapping(value = "/events", method = RequestMethod.POST)
	public Event addEvent(@RequestBody Event event) {
		try {
			return eventDao.saveEvent(event);
		} catch (Exception e) {
			throw new RestException(400, "cannot add");
		}
	}

	// Approve/reject an event like edit event	
	@RequestMapping(value = "/events/{id}/status", method = RequestMethod.PUT)
	public Event setStatus(@PathVariable Long id, @RequestBody Event event) {
		Event approve = eventDao.getEvent(id);
		if (approve == null)
			throw new RestException(404, "Event not found.");
		
		try {			
			approve.setStatus(event.getStatus());
	
			return eventDao.saveEvent(approve);
		} catch (Exception k) {
			throw new RestException(400, "invalid id");
		}

	}
	
	//Add an attendee to an event	
	@RequestMapping(value = "/events/{id}/attendees", method = RequestMethod.POST)
    public Event addAttendee(@PathVariable Long id, @RequestBody User user){
    	User attendee = userDao.getUser(user.getId());
    	Event event = eventDao.getEvent(id);
		
    	if(attendee == null)
			throw new RestException(404, "User not found");
    	
		if(event == null)
			throw new RestException(404, "Event no found");
		
		try {
			event.getEventAttended().add(attendee);
			
		} catch(Exception j) {
			System.out.println(j);
		}
		
		return eventDao.saveEvent(event);

    }
	
	
	//get all attendee to an event
    @RequestMapping(value = "/events/{id}/attendees", method = RequestMethod.GET)
	public Set<User> getAllAttendees(@PathVariable Long id) {
		
		Set<User> attendees=eventDao.getEvent(id).getEventAttended();
		
		if (attendees.isEmpty()) {
			throw new RestException(404, "No user attend this event");
		}
				
		return attendees;
	}
	
	

}