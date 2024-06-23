CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person` INT NOT NULL ,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
    FOREIGN KEY (person) REFERENCES person(person_id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `person` (
    person_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL ,
    last_name VARCHAR(30) NOT NULL
);
INSERT INTO person (name, last_name) values ('test', 'test');
INSERT INTO `accounts` (person, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');