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
  `QUESTION_ID` int DEFAULT NULL,
  `FORM_ID` int DEFAULT NULL,
  `ANSWER` varchar(2000) DEFAULT NULL,
  `MARKS` int DEFAULT NULL,
  KEY `FORM_ID` (`FORM_ID`),
  KEY `QUESTION_ID` (`QUESTION_ID`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`FORM_ID`) REFERENCES `forms` (`FORM_ID`),
  CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`QUESTION_ID`) REFERENCES `questions` (`QUESTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ANSWERS`
--

LOCK TABLES `ANSWERS` WRITE;
/*!40000 ALTER TABLE `ANSWERS` DISABLE KEYS */;
INSERT INTO `ANSWERS` VALUES (3,8,'Option 1\'s',0),(3,8,'Option 2\'s',1),(3,8,'Option 3\'s',0),(4,9,'Option 1',1),(4,9,'Option 2',0),(4,9,'Option 3',0),(5,9,'Option 1',1),(5,9,'Option 2',0),(5,9,'Option 3',0),(6,9,'Option 1',1),(6,9,'Option 2',0),(6,9,'Option 3',0),(7,9,'Option 1',1),(7,9,'Option 2',0),(7,9,'Option 3',0),(8,9,'Option 1',1),(8,9,'Option 2',0),(8,9,'Option 3',0),(9,9,'Option 1',1),(9,9,'Option 2',0),(9,9,'Option 3',0),(10,9,'Option 1',1),(10,9,'Option 2',0),(10,9,'Option 3',0),(11,9,'Option 1',1),(11,9,'Option 2',0),(11,9,'Option 3',0),(12,9,'Option 1',1),(12,9,'Option 2',0),(12,9,'Option 3',0),(13,9,'Option 1',1),(13,9,'Option 2',0),(13,9,'Option 3',0),(14,9,'Option 1',1),(14,9,'Option 2',0),(14,9,'Option 3',0),(15,9,'Option 1',1),(15,9,'Option 2',0),(15,9,'Option 3',0),(20,10,'Option 1',0),(20,10,'Option 2',0),(20,10,'Option 3',0),(21,10,'Option 1',0),(21,10,'Option 2',1),(21,10,'Option 3',0);
/*!40000 ALTER TABLE `ANSWERS` ENABLE KEYS */;
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
INSERT INTO `AssessFormMap` VALUES (1,'Screening','asses',8),(1,'Screening','asses',9),(1,'Screening','asses',10);
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
INSERT INTO `default_AssessFormMap` VALUES ('abc@gmail.com','Screening','asses',8),('abc@gmail.com','Screening','asses',9),('abc@gmail.com','Screening','asses',10);
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
  `message_moderate` varchar(200) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forms`
--

LOCK TABLES `forms` WRITE;
/*!40000 ALTER TABLE `forms` DISABLE KEYS */;
INSERT INTO `forms` VALUES (8,'Header 1'),(9,'Header 2'),(10,'This is a title for a long form for checking overflow from box');
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
INSERT INTO `forms_obj` VALUES (8,'[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"Header 1\"},{\"type\":\"radio-group\",\"required\":false,\"label\":\"Radio Group 1\",\"inline\":false,\"name\":\"radio-group-1686124243589-0\",\"other\":false,\"Marks\":3,\"Category\":\"behaviour\",\"values\":[{\"label\":\"Option 1\'s\",\"value\":\"option-1\",\"selected\":false},{\"label\":\"Option 2\'s\",\"value\":\"option-2\",\"selected\":true},{\"label\":\"Option 3\'s\",\"value\":\"option-3\",\"selected\":false}]}]','admin','abc@gmail.com'),(9,'[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"Header 2\"},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Checkbox Group\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1686125142896-0\",\"other\":false,\"Marks\":0,\"Category\":\"speech\",\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Checkbox Group\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1686125204679\",\"other\":false,\"Marks\":0,\"Category\":\"speech\",\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Checkbox Group\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1686125203252\",\"other\":false,\"Marks\":0,\"Category\":\"speech\",\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Checkbox Group\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1686125202527\",\"other\":false,\"Marks\":0,\"Category\":\"speech\",\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Checkbox Group\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1686125201746\",\"other\":false,\"Marks\":0,\"Category\":\"speech\",\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Checkbox Group\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1686125200691\",\"other\":false,\"Marks\":0,\"Category\":\"speech\",\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Checkbox Group\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1686125194211\",\"other\":false,\"Marks\":0,\"Category\":\"speech\",\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Checkbox Group\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1686125194036\",\"other\":false,\"Marks\":0,\"Category\":\"speech\",\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Checkbox Group\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1686125193833\",\"other\":false,\"Marks\":0,\"Category\":\"speech\",\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Checkbox Group\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1686125193558\",\"other\":false,\"Marks\":0,\"Category\":\"speech\",\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Checkbox Group\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1686125192992\",\"other\":false,\"Marks\":0,\"Category\":\"speech\",\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Checkbox Group\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1686125192038\",\"other\":false,\"Marks\":0,\"Category\":\"speech\",\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]}]','admin','abc@gmail.com'),(10,'[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"This is a title for a long form for checking overflow from box\"},{\"type\":\"radio-group\",\"required\":false,\"label\":\"Radio Group\",\"inline\":false,\"name\":\"radio-group-1686125458742-0\",\"other\":false,\"Marks\":0,\"Category\":\"speech\",\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":false},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]},{\"type\":\"radio-group\",\"required\":false,\"label\":\"Radio Group abc\",\"inline\":false,\"name\":\"radio-group-1686133658762-0\",\"other\":false,\"Marks\":0,\"Category\":\"speech\",\"values\":[{\"label\":\"Option 1\",\"value\":\"option-1\",\"selected\":false},{\"label\":\"Option 2\",\"value\":\"option-2\",\"selected\":true},{\"label\":\"Option 3\",\"value\":\"option-3\",\"selected\":false}]}]','admin','abc@gmail.com');
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
INSERT INTO `parent` VALUES ('Nipun1','$2a$10$gUv1KxeCT2xk8/zY1LGk8uaW2hkmA6hKd10GQNBpYy0UcYYOBEoPC','ashish','tulsian','nipun@gmail.com','8780583781','undefined','Nipun','Tulsian',2021101055,'2022-06-13','../uploads/Nipun1/image-1686122671653.kidsens_photo.jpeg','adhd','../uploads/Nipun1/identification-1686122671656.REPORT-FORMAT (1).pdf','../uploads/Nipun1/reports-1686122671669.REPORT-FORMAT (1).pdf','M','','abc@gmail.com',NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (3,8,'Radio Group 1','radio-group',3,'behaviour'),(4,9,'Checkbox Group','checkbox-group',0,'speech'),(5,9,'Checkbox Group','checkbox-group',0,'speech'),(6,9,'Checkbox Group','checkbox-group',0,'speech'),(7,9,'Checkbox Group','checkbox-group',0,'speech'),(8,9,'Checkbox Group','checkbox-group',0,'speech'),(9,9,'Checkbox Group','checkbox-group',0,'speech'),(10,9,'Checkbox Group','checkbox-group',0,'speech'),(11,9,'Checkbox Group','checkbox-group',0,'speech'),(12,9,'Checkbox Group','checkbox-group',0,'speech'),(13,9,'Checkbox Group','checkbox-group',0,'speech'),(14,9,'Checkbox Group','checkbox-group',0,'speech'),(15,9,'Checkbox Group','checkbox-group',0,'speech'),(20,10,'Radio Group','radio-group',0,'speech'),(21,10,'Radio Group abc','radio-group',0,'speech');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screening`
--

LOCK TABLES `screening` WRITE;
/*!40000 ALTER TABLE `screening` DISABLE KEYS */;
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
  PRIMARY KEY (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `therapist`
--

LOCK TABLES `therapist` WRITE;
/*!40000 ALTER TABLE `therapist` DISABLE KEYS */;
INSERT INTO `therapist` VALUES ('Sima100','$2a$10$/A6.DO4GYGl7GlEvqPPLXu/2JZxzpaYbdZRYIN6FEs83ls75Jprkq','1','Sima','Tulsian','../uploads/Sima100/image-1686127610381.kidsens_photo.jpeg','neuro','1234567890','sima@gmail.com','surat','../uploads/Sima100/Identity-1686127610383.REPORT-FORMAT (1).pdf','../uploads/Sima100/Certification-1686127610399.Nipun_Resume (1).pdf','../uploads/Sima100/Resume-1686127610400.Nipun_Resume (1).pdf','abc@gmail.com');
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

-- Dump completed on 2023-06-07 16:27:59
