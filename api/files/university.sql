DROP DATABASE IF EXISTS `comp440_project_test`;
CREATE DATABASE `comp440_project_test`;
USE `comp440_project_test`;  

DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `dept_name` varchar(20)  NOT NULL,
  `building` varchar(15)  DEFAULT NULL,
  `budget` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`dept_name`)
);
INSERT INTO `department` VALUES ('Accounting','Saucon',441840.92),('Astronomy','Taylor',617253.94),('Athletics','Bronfman',734550.70),('Biology','Candlestick',647610.55),('Civil Eng.','Chandler',255041.46),('Comp. Sci.','Lamberton',106378.69),('Cybernetics','Mercer',794541.46),('Elec. Eng.','Main',276527.61),('English','Palmer',611042.66),('Finance','Candlestick',866831.75),('Geology','Palmer',406557.93),('History','Taylor',699140.86),('Languages','Linderman',601283.60),('Marketing','Lambeau',210627.58),('Math','Brodhead',777605.11),('Mech. Eng.','Rauch',520350.65),('Physics','Wrigley',942162.76),('Pol. Sci.','Whitman',573745.09),('Psychology','Thompson',848175.04),('Statistics','Taylor',395051.74);

DROP TABLE IF EXISTS `instructor`;
CREATE TABLE `instructor` (
  `ID` varchar(5)  NOT NULL,
  `name` varchar(20)  NOT NULL,
  `dept_name` varchar(20)  DEFAULT NULL,
  `salary` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `dept_name` (`dept_name`),
  CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`dept_name`) REFERENCES `department` (`dept_name`) ON DELETE SET NULL
);
INSERT INTO `instructor` VALUES ('14365','Lembr','Accounting',32241.56),('15347','Bawa','Athletics',72140.88),('19368','Wieland','Pol. Sci.',124651.41),('22591','DAgostino','Psychology',59706.49),('25946','Liley','Languages',90891.69),('28097','Kean','English',35023.18),('28400','Atanassov','Statistics',84982.92),('3199','Gustafsson','Elec. Eng.',82534.37),('3335','Bourrier','Comp. Sci.',80797.83),('34175','Bondi','Comp. Sci.',115469.11),('36897','Morris','Marketing',43770.36),('41930','Tung','Athletics',50482.03),('4233','Luo','English',88791.45),('42782','Vicentino','Elec. Eng.',34272.67),('43779','Romero','Astronomy',79070.08),('48507','Lent','Mech. Eng.',107978.47),('48570','Sarkar','Pol. Sci.',87549.80),('50330','Shuming','Physics',108011.81),('63287','Jaekel','Athletics',103146.87),('6569','Mingoz','Finance',105311.38),('65931','Pimenta','Cybernetics',79866.95),('73623','Sullivan','Elec. Eng.',90038.09),('74420','Voronina','Physics',121141.99),('77346','Mahmoud','Geology',99382.59),('79081','Ullman ','Accounting',47307.10),('80759','Queiroz','Biology',45538.32),('81991','Valtchev','Biology',77036.18),('90376','Bietzk','Cybernetics',117836.50),('90643','Choll','Statistics',57807.09),('95709','Sakurai','English',118143.98),('99052','Dale','Cybernetics',93348.83);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `username` varchar(45)  NOT NULL,
  `password` varchar(45)  NOT NULL,
  `firstName` varchar(45)  DEFAULT NULL,
  `lastName` varchar(45)  DEFAULT NULL,
  `email` varchar(100)  DEFAULT NULL,
  PRIMARY KEY (`username`)
);
INSERT INTO `users` VALUES ('batman','1234','bat','bat','nananana@batman.com'),('bob','12345','bob','bob','bobthatsme@yahoo.com'),('catlover','abcd','cat','cat','catlover@whiskers.com'),('doglover','efds','dog','dog','doglover@bark.net'),('jdoe','25478','joe','jod','jane@doe.com'),('jsmith','1111','john','smith','jsmith@gmail.com'),('matty','2222','mat','mat','matty@csun.edu'),('notbob','5555','not','bob','stopcallingmebob@yahoo.com'),('pacman','9999','pacman','pacman','pacman@gmail.com'),('scooby','8888','scoby','scoby','scooby@doo.net');

DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs` (
  `blogid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `subject` varchar(50) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `pdate` date DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`blogid`),
  KEY `FK1_idx` (`description`),
  KEY `FK1` (`created_by`),
  CONSTRAINT `FK1` FOREIGN KEY (`created_by`) REFERENCES `users` (`username`)
);
INSERT INTO `blogs` VALUES (1,'Hello World','Hey everyone, this is my first blog. Hello world and all who inhabit it!','2020-03-15','jsmith'),(2,'I love cats!','Cats are amazing. They\'re awesome, and fuzzy, and cute. Who DOESN\'T love cats?','2020-03-17','catlover'),(3,'Dogs are the best.','So I saw a post the other day talking about cats. Now, I love cats. They\'re great. But here\'s the thing: dogs are just the best, okay? There\'s no question about it. That is all.','2020-03-19','doglover'),(4,'I am the night.','To all you lowly criminals out there, this is a warning to know I am watching. I am justice. I am righteousness. I am the NIGHT.','2020-03-24','batman'),(5,'Waka waka','waka waka waka waka waka waka waka waka waka waka waka waka waka waka waka waka','2020-03-31','pacman'),(6,'Who is this Bob guy?','Decided to start tracking down this mysterious human known as \'Bob.\' Who is Bob? What does he do? WHY does he do it? There is a lot of mystery surrounding this person, and I will be going into detail in future posts. Stay tuned!','2020-04-02','notbob'),(7,'Re: I love cats.','A reader recently reached out to me about my last post. To be clear, I\'m not dissing our canine companions! But we\'ve got to be honest here, why are cats better? They\'re smart, affectionate, and great cuddle partners. Cats are better. It\'s just fact.','2020-04-04','catlover'),(8,'Scooby Dooby Doo!','The search for scooby snacks: Where did they go? I know this whole quarantine thing is affecting businesses, but aren\'t scooby snacks counted as an essential service? Please post below if you find anything! I\'m going crazy here!','2020-04-05','scooby'),(9,'Bob Update','Dear readers, I know you have been waiting anxiously for an update on Bob, but there is not much to share so far. He appears to have little to no online presence. Just a clarification: I am decidedly NOT Bob. Thanks all. Stay tuned for more!','2020-04-06','notbob'),(10,'Lizard People.','What are your guys\' thoughts on them? I, for one, welcome out reptitlian overlords.','2020-04-12','jdoe');

DROP TABLE IF EXISTS `blogstags`;
CREATE TABLE `blogstags` (
  `blogid` int(10) unsigned NOT NULL,
  `tag` varchar(20) NOT NULL,
  PRIMARY KEY (`blogid`,`tag`),
  CONSTRAINT `blogstags_ibfk_1` FOREIGN KEY (`blogid`) REFERENCES `blogs` (`blogid`)
);
INSERT INTO `blogstags` VALUES (1,'hello world'),(2,'animals'),(2,'cats'),(3,'animals'),(3,'dogs'),(4,'crime'),(4,'justice'),(5,'cartoon'),(5,'waka'),(6,'bob'),(6,'update'),(7,'cats'),(7,'dogs'),(8,'dogs'),(8,'quarantine'),(8,'scooby snacks'),(9,'bob'),(9,'update'),(10,'lizards');

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `commentid` int(10) NOT NULL AUTO_INCREMENT,
  `sentiment` varchar(20) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `cdate` date DEFAULT NULL,
  `blogid` int(10) unsigned DEFAULT NULL,
  `posted_by` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`commentid`),
  KEY `comments_ibfk_1` (`blogid`),
  KEY `comments_ibfk_2` (`posted_by`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`blogid`) REFERENCES `blogs` (`blogid`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`posted_by`) REFERENCES `users` (`username`),
  CONSTRAINT `sentiment_types` CHECK ((`sentiment` in (_utf8mb4'negative',_utf8mb4'positive')))
);
INSERT INTO `comments` VALUES (1,'negative','Cats are cool and all, but dogs are where it\'s at.','2020-03-17',2,'doglover'),(2,'negative','What\'s all the hype about? Cats are clearly superior.','2020-03-20',3,'catlover'),(3,'positive','Nice.','2020-03-20',4,'scooby'),(4,'positive','Who IS Bob? I can\'t wait to find out.','2020-04-02',6,'jsmith'),(5,'negative','I guess cat people just don\'t know what they\'re missing.','2020-04-05',7,'doglover'),(6,'positive','This is totally unrelated, but I just wanted to say I am a HUGE fan of yours. I love your work!','2020-04-05',8,'doglover'),(7,'positive','Have you checked out Dog-Mart? They\'ve got everything.','2020-04-06',8,'matty'),(8,'negative','I was hoping there\'d be more of an update. Sorry, Bob.','2020-04-07',9,'jsmith'),(9,'positive','I think they\'re all secretly cats. Open your eyes, sheeple!','2020-04-13',10,'doglover'),(10,'negative','Who? Me? Multimillionaire philanthropist of Arkham? A lizard person? Nope. Nothing to see here!','2020-04-15',10,'batman');

DROP TABLE IF EXISTS `follows`;
CREATE TABLE `follows` (
  `leadername` varchar(45) NOT NULL,
  `followername` varchar(45) NOT NULL,
  PRIMARY KEY (`leadername`,`followername`),
  KEY `follows_ibfk_2` (`followername`),
  CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`leadername`) REFERENCES `users` (`username`),
  CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`followername`) REFERENCES `users` (`username`)
);
INSERT INTO `follows` VALUES ('jsmith','bob'),('batman','catlover'),('doglover','catlover'),('pacman','catlover'),('catlover','doglover'),('jsmith','jdoe'),('bob','notbob'),('jdoe','notbob'),('batman','pacman'),('scooby','pacman'),('doglover','scooby'),('pacman','scooby');

DROP TABLE IF EXISTS `hobbies`;
CREATE TABLE `hobbies` (
  `username` varchar(45)  NOT NULL,
  `hobby` varchar(20) NOT NULL,
  PRIMARY KEY (`hobby`,`username`),
  KEY `hobbies_ibfk_1` (`username`),
  CONSTRAINT `hobbies_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` 