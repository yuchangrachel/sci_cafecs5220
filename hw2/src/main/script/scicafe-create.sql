create table hibernate_sequence (
    next_val bigint
);

create table organizations (
	id bigint not null primary key,
        name varchar(255) not null
);

create table users (
	id bigint not null,
	username varchar(255) not null unique,
	password varchar(255) not null,      
        firstName varchar(255) not null,
        lastName varchar(255) not null,
        position varchar(255) not null,
	email varchar(255) not null,
        title varchar(255),
	enabled boolean not null default true,
	organization_id bigint,
	primary key(id),
	foreign key (organization_id) references organizations(id)

);

create table attender_events (
        user_id bigint not null references users(id),
        event_id bigint not null references events(id),
        primary key (user_id, event_id)
);

create table roles (
    	id bigint not null,
    	name varchar(255) not null unique,
	primary key (id)
);

create table authorities (
	user_id bigint not null references users(id),
	role_id bigint not null references roles(id),
  	primary key (user_id, role_id)
);

create table tags (
        id bigint not null,
	name varchar(255) not null,
	primary key (id)
);

create table event_tags (
        event_id bigint not null references events(id),
        tag_id bigint not null references tags(id),
        primary key (event_id, tag_id)
);

create table events (
        id bigint not null,
        description varchar(255),
        endtime datetime,
        location varchar(255),
        name varchar(255),
        starttime datetime,
        status varchar(255),
		primary key (id)
);

create table rewards (
        id bigint not null primary key,
        criteria integer,
        description varchar(255) not null,
        endtime datetime,
        providerName varchar(255) not null,
        starttime datetime,
        status varchar(255)
);

create table tagsToReward (
        reward_id bigint not null references rewards(id),
        tag_id bigint not null references tags(id),
        primary key (reward_id, tag_id)
);

create table eventsToReward (
        reward_id bigint not null references rewards(id),
        event_id bigint not null references events(id),
        primary key (reward_id, event_id)
);

create table user_programs (
       user_id bigint not null references users(id),
        program_id bigint not null references programs(id),
        primary key (user_id, program_id)
);

create table programs (
        id bigint not null primary key,
        description varchar(255) not null,
        fullname varchar(255) not null,
        name varchar(255) not null,
	organization_id bigint references organizations(id)
);


