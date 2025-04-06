-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: test
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_of_article` varchar(255) NOT NULL,
  `beneficial_or_useful_for` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` enum('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending',
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `consultant_id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `consultant_id` (`consultant_id`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`consultant_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'First','everyone','arpitagrawal@gmail.com','Approved','2025-03-06 00:00:00',4,'Sports','2025-03-05 20:52:45','2025-03-25 19:56:15'),(2,'Second','some','arpitagrawal@gmail.com','Approved','2025-03-06 00:00:00',4,'abc','2025-03-05 21:01:14','2025-03-09 04:14:12'),(3,'First','everyone','arpitagrawal@gmail.com','Pending','2025-03-31 00:00:00',4,'abcaa','2025-03-31 16:45:48','2025-03-31 16:45:48');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `business_profiles`
--

DROP TABLE IF EXISTS `business_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `business_profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `cityVillage` varchar(255) DEFAULT NULL,
  `pinCode` varchar(10) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `taluka` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `registrationNo` varchar(50) DEFAULT NULL,
  `slogan` text DEFAULT NULL,
  `specialisation` text DEFAULT NULL,
  `services` text DEFAULT NULL,
  `products` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `business_profiles_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business_profiles`
--

LOCK TABLES `business_profiles` WRITE;
/*!40000 ALTER TABLE `business_profiles` DISABLE KEYS */;
INSERT INTO `business_profiles` VALUES (1,2,'Shiven',NULL,NULL,NULL,NULL,NULL,NULL,'abcd','123','abcd',NULL,NULL,NULL);
/*!40000 ALTER TABLE `business_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (4,'classic'),(3,'Dry fruit'),(1,'earbuds'),(2,'foods'),(5,'testeing');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `city_name` varchar(50) NOT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `city_name` (`city_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Mumbai'),(3,'Nashik'),(2,'Pune');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_developer`
--

DROP TABLE IF EXISTS `contact_developer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_developer` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `query` text NOT NULL,
  `resolved` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `contact_developer_ibfk_1` (`userid`),
  CONSTRAINT `contact_developer_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_developer`
--

LOCK TABLES `contact_developer` WRITE;
/*!40000 ALTER TABLE `contact_developer` DISABLE KEYS */;
INSERT INTO `contact_developer` VALUES (1,2,'Arpit','arpitagrawal348@gmail.com','hellooo',1,'2025-03-02 09:58:16','2025-03-09 06:55:02'),(2,2,'AR','arpit@gmail.com','hellooooooooooo',1,'2025-03-02 10:42:39','2025-03-09 07:00:36'),(8,2,'hey','arpitagrawal308@gmail.com','hey yooooo',0,'2025-03-02 12:15:35','2025-03-02 12:22:03');
/*!40000 ALTER TABLE `contact_developer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crop_pattern`
--

DROP TABLE IF EXISTS `crop_pattern`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crop_pattern` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crop_pattern`
--

LOCK TABLES `crop_pattern` WRITE;
/*!40000 ALTER TABLE `crop_pattern` DISABLE KEYS */;
INSERT INTO `crop_pattern` VALUES (1,'Only one crop per year'),(2,'Two crop per year'),(3,'Three Crops per year'),(4,'More');
/*!40000 ALTER TABLE `crop_pattern` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `family_members`
--

DROP TABLE IF EXISTS `family_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `family_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `relation` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_family_members_userid` (`userid`),
  CONSTRAINT `fk_family_members_userid` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family_members`
--

LOCK TABLES `family_members` WRITE;
/*!40000 ALTER TABLE `family_members` DISABLE KEYS */;
INSERT INTO `family_members` VALUES (1,2,'Wife','Sumita'),(2,2,'Wife','Sumita'),(3,2,'son','raghav');
/*!40000 ALTER TABLE `family_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farm_profiles`
--

DROP TABLE IF EXISTS `farm_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farm_profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `self_name` varchar(50) NOT NULL,
  `area` varchar(100) DEFAULT NULL,
  `source_of_irrigation` varchar(100) DEFAULT NULL,
  `mode_of_irrigation` varchar(50) DEFAULT NULL,
  `sowing_pattern` varchar(100) DEFAULT NULL,
  `crop_pattern` varchar(100) DEFAULT NULL,
  `crops` varchar(100) DEFAULT NULL,
  `shivar` varchar(45) DEFAULT NULL,
  `taluka` varchar(100) DEFAULT NULL,
  `district` varchar(50) DEFAULT NULL,
  `state` varchar(60) DEFAULT NULL,
  `farm_equipments` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`userid`),
  CONSTRAINT `fk_user` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_profiles`
--

LOCK TABLES `farm_profiles` WRITE;
/*!40000 ALTER TABLE `farm_profiles` DISABLE KEYS */;
INSERT INTO `farm_profiles` VALUES (1,2,'Arpit','sector48','Open Well, River','Sprinkler, Flow','Contract, Sharing','Only one crop per year','multiple',NULL,'abcds',NULL,NULL,NULL);
/*!40000 ALTER TABLE `farm_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mobile_number` varchar(20) DEFAULT NULL,
  `service` varchar(50) NOT NULL,
  `review` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `feedback_ibfk_1` (`userid`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,2,'Arpit','9696693934','World','xdfgfcghhgestyuiuytrtyuytrdifisfgeiurfeiugeigtiegtwuetg','2025-03-09 16:29:49','2025-03-09 16:30:35');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `government_schemes`
--

DROP TABLE IF EXISTS `government_schemes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `government_schemes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(255) NOT NULL,
  `consultant_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `scheme_image` varchar(255) NOT NULL,
  `scheme_name` varchar(255) NOT NULL,
  `sponsored_by` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `useful_for` text NOT NULL,
  `government_scheme_description` text NOT NULL,
  `purpose` text NOT NULL,
  `eligibility_criteria` text NOT NULL,
  `documents_required` text NOT NULL,
  `terms_conditions` text NOT NULL,
  `apply_at` varchar(255) NOT NULL,
  `download_form` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `status` enum('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_id` (`unique_id`),
  KEY `consultant_id` (`consultant_id`),
  CONSTRAINT `government_schemes_ibfk_1` FOREIGN KEY (`consultant_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `government_schemes`
--

LOCK TABLES `government_schemes` WRITE;
/*!40000 ALTER TABLE `government_schemes` DISABLE KEYS */;
INSERT INTO `government_schemes` VALUES (1,'1231',4,'arpitagrawal@gmail.com','http://akhfvakf.com','akjdaf','akhfvakf','akhfvakf','Sports','Cricket','every person','qibaibaabiabiaa','akhfvakf','habiabaababui','habiabaiabub','uhabibaibaiabiabia','http://akhfvakf.com','http://akhfvakf.com','http://akhfvakf.com','Approved','2025-03-06 19:20:04','2025-03-25 19:32:23','2025-03-07'),(2,'7777',4,'arpitagrawal@gmail.com','http://akhfvaabsdkahfafkf.com','Sporting','akh','akhfvakf','Sport','Football','every person','qibaibaabiabiaa','akhfvakf','habiabaababui','habiabaiabub','uhabibaibaiabiabia','http://akhfvakf.com','http://akhfvakf.com','http://akhfvakf.com','Pending','2025-04-05 13:35:03','2025-04-05 13:35:03','2025-04-03');
/*!40000 ALTER TABLE `government_schemes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `live_programs`
--

DROP TABLE IF EXISTS `live_programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `live_programs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `consultant_id` int(11) NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `date_of_program` date NOT NULL,
  `time` time NOT NULL,
  `conducted_by` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `program_link` text DEFAULT NULL,
  `conducted` tinyint(1) DEFAULT 0,
  `if_not_why` text DEFAULT NULL,
  `number_of_participants` int(11) DEFAULT 0,
  `subscriber_feedback` text DEFAULT NULL,
  `your_feedback` text DEFAULT NULL,
  `our_feedback` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('pending','rejected','approved') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_id` (`unique_id`),
  KEY `consultant_id` (`consultant_id`),
  CONSTRAINT `live_programs_ibfk_1` FOREIGN KEY (`consultant_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `live_programs`
--

LOCK TABLES `live_programs` WRITE;
/*!40000 ALTER TABLE `live_programs` DISABLE KEYS */;
INSERT INTO `live_programs` VALUES (1,4,'1231','2025-04-02','07:30:00','arpit','Global','legal','http://localhost:5173/consultant/LivePrograms',0,NULL,0,NULL,'best program',NULL,'2025-03-31 10:08:49','2025-04-01 12:50:16','pending');
/*!40000 ALTER TABLE `live_programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mode_of_irrigation`
--

DROP TABLE IF EXISTS `mode_of_irrigation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mode_of_irrigation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mode_of_irrigation`
--

LOCK TABLES `mode_of_irrigation` WRITE;
/*!40000 ALTER TABLE `mode_of_irrigation` DISABLE KEYS */;
INSERT INTO `mode_of_irrigation` VALUES (1,'Dry'),(2,'Sprinkler'),(3,'Drip'),(4,'Flow');
/*!40000 ALTER TABLE `mode_of_irrigation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT current_timestamp(),
  `email` varchar(255) NOT NULL,
  `consultant_id` int(11) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `useful_for` text DEFAULT NULL,
  `links` text DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `consultant_id` (`consultant_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`consultant_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (8,'2025-03-07 00:00:00','arpitagrawal348@gmail.com',4,'abcaa','Cricket','every person','https://hello.com','ccfc','fggjiyyu8y','Approved','2025-03-05 20:06:50','2025-03-25 19:56:25'),(9,'2025-03-08 00:00:00','arpitagrawal3048@outlook.com',4,'Sports','Cricket','every person','https://hello.com','cricket','Cricket is a bat-and-ball game played between two teams of 11 players. It originated in England and is now popular in many countries, including India. \nHow to play\nThe game is played on an oval-shaped field. \nIn the middle of the field is a pitch with a wicket at each end. \nA wicket is made up of three sticks called stumps, with two small pieces of wood called bails on top. \nThe batting team tries to score runs by hitting the ball and running to the other end of the pitch. \nThe bowling team tries to get the batters out, or take wickets. ','Approved','2025-03-08 11:56:44','2025-03-25 19:44:05');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_price_history`
--

DROP TABLE IF EXISTS `product_price_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_price_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `min_rate` decimal(10,2) NOT NULL,
  `max_rate` decimal(10,2) NOT NULL,
  `city_name` varchar(100) NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_price_history_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_price_history`
--

LOCK TABLES `product_price_history` WRITE;
/*!40000 ALTER TABLE `product_price_history` DISABLE KEYS */;
INSERT INTO `product_price_history` VALUES (2,7,'Chane ki daal',15.00,25.00,'Mumbai','2025-03-23 16:08:33'),(3,8,'potato',20.00,40.00,'pune','2025-03-23 17:19:32'),(4,10,'Tomato',20.00,400.00,'pune','2025-03-23 17:21:54'),(5,11,'Moong Daal',10.00,30.00,'Mumbai','2025-03-23 18:05:39'),(6,12,'Chane',20.00,40.00,'Mumbai','2025-03-23 18:57:41'),(8,7,'Chane ki daal',20.00,40.00,'Mumbai','2025-04-05 11:56:09'),(9,11,'Moong Daal',18.00,30.00,'Mumbai','2025-04-05 11:56:09');
/*!40000 ALTER TABLE `product_price_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `variety` varchar(45) DEFAULT NULL,
  `city_name` varchar(50) DEFAULT NULL,
  `min_rate` decimal(10,2) DEFAULT NULL,
  `max_rate` decimal(10,2) DEFAULT NULL,
  `traded_quantity` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (7,'Chane ki daal','foods','chana','Mumbai',20.00,40.00,200,'2025-02-23 19:48:35'),(8,'potato','foods','basic','Pune',20.00,40.00,100,'2025-02-23 19:56:35'),(9,'Bhindi','foods','lambi','Nashik',150.00,200.00,300,'2025-02-22 19:57:18'),(10,'Tomato','classic','updated','Mumbai',20.00,400.00,120,'2025-02-21 19:57:58'),(11,'Moong Daal','foods','Chilke Vaali','Mumbai',18.00,30.00,NULL,'2025-03-23 17:57:45'),(12,'Chane','Dry fuits','chilke vaale','Mumbai',20.00,40.00,NULL,'2025-03-23 18:05:00');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professional_profile`
--

DROP TABLE IF EXISTS `professional_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professional_profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `userid` int(11) NOT NULL,
  `mobile_number` varchar(15) NOT NULL,
  `address` text DEFAULT NULL,
  `city_village` varchar(100) DEFAULT NULL,
  `pin_code` varchar(10) DEFAULT NULL,
  `taluka` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `experience` varchar(50) DEFAULT NULL,
  `field_of_expertise` text DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `social_media_channels` text DEFAULT NULL,
  `social_media_accounts` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_id` (`email_id`),
  KEY `userid` (`userid`),
  CONSTRAINT `professional_profile_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professional_profile`
--

LOCK TABLES `professional_profile` WRITE;
/*!40000 ALTER TABLE `professional_profile` DISABLE KEYS */;
INSERT INTO `professional_profile` VALUES (1,'Shiven',4,'9696693934',NULL,NULL,NULL,NULL,NULL,NULL,'Btech','4','technical',NULL,NULL,NULL,NULL,'2025-03-03 20:06:34');
/*!40000 ALTER TABLE `professional_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `source_of_irrigation`
--

DROP TABLE IF EXISTS `source_of_irrigation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `source_of_irrigation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `source_of_irrigation`
--

LOCK TABLES `source_of_irrigation` WRITE;
/*!40000 ALTER TABLE `source_of_irrigation` DISABLE KEYS */;
INSERT INTO `source_of_irrigation` VALUES (1,'Open Well'),(2,'Tube Well'),(3,'Pond'),(4,'River'),(5,'Self'),(6,'Rent'),(7,'Irrigation Cannal'),(8,'Sharing');
/*!40000 ALTER TABLE `source_of_irrigation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sowing_pattern`
--

DROP TABLE IF EXISTS `sowing_pattern`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sowing_pattern` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sowing_pattern`
--

LOCK TABLES `sowing_pattern` WRITE;
/*!40000 ALTER TABLE `sowing_pattern` DISABLE KEYS */;
INSERT INTO `sowing_pattern` VALUES (1,'Self'),(2,'Rent'),(3,'Contract'),(4,'Sharing');
/*!40000 ALTER TABLE `sowing_pattern` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `success_stories`
--

DROP TABLE IF EXISTS `success_stories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `success_stories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `consultant_id` int(11) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `success_story` text NOT NULL,
  `status` enum('pending','rejected','approved') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_id` (`unique_id`),
  KEY `consultant_id` (`consultant_id`),
  CONSTRAINT `success_stories_ibfk_1` FOREIGN KEY (`consultant_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `success_stories`
--

LOCK TABLES `success_stories` WRITE;
/*!40000 ALTER TABLE `success_stories` DISABLE KEYS */;
INSERT INTO `success_stories` VALUES (1,'2025-03-07','1231',4,'Global','Glob','World','foifhwe','approved','2025-03-31 16:34:11','2025-04-01 08:06:45');
/*!40000 ALTER TABLE `success_stories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','consultant','subscriber') DEFAULT NULL,
  `mobile_number` varchar(45) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city_village` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `pin_code` varchar(20) DEFAULT NULL,
  `district` varchar(45) DEFAULT NULL,
  `taluka` varchar(45) DEFAULT NULL,
  `can_update` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Arpit','arpitagrawal3048@gmail.com','$2a$10$3iyHRNkYRFyfNNMIzBvwZ.kX4.MvzyE2NrNZhMbNxtqj4gz6AJcGe','admin',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(2,'Arpit','arpitagrawal348@gmail.com','$2a$10$K271pYQUpkogMkmotYYTjOhvmDvV/mu8ylO47XBu5SujM1s4mSUXq','subscriber','9696693934','sector48','Gurugram',NULL,'210001','gurugram',NULL,1),(3,'Tester','arpitagrawala308@gmail.com','$2a$10$Kho5Tyzxeu8x6D8NLaVBv.0Zzv0C4Sio8QCXbHfi/8yio3dcx8SHC','subscriber',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(4,'Arpit Agrawala','arpitagrawal@gmail.com','$2a$10$T3.NcHZg3I.IskItZBU5GeHT9KM9/oUWQxKb5bHmbeJiZzrKmSyqG','consultant','9696693934','sector48','Mumbai','UP','211003',NULL,NULL,0),(5,'Subscriber','subscriber@gmail.com','$2a$10$UE.khhAz6g0iRk6zQp9MjeMBSbJhlpqV5fCU.rbAJoAIWWlUyGNkG','subscriber',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(6,'Admin','admin@gmail.com','$2a$10$LuHDfkrozAejUncYUoGHNuwWM.c3Sey9nkEJ5m.Lla2XVgf2.lSMG','admin',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weather_updates`
--

DROP TABLE IF EXISTS `weather_updates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weather_updates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `consultant_id` int(11) NOT NULL,
  `prediction_area` varchar(255) NOT NULL,
  `prediction` text NOT NULL,
  `advice` text NOT NULL,
  `status` enum('pending','rejected','approved') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `consultant_id` (`consultant_id`),
  CONSTRAINT `weather_updates_ibfk_1` FOREIGN KEY (`consultant_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weather_updates`
--

LOCK TABLES `weather_updates` WRITE;
/*!40000 ALTER TABLE `weather_updates` DISABLE KEYS */;
/*!40000 ALTER TABLE `weather_updates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weekly_consultation`
--

DROP TABLE IF EXISTS `weekly_consultation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weekly_consultation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `unique_id` varchar(255) NOT NULL,
  `date_of_weekly_consultation` date NOT NULL,
  `topic` varchar(255) NOT NULL,
  `time` time NOT NULL,
  `conducted_by` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `program_link` text NOT NULL,
  `conducted` enum('Yes','No') DEFAULT 'No',
  `if_not_why` text DEFAULT NULL,
  `number_of_participants` int(11) DEFAULT 0,
  `subscriber_feedback` text DEFAULT NULL,
  `your_feedback` text DEFAULT NULL,
  `our_feedback` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weekly_consultation`
--

LOCK TABLES `weekly_consultation` WRITE;
/*!40000 ALTER TABLE `weekly_consultation` DISABLE KEYS */;
/*!40000 ALTER TABLE `weekly_consultation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-06 11:41:53
