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
@Table(name = "rewards")
public class Reward implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private Long id;
	
	@Column(nullable = false)
	private String description;

	@Column(nullable = false)
	private String providerName;
	
	@Column(name = "starttime")
	private Date starttime;
	
	@Column(name = "endtime")
	private Date endtime;
	
	@Enumerated(EnumType.STRING)
	private Status status;
	
	//qualified event 
	@ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH}, fetch=FetchType.LAZY)
    @JoinTable(name = "tagsToReward", joinColumns = { @JoinColumn(name = "reward_id") }, inverseJoinColumns = { @JoinColumn(name = "tag_id")})
	Set<Tag> tags;
	
	@ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH}, fetch=FetchType.LAZY)
    @JoinTable(name = "eventsToReward", joinColumns = { @JoinColumn(name = "reward_id") }, inverseJoinColumns = { @JoinColumn(name = "event_id") })
    Set<Event> events;
	
	private Integer criteria;

	public Reward() {}
	
	public Reward(Long id, String description, User reward_submitter, User reward_provider, User reward_receiver) {
		this.id = id;
		this.description = description;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public enum Status{SUBMMITED,POSTED,REJECTED }
	
	public String getProviderName() {
		return providerName;
	}

	public void setProviderName(String providerName) {
		this.providerName = providerName;
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
	
	public Integer criteria() {
		return criteria;
	}
	
	public void setCriteria(Integer criteria) {
		this.criteria =criteria;
	}
	
	@Override
	public String toString() {
		return "all info";
	}
	
	
}
