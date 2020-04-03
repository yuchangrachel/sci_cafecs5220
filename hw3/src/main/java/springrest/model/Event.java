package springrest.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "events")
public class Event implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Long id;
	private String name;
	private String description;
	private String location;

	@Column(name = "starttime")
	private Date starttime;

	@Column(name = "endtime")
	private Date endtime;

	// Can do not bi-directional
	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH }, fetch = FetchType.LAZY)
	@JoinTable(name = "event_tags", joinColumns = { @JoinColumn(name = "event_id") }, inverseJoinColumns = {
			@JoinColumn(name = "tag_id") })
	Set<Tag> tags;

	@Enumerated(EnumType.STRING)
	private Status status;

	@ManyToMany
	@JoinTable(name = "attender_events", joinColumns = @JoinColumn(name = "event_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	Set<User> eventAttended;
	

	public Event() {
	}

	public Event(Long id, String name, String description, String location, Date starttime, Date endtime) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.location = location;
		this.starttime = starttime;
		this.endtime = endtime;
	}

	public enum Status {
		SUBMITTED, POSTED, REJECTED
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Date getStarttime() {
		return starttime;
	}

	public void setStarttime(Date starttime) {
		this.starttime = starttime;
	}

	public Date getEndtime() {
		return endtime;
	}

	public void setEndtime(Date endtime) {
		this.endtime = endtime;
	}

	public Set<Tag> getTag() {
		return tags;
	}

	public void setTag(Set<Tag> tags) {
		this.tags = tags;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Set<User> getEventAttended() {
		return eventAttended;
	}

	public void setEventAttended(Set<User> eventAttended) {
		this.eventAttended = eventAttended;
	}

	@Override
	public String toString() {
		return "Event--->name:" + name + " description: " + description + " location: " + location + " starttime: "
				+ starttime + " endtime: " + endtime + " status: " + status;
	}

}
