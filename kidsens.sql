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
-- Table structure for table `ANSWERS`
--

DROP TABLE IF EXISTS `ANSWERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ANSWERS` (
  `QUESTION_ID` varchar(200) DEFAULT NULL,
  `FORM_ID` varchar(200) DEFAULT NULL,
  `ANSWER` varchar(2000) DEFAULT NULL,
  `MARKS` int DEFAULT NULL,
  KEY `QUESTION_ID` (`QUESTION_ID`),
  KEY `FORM_ID` (`FORM_ID`),
  CONSTRAINT `ANSWERS_ibfk_1` FOREIGN KEY (`QUESTION_ID`) REFERENCES `questions` (`QUESTION_ID`),
  CONSTRAINT `ANSWERS_ibfk_2` FOREIGN KEY (`FORM_ID`) REFERENCES `forms` (`FORM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ANSWERS`
--

LOCK TABLES `ANSWERS` WRITE;
/*!40000 ALTER TABLE `ANSWERS` DISABLE KEYS */;
INSERT INTO `ANSWERS` VALUES ('1685186260532','1685186260530','Option 1',0),('1685186260532','1685186260530','Option 2',1),('1685186260532','1685186260530','Option 3',0),('1685186276673','1685186276671','Option 1',0),('1685186276673','1685186276671','Option 2',1),('1685186276673','1685186276671','Option 3',0),('1685186295914','1685186295913','Option 1',0),('1685186295914','1685186295913','Option 2',0),('1685186295914','1685186295913','Option 3',1),('1685186311750','1685186311747','Option 1',0),('1685186311750','1685186311747','Option 2',0),('1685186311750','1685186311747','Option 3',1),('1685335472145','1685335472139','Option 1',0),('1685335472145','1685335472139','Option 2',1),('1685335472145','1685335472139','Option 3',0);
/*!40000 ALTER TABLE `ANSWERS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AssessFormMap`
--

DROP TABLE IF EXISTS `AssessFormMap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AssessFormMap` (
  `student_Id` varchar(100) NOT NULL,
  `stage` varchar(100) NOT NULL,
  `assessment` varchar(100) NOT NULL,
  `FORM_ID` varchar(200) NOT NULL,
  PRIMARY KEY (`student_Id`,`stage`,`assessment`,`FORM_ID`),
  KEY `FORM_ID` (`FORM_ID`),
  CONSTRAINT `AssessFormMap_ibfk_2` FOREIGN KEY (`FORM_ID`) REFERENCES `forms` (`FORM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AssessFormMap`
--

LOCK TABLES `AssessFormMap` WRITE;
/*!40000 ALTER TABLE `AssessFormMap` DISABLE KEYS */;
INSERT INTO `AssessFormMap` VALUES ('1684899880199','PreConsult','precon1','1685186260530'),('1684899880199','Consult','con1','1685186276671'),('1684899880199','Assessment','assess1','1685186295913'),('1684899880199','Therapy','ther1','1685186311747');
/*!40000 ALTER TABLE `AssessFormMap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assessments`
--

DROP TABLE IF EXISTS `assessments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessments` (
  `student_Id` varchar(100) NOT NULL,
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
INSERT INTO `assessments` VALUES ('1684899880199','Assessment','assess1'),('1684899880199','Consult','con1'),('1684899880199','PreConsult','precon1'),('1684899880199','Therapy','ther1');
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
  `FORM_ID` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `default_AssessFormMap`
--

LOCK TABLES `default_AssessFormMap` WRITE;
/*!40000 ALTER TABLE `default_AssessFormMap` DISABLE KEYS */;
INSERT INTO `default_AssessFormMap` VALUES ('abc@gmail.com','PreConsult','precon1','1685186260530'),('abc@gmail.com','Consult','con1','1685186276671'),('abc@gmail.com','Assessment','assess1','1685186295913'),('abc@gmail.com','Therapy','ther1','1685186311747'),('abc@gmail.com','PreConsult','precon1','1685335472139');
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
  `message_mild` varchar(200) DEFAULT NULL,
  `message_severe` varchar(200) DEFAULT NULL,
  `message_moderate` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `default_assessments`
--

LOCK TABLES `default_assessments` WRITE;
/*!40000 ALTER TABLE `default_assessments` DISABLE KEYS */;
INSERT INTO `default_assessments` VALUES ('abc@gmail.com','PreConsult','precon1',20,10,'mild','sev','mod'),('abc@gmail.com','Consult','con1',20,10,'mild','sev','mod'),('abc@gmail.com','Assessment','assess1',20,10,'mild','sev','mod'),('abc@gmail.com','Therapy','ther1',20,10,'mild','sev','mod');
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
INSERT INTO `default_stages` VALUES ('abc@gmail.com','Assessment',3),('abc@gmail.com','Consult',2),('abc@gmail.com','PreConsult',1),('abc@gmail.com','Therapy',4);
/*!40000 ALTER TABLE `default_stages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forms`
--

DROP TABLE IF EXISTS `forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forms` (
  `FORM_ID` varchar(200) NOT NULL,
  `FORM_NAME` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`FORM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forms`
--

LOCK TABLES `forms` WRITE;
/*!40000 ALTER TABLE `forms` DISABLE KEYS */;
INSERT INTO `forms` VALUES ('1685186260530','precon1'),('1685186276671','con1'),('1685186295913','assess1'),('1685186311747','ther1'),('1685335472139','check');
/*!40000 ALTER TABLE `forms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forms_obj`
--

DROP TABLE IF EXISTS `forms_obj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forms_obj` (
  `FORM_ID` varchar(200) NOT NULL,
  `FORM_OBJ` longtext,
  `SENDER_TYPE` varchar(2000) NOT NULL,
  `SENDER_ID` varchar(2000) NOT NULL,
  PRIMARY KEY (`FORM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forms_obj`
--

LOCK TABLES `forms_obj` WRITE;
/*!40000 ALTER TABLE `forms_obj` DISABLE KEYS */;
INSERT INTO `forms_obj` VALUES ('1685186260530','[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"precon1\"},{\"type\":\"radio-group\",\"required\":false,\"label\":\"Radio Group\",\"inline\":false,\"name\":\"radio-group-1685186252590-0\",\"other\":false,\"Marks\":0,\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":false},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":true},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]}]','admin','abc@gmail.com'),('1685186276671','[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"con1\"},{\"type\":\"radio-group\",\"required\":false,\"label\":\"Radio Group\",\"inline\":false,\"name\":\"radio-group-1685186272799-0\",\"other\":false,\"Marks\":0,\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":false},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":true},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]}]','admin','abc@gmail.com'),('1685186295913','[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"assess1\"},{\"type\":\"radio-group\",\"required\":false,\"label\":\"Radio Group\",\"inline\":false,\"name\":\"radio-group-1685186280523-0\",\"other\":false,\"Marks\":0,\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":false},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":true}]}]','admin','abc@gmail.com'),('1685186311747','[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"ther1\"},{\"type\":\"radio-group\",\"required\":false,\"label\":\"Radio Group\",\"inline\":false,\"name\":\"radio-group-1685186308315-0\",\"other\":false,\"Marks\":0,\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":false},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":true}]}]','admin','abc@gmail.com'),('1685335472139','[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"check\"},{\"type\":\"radio-group\",\"required\":false,\"label\":\"Radio Group\",\"inline\":false,\"name\":\"radio-group-1685335467466-0\",\"other\":false,\"Marks\":0,\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":false},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":true},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]}]','admin','abc@gmail.com');
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
  `FORM_ID` varchar(100) DEFAULT NULL,
  `QUESTION_ID` varchar(200) DEFAULT NULL,
  `Max_Marks` int DEFAULT NULL,
  `Marks_Obtained` int DEFAULT NULL
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
  `student_Id` varchar(100) NOT NULL,
  PRIMARY KEY (`student_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent`
--

LOCK TABLES `parent` WRITE;
/*!40000 ALTER TABLE `parent` DISABLE KEYS */;
INSERT INTO `parent` VALUES ('Nipun100','$2a$10$J6R0.rhIP4Y7XE4dRzFsHO5cV1.Rdm34eWUkwCcT2won/iDmBRv7C','Ashish','Tulsian','nipun.tulsian@students.iiit.ac.in','8780583781','undefined','Nipun','Tulsian',16,'2003-06-13','../uploads/Nipun100/image-1684900127084.kidsens_photo.jpeg','ADHD','../uploads/Nipun100/identification-1684900127092.NipunTulsianResume (1).pdf','../uploads/Nipun100/reports-1684900127093.coorg_hotel.pdf','M','','abc@gmail.com',NULL,'1684899880199');
/*!40000 ALTER TABLE `parent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `QUESTION_ID` varchar(200) NOT NULL,
  `FORM_ID` varchar(200) DEFAULT NULL,
  `Question` varchar(2000) DEFAULT NULL,
  `QUESTION_TYPE` varchar(100) DEFAULT NULL,
  `max_marks` int DEFAULT NULL,
  PRIMARY KEY (`QUESTION_ID`),
  KEY `FORM_ID` (`FORM_ID`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`FORM_ID`) REFERENCES `forms` (`FORM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES ('1685186260532','1685186260530','Radio Group','radio-group',0),('1685186276673','1685186276671','Radio Group','radio-group',0),('1685186295914','1685186295913','Radio Group','radio-group',0),('1685186311750','1685186311747','Radio Group','radio-group',0),('1685335472145','1685335472139','Radio Group','radio-group',0);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screening`
--

LOCK TABLES `screening` WRITE;
/*!40000 ALTER TABLE `screening` DISABLE KEYS */;
INSERT INTO `screening` VALUES (1,'1684899880199','Assessment','2023-05-27 00:00:00','2023-05-27 00:00:00','ONLINE',1,'REGULAR',NULL),(2,'1684899880199','Consult','2023-05-27 00:00:00','2023-05-27 00:00:00','ONLINE',1,'REGULAR',NULL),(3,'1684899880199','PreConsult','2023-05-27 00:00:00','2023-05-29 00:00:00','ONLINE',1,'REGULAR',NULL),(4,'1684899880199','Therapy','2023-05-27 00:00:00','2023-05-27 00:00:00','ONLINE',1,'REGULAR',NULL);
/*!40000 ALTER TABLE `screening` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_responses`
--

DROP TABLE IF EXISTS `student_responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_responses` (
  `student_Id` varchar(100) DEFAULT NULL,
  `FORM_ID` varchar(100) DEFAULT NULL,
  `Form_Response` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_responses`
--

LOCK TABLES `student_responses` WRITE;
/*!40000 ALTER TABLE `student_responses` DISABLE KEYS */;
INSERT INTO `student_responses` VALUES ('nipun.tulsian@students.iiit.ac.in','1685186295913','[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"assess1\"},{\"type\":\"radio-group\",\"required\":false,\"label\":\"Radio Group\",\"inline\":false,\"name\":\"radio-group-1685186280523-0\",\"other\":false,\"Marks\":0,\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":false},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}],\"userData\":[\"option-2\"]}]'),('nipun.tulsian@students.iiit.ac.in','1685186276671','[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"con1\"},{\"type\":\"radio-group\",\"required\":false,\"label\":\"Radio Group\",\"inline\":false,\"name\":\"radio-group-1685186272799-0\",\"other\":false,\"Marks\":0,\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":false},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}],\"userData\":[\"option-3\"]}]'),('nipun.tulsian@students.iiit.ac.in','1685186260530','[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"precon1\"},{\"type\":\"radio-group\",\"required\":false,\"label\":\"Radio Group\",\"inline\":false,\"name\":\"radio-group-1685186252590-0\",\"other\":false,\"Marks\":0,\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":false},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}],\"userData\":[\"option-1\"]}]'),('nipun.tulsian@students.iiit.ac.in','1685186311747','[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"ther1\"},{\"type\":\"radio-group\",\"required\":false,\"label\":\"Radio Group\",\"inline\":false,\"name\":\"radio-group-1685186308315-0\",\"other\":false,\"Marks\":0,\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":false},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}],\"userData\":[\"option-2\"]}]');
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
  PRIMARY KEY (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `therapist`
--

LOCK TABLES `therapist` WRITE;
/*!40000 ALTER TABLE `therapist` DISABLE KEYS */;
INSERT INTO `therapist` VALUES ('NipunTherapist','$2a$10$Wz00d.MMATXubSuApJdIku7L4jlfJYHcGUEe69qGTf54PLwj6L/6K','2021101055','Nipun','Tulsian','../uploads/NipunTherapist/image-1685204905057.kidsens_photo.jpeg','Neuro','8780583781','nipun.tulsian.nt@gmail.com','citylight','../uploads/NipunTherapist/Identity-1685204905060.Nipun_Resume (1).pdf','../uploads/NipunTherapist/Certification-1685204905060.Science-2 Quiz1 with Answers.pdf','../uploads/NipunTherapist/Resume-1685204905062.Nipun_Resume (1).pdf','abc@gmail.com');
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

-- Dump completed on 2023-05-29 11:40:18
