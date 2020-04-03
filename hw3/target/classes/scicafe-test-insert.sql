insert into hibernate_sequence values ( 10000 );

insert into users (id, username, password, firstname, lastname, position, email) values (1, 'yuk', '1234', 'rachel','kscytall', 'student', 'gg@gamil.com');
insert into users (id, username, password, firstname, lastname, position, email, title, major) values (2, 'Camirilo', 'fadf', 'camirilo','smith', 'student', 'mm@gamil.com', 'Director of LSAMP', 'CS');
insert into users (id, username, password, firstname, lastname, position, email, unit) values (3, 'Yuri', '111', 'Yuri','smith', 'faculty', '222@gamil.com', 'EST department');

insert into roles values (1, 'admin');
insert into roles values (2, 'eventOrganizer');
insert into roles values (3, 'rewardProvider');
insert into roles values (4, 'defaultUser');

insert into authorities (user_id, role_id) value (1, 4);
insert into authorities (user_id, role_id) value (2, 1);

insert into tags values (1, 'Robotics');
insert into tags values (2, 'ACM');
insert into tags values (3, 'Computer Science');

insert into events (id, name, location, starttime, endtime, status) values (1, 'Robot club', 'EA111', '2018-8-10 9:00:00 ', '2018-8-10 12:00','POSTED');
insert into events (id, name, location, starttime, endtime, status) values (2, 'Mock Interview', 'EA121', '2018-8-18 8:30:00', '2018-8-30 14:00','SUBMITTED');

insert into attender_events values (1, 2);
insert into attender_events values (2, 2);
insert into attender_events values (2, 1);

insert into event_tags values (1,1);
insert into event_tags values (1,2);
insert into event_tags values (2,1);



insert into programs (id, fullname, name, description) values (1,'First-Year Experience Program at ECST', 'FYrE@ECST','');
insert into programs (id, name,fullname,description) values (2,'LSAMP',' ','');

insert into user_programs values (1,2);
insert into user_programs values (2,2);
insert into user_programs values (3,1);

insert into rewards (id, description, criteria, starttime, endtime, providerName, status) values (1, 'Creation-reward', 2, '2018-8-8 8:00', ' 2018-8-30 8:00', 'dean of CS deparment', 'POSTED');

insert into tagsToReward values (1,1);
insert into tagsToReward values (2,1);
insert into tagsToReward values (3,1);

insert into eventsToReward values (1,1);
insert into eventsToReward values (2,1);

