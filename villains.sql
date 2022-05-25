create database villains;

create user 'villains_users'@'localhost' identified with mysql_native_password by 'supervillain';

grant all on villains.* to 'villains_users'@'localhost';

use villains;

create table villains (
id INT auto_increment,
name VARCHAR(255),
movie VARCHAR(255),
slug VARCHAR(255),
createdAt DATETIME DEFAULT NOW(),
updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
deletedAt DATETIME,
primary key(id)
);

insert into villains (name, movie, slug) 
values (
  'Captain Hook',
  'Peter Pan',
  'captain-hook'
);
select * from villains;

INSERT into villains (name, movie, slug) VALUES ('Cruella de Vil', 'One Hundred and One Dalmatians', 'cruella-de-vil');
INSERT into villains (name, movie, slug) VALUES ('Gaston', 'Beauty and the Beast', 'gaston');
INSERT into villains (name, movie, slug) VALUES ('Hades', 'Hercules', 'hades');
INSERT into villains (name, movie, slug) VALUES ('Horned King', 'The Black Cauldron', 'horned-king');
INSERT into villains (name, movie, slug) VALUES ('Jafar', 'Aladdin', 'jafar');
INSERT into villains (name, movie, slug) VALUES ('Lady Tremaine', 'Cinderella', 'lady-tremaine');
INSERT into villains (name, movie, slug) VALUES ('Madame Medusa', 'The Rescuers', 'madame-medusa');
INSERT into villains (name, movie, slug) VALUES ('Madam Mim', 'The Sword in the Stone', 'madam-mim');
INSERT into villains (name, movie, slug) VALUES ('Maleficent', 'Sleeping Beauty', 'maleficent');
INSERT into villains (name, movie, slug) VALUES ('Prince John', 'Robin Hood', 'prince-john');
INSERT into villains (name, movie, slug) VALUES ('Sir Hiss', 'Robin Hood', 'sir-hiss');
INSERT into villains (name, movie, slug) VALUES ('Queen Grimhilde', 'Snow White and the Seven Dwarfs', 'queen-grimhilde');
INSERT into villains (name, movie, slug) VALUES ('Queen of Hearts', 'Alice in Wonderland', 'queen-of-hearts');
INSERT into villains (name, movie, slug) VALUES ('Scar', 'The Lion King', 'scar');
INSERT into villains (name, movie, slug) VALUES ('Shan Yu', 'Mulan', 'shan-yu');
INSERT into villains (name, movie, slug) VALUES ('Shere Khan', 'The Jungle Book', 'shere-khan');
INSERT into villains (name, movie, slug) VALUES ('Ursula', 'The Little Mermaid', 'ursula');