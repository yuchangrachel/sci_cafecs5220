package springrest.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
@Table(name = "users")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;
    
    @Column(nullable = false, unique =true)
    private String username;
    
    @JsonProperty(access = Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password;

    @Column(name = "firstname", nullable = false)
    private String firstname;

    @Column(name = "lastname", nullable = false)
    private String lastname;
    
    private String position;
    private String email;
    private String title;
    private boolean enabled = true;
    private String major;
    private String unit;
    
    
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH}, fetch=FetchType.LAZY)
    @JoinTable(
        name = "user_programs", 
        joinColumns = { @JoinColumn(name = "user_id") }, 
        inverseJoinColumns = { @JoinColumn(name = "program_id") }
    )
    Set<Program> programs;
    
    //move out since add attendee to event
    //@ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH}, fetch=FetchType.LAZY)
    //@JoinTable(name = "attender_events",
        //joinColumns = @JoinColumn(name = "user_id"),
        //inverseJoinColumns = @JoinColumn(name = "event_id"))
   // Set<Event> eventAttended;  //user attend events
        
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH}, fetch=FetchType.LAZY)
    @JoinTable(name = "authorities",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id"))
    Set<Role> roles;
      
    
    //Constructor
    public User(){
    	roles = new HashSet<Role>();  	 	
    }
    
	public User(String username, String password, String firstname, String lastname) {
    	this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		
	}

    public Long getId()
    {
        return id;
    }

    public void setId( Long id )
    {
        this.id = id;
    }

    public String getUsername() {
    	return username;
    }
    
    public void setUsername(String username) {
    	this.username = username;
    }
    
    public String getPassword() {
    	return password;
    }
    
    public void setPassword(String password) {
    	this.password = password;
    }
    
    public String getFirstname()
    {
        return firstname;
    }

    public void setFirstname( String firstname )
    {
        this.firstname = firstname;
    }

    public String getLastname()
    {
        return lastname;
    }

    public void setLastname( String lastname )
    {
        this.lastname = lastname;
    }

    public String getPosition() {
    	return position;
    }
    
    public void setPosition(String position) {
    	this.position = position;
    } 
    
    public String getEmail() {
    	return email;
    }
    
    public void setEmail(String email) {
    	this.email = email;
    }
    
    public String getTitle() {
    	return title;
    }
    
    public void setTitle(String title) {
    	this.title = title;
    }
    
    public Set<Program> getProgram() {
    	return programs;
    }
    
    public void setProgram(Set<Program> programs) {
    	this.programs = programs;
    }
    
    public Set<Role> getRoles() {
    	return roles;
    }
    
    public void setRoles(Set<Role> roles) {
    	this.roles = roles;
    }
        
    //public Set<Event> getEventAttended(){
    	//return eventAttended;
   // }
    
    //public void setEventAttended(Set<Event> eventAttended) {
    	//this.eventAttended = eventAttended;
    //}
    
    public boolean isEnabled() {
		return enabled;  
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	
	public String getMajor() {
		return major;
	}
	
	public void setMajor(String major) {
		this.major = major;
	}
	
	public String getUnit() {
		return unit;
	}
	
	public void setUnit(String unit) {
		this.unit = unit;
	}
 
	@Override
	public boolean equals(Object obj) {
		// TODO Auto-generated method stub
		if(getClass() != obj.getClass())
			return false;
		
		return id.equals(((User)obj).getId());
	}

	@Override
	public String toString() {
		return "Username: " + getUsername() + "First name: "+ getFirstname() + "\n" + "Last name:" + getLastname() + "\n" + "Email:" + getEmail() + "\n";
	}
    
}