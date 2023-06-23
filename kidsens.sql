-- MySQL dump 10.13  Distrib 8.0.32, for macos13.0 (arm64)
--
-- Host: localhost    Database: kidsens_db
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Activity`
--

DROP TABLE IF EXISTS `Activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Activity` (
  `type` varchar(100) DEFAULT NULL,
  `lower` int DEFAULT NULL,
  `upper` int DEFAULT NULL,
  `activity` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Activity`
--

LOCK TABLES `Activity` WRITE;
/*!40000 ALTER TABLE `Activity` DISABLE KEYS */;
INSERT INTO `Activity` VALUES ('speech',1,2,'acitivity to be entered'),('speech',4,5,'If you are happy and you know it - Sing the song, “If You’re Happy and You Know It,” and move the appropriate body part for the child as you sing. Repeat the song, replacing “clap your hands” with “stomp your feet,” “nod your head,” “raise your arms,” “touch your belly,” and “blow a kiss.” You can make up your own lyrics too.'),('speech',4,5,'Animal rhymes - Sing rhymes with animal characters and make animal sounds along with it. Let the child try to imitate you, bring in some animal toys or pictures for added fun. You can also add whistling sounds, humming and so on.'),('speech',4,5,' Shooting star - Take some cotton balls, colourful pom pom balls or any small attractive thing and put it in front to get his/her attention. Drive it up and say ‘where’s the star …where’s the star…..Here comes the shooting star !’ and drop it down onto the child.'),('speech',4,5,'Pointing in the mirror - Sit with the child in front of the mirror. Ask where the particular body parts on his/her own body and yours are, help him/her point onto self and then onto the mirror. Make it fun by adding rhymes.'),('speech',0,2,'Drive around the house - Drive the child around the house into a small box or make him/her fly in your arms. Take the child into different corners and make him/her touch different objects. Make it rhyme such as ‘Where’s the windowwww…..here it is…..let’s touch it.'),('speech',0,2,'At the zoo - Hold up an animal toy or picture next to your face and make the animal’s sound. Repeat for all the animals or pictures. Hold up the animal toy or pictures again, this time pausing a moment before making the animal sounds, so your baby can anticipate them. Let the baby touch the animal picture before you make that animal sound and let the baby try imitating the sound.'),('motor',4,5,'1.Copying lines along the thread - Tie a long piece of thread or wool from one end of a cardboard or drawing paper to another, encouraging the child to draw colourful lines along with the piece of thread or wool. Making sure that the line stays as close to the thread as possible. You can practise different shapes using the same method.'),('motor',4,5,'2. Jumping off an elevated surface - Ask the child to stand on an elevated platform such as step and jump forward with both feet. Gradually increase the distance between jumping and landing point.'),('motor',4,5,'3. Jumping over obstacles - Place small obstacles to jump on for the child such as slim cushions. Gradually, introduce a little bigger obstacles with less width to allow the child to jump over it. You can make an obstacle course too.'),('motor',4,5,'4. Small Basketball - Set a big plastic ring or big cardboard box against the wall, little above the child’s height. Give a medium sized ball to the child and allow him to run and throw it into the basket. Demonstrate the child how to jump and throw the ball.'),('motor',4,5,'5. Crumpling and tearing papers - Give some rough papers to the child and ask him/her to crumple it and turn it into a ball. You can use these balls to hit targets. Demonstrate the child how to tear apart papers and make decorative frills with it.'),('motor',4,5,'6. Pushing marbles in a line - Take a cardboard sheet and cut out small holes in a straight line (horizontal and vertical). Give some marbles to the child to push through the holes, first horizontally then vertically or vice versa.'),('motor',4,5,'7. Tightrope walk - Make a line with chalk or using tape on the floor. Encourage the child to walk on the line and avoid putting feet on the floor. Start by a wide line path and gradually make it thinner, along with it you can add curves, zig zags and obstacles to make it more fun.'),('motor',4,5,'8. Connecting the dots - Draw a number of equally spaced dots on a paper (horizontally and vertically). Let the child connect dots one by one and gradually ask him to connect two, three and more in a row.'),('motor',4,5,' 9. Obstacle course - Place or tie some bed sheets or dupattas with equal distance between them but with varied height. Let the child figure out whether he/she needs to crawl, creep, cross or jump over the obstacles to get to his/her favourite toy.'),('motor',4,5,' 10. Tracing with beans - Draw a few horizontal and vertical lines on a sheet of paper. Give the child a variety of beans and ask him/her to trace the lines by placing the beans one by one onto the lines.'),('motor',4,5,' 11. Pop up bubble wrap - Take old bubble wrap sheets and give the child to pop it. Encourage the child to use reduce only tripod fingers (thumb, index and middle finger) to pop it.'),('motor',4,5,' 12. Picking with clothespins - Spread small lightweight toys or soft toys on the floor. Give the child a clothespin and show him/her how to pick the toys using it.'),('motor',4,5,' 13. Animal walks - Get on the floor along with the child and demonstrate animal walks such as bear walk, kangaroo jumps, duck walk and so on.'),('social',4,5,' 1. Emotion Masks - Make face masks displaying different emotions using paper and ice-cream sticks. Play the game of telling ‘How are you feeling?’ by using emotion masks. Use the mask when describing emotions in a storybook.'),('social',4,5,' 2. Blow the ball - Take a few straws and some small plastic balls. Gather the children in the house, sit on the floor in a circle and show how to pass the ball to another person by blowing through the straw. Let the child and his/her peers have fun experimenting with it by themselves.'),('social',4,5,'3. What is inside? - Take or make small paper bags and take some small objects or toys along with you. Place different toys/ objects into different bags without showing it to the child. Let the child identify it by just touching it. Take turns hiding and guessing. Involve other family members and peers into the activity too.'),('social',4,5,' 4. Copycat - Gather family members and peers into an open area. Start by doing any random motor movements such as roll down, jump, laugh, fall and so on, others have to copy your movement. Take turns doing the movements and copying each other.'),('social',4,5,'5. I spy - Make faces displaying different emotions such as happy, sad, angry and so on. Let the child guess the correct emotion by saying ‘I spy you are happy’. Take turns making faces and spying.'),('cognitive',4,5,' 1. Tap, Where am I ? - Sit along with the child, be sneaky and gently tap the baby by saying his/her name and then pop out in front and say ‘Here I am’. Keep on changing positions and add little pause after tapping. Gradually, add a brief pause after calling the name and before tapping. Let the child look for you.'),('cognitive',4,5,' 2. Picture cards & Matching objects - Take the pictures of child’s favourite objects/ toys from the phone or from picture books. Put the objects and picture both in front of the child. Name the object and help him/her touch the correct object and picture both. Gradually, reduce the assistance and place pictures first and then objects.'),('cognitive',4,5,'3. At the zoo - Hold up an animal toy or picture next to your face and make the animal’s sound. Repeat for all the animals or pictures. Hold up the animal toy or pictures again, this time pausing a moment before making the animal sounds, so your baby can anticipate them. Let the baby touch the animal picture before you make that animal sound and let the baby try imitating the sound'),('cognitive',4,5,'4. Roll the ball - Sit along with the child and other family members. Help him/her roll the ball to others, make sure to say ‘roll’ first and then let him/her roll the ball. Gradually, reduce the support and add brief pauses before you say ‘roll’.'),('cognitive',4,5,' 5. Where it is? - Play with the child using his/her favourite toys. In-between, hide the toy behind you and behind the baby. Let the child try to reach and find. Reveal it and say ‘here it is, behind you’. You can hide it under small bowls and let the child figure it under which bowl it is.'),('sensory',4,5,'1. Bells to the body - Tie anklets or small bells using a thread to the child’s hands or legs. Let the child explore different sounds by moving his/her own body. Show how else the child can explore the sounds such as clapping, wiggling the feet and so on.'),('sensory',4,5,'2. Brushing with a variety of textures - Use a variety of textures such as different clothes, towels and so on, gently rub and massage the child’s body and let the child enjoy it. You can start with extremities of the body and then move up to the trunks and inner side of the body.'),('sensory',4,5,'3. Raining grains - Take a variety of beans or grains and shower it on the child’s body (avoiding sensitive areas such as face, ears and so on). Prepare the child beforehand such as by singing ‘Rain…Rain.. Here it comes…Rain of grains.’'),('sensory',4,5,'4. Sensory bowls - Take some big bowls and fill them with a variety of objects with different textures. Let the child dip his/her hand into the bowls and enjoy the textures. You can also place a variety of foods such as namkeen, small fruit pieces and so on, in the bowl.');
/*!40000 ALTER TABLE `Activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `ADMIN_ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`ADMIN_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'abc@gmail.com','abc');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `QUESTION_ID` int DEFAULT NULL,
  `FORM_ID` int DEFAULT NULL,
  `ANSWER` varchar(2000) DEFAULT NULL,
  `value` varchar(2000) DEFAULT NULL,
  KEY `FORM_ID` (`FORM_ID`),
  KEY `QUESTION_ID` (`QUESTION_ID`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`FORM_ID`) REFERENCES `forms` (`FORM_ID`),
  CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`QUESTION_ID`) REFERENCES `questions` (`QUESTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AssessFormMap`
--

DROP TABLE IF EXISTS `AssessFormMap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AssessFormMap` (
  `student_Id` int DEFAULT NULL,
  `stage` varchar(100) DEFAULT NULL,
  `assessment` varchar(100) DEFAULT NULL,
  `FORM_ID` int DEFAULT NULL,
  KEY `FORM_ID` (`FORM_ID`),
  KEY `student_Id` (`student_Id`),
  CONSTRAINT `assessformmap_ibfk_1` FOREIGN KEY (`FORM_ID`) REFERENCES `forms` (`FORM_ID`),
  CONSTRAINT `assessformmap_ibfk_2` FOREIGN KEY (`student_Id`) REFERENCES `parent` (`student_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AssessFormMap`
--

LOCK TABLES `AssessFormMap` WRITE;
/*!40000 ALTER TABLE `AssessFormMap` DISABLE KEYS */;
/*!40000 ALTER TABLE `AssessFormMap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assessments`
--

DROP TABLE IF EXISTS `assessments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessments` (
  `student_Id` int NOT NULL,
  `stage` varchar(100) NOT NULL,
  `assessment` varchar(100) NOT NULL,
  PRIMARY KEY (`student_Id`,`stage`,`assessment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessments`
--

LOCK TABLES `assessments` WRITE;
/*!40000 ALTER TABLE `assessments` DISABLE KEYS */;
INSERT INTO `assessments` VALUES (1,'Screening','asses');
/*!40000 ALTER TABLE `assessments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `default_AssessFormMap`
--

DROP TABLE IF EXISTS `default_AssessFormMap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `default_AssessFormMap` (
  `admin_Id` varchar(100) DEFAULT NULL,
  `stage` varchar(100) DEFAULT NULL,
  `assessment` varchar(100) DEFAULT NULL,
  `FORM_ID` int DEFAULT NULL,
  KEY `FORM_ID` (`FORM_ID`),
  CONSTRAINT `default_assessformmap_ibfk_1` FOREIGN KEY (`FORM_ID`) REFERENCES `forms` (`FORM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `default_AssessFormMap`
--

LOCK TABLES `default_AssessFormMap` WRITE;
/*!40000 ALTER TABLE `default_AssessFormMap` DISABLE KEYS */;
/*!40000 ALTER TABLE `default_AssessFormMap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `default_assessments`
--

DROP TABLE IF EXISTS `default_assessments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `default_assessments` (
  `admin_Id` varchar(200) DEFAULT NULL,
  `stage` varchar(100) DEFAULT NULL,
  `assessment` varchar(100) DEFAULT NULL,
  `MildUp` int DEFAULT NULL,
  `SevereUp` int DEFAULT NULL,
  `message_mild` longtext,
  `message_severe` longtext,
  `message_moderate` longtext,
  `recommendation_mild` longtext,
  `recommendation_moderate` longtext,
  `recommendation_severe` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `default_assessments`
--

LOCK TABLES `default_assessments` WRITE;
/*!40000 ALTER TABLE `default_assessments` DISABLE KEYS */;
INSERT INTO `default_assessments` VALUES ('abc@gmail.com','Screening','asses',20,10,'mild','sev','mod','mild;a;b;c;d','mod;a;b;c;d','sev;a;b;c;d');
/*!40000 ALTER TABLE `default_assessments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `default_stages`
--

DROP TABLE IF EXISTS `default_stages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `default_stages` (
  `admin_Id` varchar(100) NOT NULL,
  `stage` varchar(100) NOT NULL,
  `position` int DEFAULT NULL,
  PRIMARY KEY (`admin_Id`,`stage`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `default_stages`
--

LOCK TABLES `default_stages` WRITE;
/*!40000 ALTER TABLE `default_stages` DISABLE KEYS */;
INSERT INTO `default_stages` VALUES ('abc@gmail.com','Screening',1);
/*!40000 ALTER TABLE `default_stages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forms`
--

DROP TABLE IF EXISTS `forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forms` (
  `FORM_ID` int NOT NULL AUTO_INCREMENT,
  `FORM_NAME` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`FORM_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forms`
--

LOCK TABLES `forms` WRITE;
/*!40000 ALTER TABLE `forms` DISABLE KEYS */;
/*!40000 ALTER TABLE `forms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forms_obj`
--

DROP TABLE IF EXISTS `forms_obj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forms_obj` (
  `FORM_ID` int NOT NULL,
  `FORM_OBJ` longtext,
  `SENDER_TYPE` varchar(2000) NOT NULL,
  `SENDER_ID` varchar(2000) NOT NULL,
  PRIMARY KEY (`FORM_ID`),
  CONSTRAINT `forms_obj_ibfk_1` FOREIGN KEY (`FORM_ID`) REFERENCES `forms` (`FORM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forms_obj`
--

LOCK TABLES `forms_obj` WRITE;
/*!40000 ALTER TABLE `forms_obj` DISABLE KEYS */;
/*!40000 ALTER TABLE `forms_obj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Marks`
--

DROP TABLE IF EXISTS `Marks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Marks` (
  `student_Id` varchar(100) DEFAULT NULL,
  `FORM_ID` int DEFAULT NULL,
  `QUESTION_ID` int DEFAULT NULL,
  `Max_Marks` int DEFAULT NULL,
  `Marks_Obtained` int DEFAULT NULL,
  KEY `FORM_ID` (`FORM_ID`),
  KEY `QUESTION_ID` (`QUESTION_ID`),
  CONSTRAINT `marks_ibfk_1` FOREIGN KEY (`FORM_ID`) REFERENCES `forms` (`FORM_ID`),
  CONSTRAINT `marks_ibfk_2` FOREIGN KEY (`QUESTION_ID`) REFERENCES `questions` (`QUESTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Marks`
--

LOCK TABLES `Marks` WRITE;
/*!40000 ALTER TABLE `Marks` DISABLE KEYS */;
/*!40000 ALTER TABLE `Marks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent`
--

DROP TABLE IF EXISTS `parent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parent` (
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(512) DEFAULT NULL,
  `p_fname` varchar(255) DEFAULT NULL,
  `p_lname` varchar(255) DEFAULT NULL,
  `p_email` varchar(255) DEFAULT NULL,
  `p_phn` varchar(255) DEFAULT NULL,
  `p_Address` varchar(512) DEFAULT NULL,
  `c_fname` varchar(255) DEFAULT NULL,
  `c_lname` varchar(255) DEFAULT NULL,
  `c_ROLL_NUMBER` int DEFAULT NULL,
  `c_DOB` varchar(255) DEFAULT NULL,
  `c_img` varchar(255) DEFAULT NULL,
  `Diagnosis` varchar(2000) DEFAULT NULL,
  `Identity` varchar(512) DEFAULT NULL,
  `Prev_Report` varchar(512) DEFAULT NULL,
  `c_gender` varchar(10) DEFAULT NULL,
  `Assigned_Therapist` varchar(1000) DEFAULT NULL,
  `Assigned_Admin` varchar(1000) DEFAULT NULL,
  `Assigned_Forms` varchar(1000) DEFAULT NULL,
  `student_Id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`student_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent`
--

LOCK TABLES `parent` WRITE;
/*!40000 ALTER TABLE `parent` DISABLE KEYS */;
INSERT INTO `parent` VALUES ('Nipun1','$2a$10$gUv1KxeCT2xk8/zY1LGk8uaW2hkmA6hKd10GQNBpYy0UcYYOBEoPC','ashish','tulsian','nipun@gmail.com','8780583781','undefined','Nipun','Tulsian',2021101055,'2018-06-13','../uploads/Nipun1/image-1686122671653.kidsens_photo.jpeg','adhd','../uploads/Nipun1/identification-1686122671656.REPORT-FORMAT (1).pdf','../uploads/Nipun1/reports-1686122671669.REPORT-FORMAT (1).pdf','M','sima@gmail.com','abc@gmail.com',NULL,1);
/*!40000 ALTER TABLE `parent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `QUESTION_ID` int NOT NULL AUTO_INCREMENT,
  `FORM_ID` int DEFAULT NULL,
  `Question` varchar(2000) DEFAULT NULL,
  `QUESTION_TYPE` varchar(100) DEFAULT NULL,
  `max_marks` int DEFAULT NULL,
  `Category` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`QUESTION_ID`),
  KEY `FORM_ID` (`FORM_ID`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`FORM_ID`) REFERENCES `forms` (`FORM_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_details`
--

DROP TABLE IF EXISTS `report_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_details` (
  `type` varchar(200) DEFAULT NULL,
  `lower` int DEFAULT NULL,
  `upper` int DEFAULT NULL,
  `message` longtext,
  `delay` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_details`
--

LOCK TABLES `report_details` WRITE;
/*!40000 ALTER TABLE `report_details` DISABLE KEYS */;
INSERT INTO `report_details` VALUES ('general',2,3,'Development is a broad term that encompasses a great number of progressive achievements and abilities. For a child to develop normally they must attain physical milestones like sitting and walking. They must acquire the expression and the comprehension of language. They must be able to retain old knowledge and use it as the foundation for new knowledge. They must learn to relate effectively to the people and the environment around them. Development is a global process where no domain exists in isolation of another. It is rare to find a task that relies solely on one skill which is why if one area is lagging or dysfunctional, the entire process of development is compromised. When these areas of cognition or function are delayed, a child may be said to be experiencing a developmental delay.  Here’s the detailed report of the child’s developmental.',NULL);
/*!40000 ALTER TABLE `report_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screening`
--

DROP TABLE IF EXISTS `screening`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `screening` (
  `screening_id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(200) DEFAULT NULL,
  `stage_name` varchar(200) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `screening_mode` varchar(200) DEFAULT 'ONLINE',
  `screening_indicator` int DEFAULT '1',
  `screening_status` varchar(200) DEFAULT 'REGULAR',
  `comments` longtext,
  PRIMARY KEY (`screening_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screening`
--

LOCK TABLES `screening` WRITE;
/*!40000 ALTER TABLE `screening` DISABLE KEYS */;
INSERT INTO `screening` VALUES (7,'1','Screening','2023-06-08 03:48:16','2023-06-23 21:58:22','ONLINE',3,'REGULAR',NULL);
/*!40000 ALTER TABLE `screening` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_answers`
--

DROP TABLE IF EXISTS `student_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_answers` (
  `QUESTION_ID` int DEFAULT NULL,
  `student_Id` int DEFAULT NULL,
  `answer` varchar(2000) DEFAULT NULL,
  KEY `QUESTION_ID` (`QUESTION_ID`),
  KEY `student_Id` (`student_Id`),
  CONSTRAINT `student_answers_ibfk_1` FOREIGN KEY (`QUESTION_ID`) REFERENCES `questions` (`QUESTION_ID`),
  CONSTRAINT `student_answers_ibfk_2` FOREIGN KEY (`student_Id`) REFERENCES `parent` (`student_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_answers`
--

LOCK TABLES `student_answers` WRITE;
/*!40000 ALTER TABLE `student_answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_responses`
--

DROP TABLE IF EXISTS `student_responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_responses` (
  `student_Id` varchar(100) DEFAULT NULL,
  `FORM_ID` int DEFAULT NULL,
  `Form_Response` longtext,
  KEY `FORM_ID` (`FORM_ID`),
  CONSTRAINT `student_responses_ibfk_1` FOREIGN KEY (`FORM_ID`) REFERENCES `forms` (`FORM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_responses`
--

LOCK TABLES `student_responses` WRITE;
/*!40000 ALTER TABLE `student_responses` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `therapist`
--

DROP TABLE IF EXISTS `therapist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `therapist` (
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(512) DEFAULT NULL,
  `EMP_ID` varchar(512) DEFAULT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `speciality` varchar(255) DEFAULT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Identity` varchar(255) DEFAULT NULL,
  `Certificate` varchar(255) DEFAULT NULL,
  `Resume` varchar(255) DEFAULT NULL,
  `Assigned_Admin` varchar(1000) DEFAULT NULL,
  `branch` varchar(200) DEFAULT NULL,
  `school` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `therapist`
--

LOCK TABLES `therapist` WRITE;
/*!40000 ALTER TABLE `therapist` DISABLE KEYS */;
INSERT INTO `therapist` VALUES (NULL,'$2a$10$wbmUc30ZMb22XoTmjts1TuAralAn5lqJxyrYHLtjn6A7HxPPcxIy.',NULL,'Ashish','Tulsian',NULL,NULL,'9825139860','ashish@gmail.com',NULL,NULL,NULL,NULL,'abc@gmail.com',NULL,NULL),('Sima100','$2a$10$/A6.DO4GYGl7GlEvqPPLXu/2JZxzpaYbdZRYIN6FEs83ls75Jprkq','1','Sima','Tulsian','../uploads/Sima100/image-1686127610381.kidsens_photo.jpeg','neuro','1234567890','sima@gmail.com','surat','../uploads/Sima100/Identity-1686127610383.REPORT-FORMAT (1).pdf','../uploads/Sima100/Certification-1686127610399.Nipun_Resume (1).pdf','../uploads/Sima100/Resume-1686127610400.Nipun_Resume (1).pdf','abc@gmail.com',NULL,NULL);
/*!40000 ALTER TABLE `therapist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-23 20:57:52
