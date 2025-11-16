-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: tfinal_bd
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `logs_auditoria`
--
DROP DATABASE IF EXISTS tfinal_bd;
CREATE DATABASE tfinal_bd
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;
USE tfinal_bd;

DROP TABLE IF EXISTS `logs_auditoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs_auditoria` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tabla` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `operacion` enum('INSERT','UPDATE','DELETE') COLLATE utf8mb4_general_ci NOT NULL,
  `registro_id` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `datos_previos` json DEFAULT NULL,
  `datos_nuevos` json DEFAULT NULL,
  `ejecutado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs_auditoria`
--

LOCK TABLES `logs_auditoria` WRITE;
/*!40000 ALTER TABLE `logs_auditoria` DISABLE KEYS */;
INSERT INTO `logs_auditoria` VALUES (1,'roles','INSERT','1',NULL,'{\"id\": 1, \"nombre\": \"Administrador\", \"descripcion\": \"Usuario administrador del sistema\"}','2025-11-12 06:27:35'),(2,'usuarios','INSERT','1',NULL,'{\"id\": 1, \"correo\": \"juan@monamour.com\", \"estado\": \"Activo\", \"nombre\": \"Juan\", \"rol_id\": 1, \"celular\": \"3124567890\", \"usuario\": \"jrojas\", \"apellido\": \"Rojas\"}','2025-11-12 06:29:25'),(3,'usuarios','INSERT','2',NULL,'{\"id\": 2, \"correo\": \"ncamejo@monamour.com\", \"estado\": \"Activo\", \"nombre\": \"Natalia\", \"rol_id\": 1, \"celular\": \"3208228376\", \"usuario\": \"ncamejo\", \"apellido\": \"Camejo\"}','2025-11-15 04:21:10'),(4,'usuarios','UPDATE','1','{\"id\": 1, \"correo\": \"juan@monamour.com\", \"estado\": \"Activo\", \"nombre\": \"Juan\", \"rol_id\": 1, \"celular\": \"3124567890\", \"usuario\": \"jrojas\", \"apellido\": \"Rojas\"}','{\"id\": 1, \"correo\": \"juan@monamour.com\", \"estado\": \"Inactivo\", \"nombre\": \"Juan Carlos\", \"rol_id\": 1, \"celular\": \"3124567890\", \"usuario\": \"jrojas\", \"apellido\": \"Rojas\"}','2025-11-15 04:30:40'),(5,'usuarios','INSERT','3',NULL,'{\"id\": 3, \"correo\": \"mcamejo@monamour.com\", \"estado\": \"Activo\", \"nombre\": \"Matias\", \"rol_id\": 1, \"celular\": \"3208324556\", \"usuario\": \"mcamejo\", \"apellido\": \"Camejo\"}','2025-11-15 04:41:07'),(6,'usuarios','DELETE','3','{\"id\": 3, \"correo\": \"mcamejo@monamour.com\", \"estado\": \"Activo\", \"nombre\": \"Matias\", \"rol_id\": 1, \"celular\": \"3208324556\", \"usuario\": \"mcamejo\", \"apellido\": \"Camejo\"}',NULL,'2025-11-15 04:41:38'),(7,'roles','INSERT','2',NULL,'{\"id\": 2, \"nombre\": \"Inventario\", \"descripcion\": \"Usuario administrador del Inventario\"}','2025-11-15 21:39:29'),(8,'roles','INSERT','3',NULL,'{\"id\": 3, \"nombre\": \"ReadOnly\", \"descripcion\": \"Usuario generico de solo lectura en el sistema\"}','2025-11-15 21:42:19'),(9,'roles','UPDATE','3','{\"id\": 3, \"nombre\": \"ReadOnly\", \"descripcion\": \"Usuario generico de solo lectura en el sistema\"}','{\"id\": 3, \"nombre\": \"ReadOnly\", \"descripcion\": \"Rol de usuarios básicos de solo lectura dentro del sistema\"}','2025-11-15 21:44:22'),(10,'roles','UPDATE','2','{\"id\": 2, \"nombre\": \"Inventario\", \"descripcion\": \"Usuario administrador del Inventario\"}','{\"id\": 2, \"nombre\": \"Inventario\", \"descripcion\": \"Rol de usuarios administradores del sistema\"}','2025-11-15 21:46:05'),(11,'roles','UPDATE','1','{\"id\": 1, \"nombre\": \"Administrador\", \"descripcion\": \"Usuario administrador del sistema\"}','{\"id\": 1, \"nombre\": \"Administrador\", \"descripcion\": \"Rol de usuarios administradores del sistema\"}','2025-11-15 21:46:19'),(12,'roles','UPDATE','2','{\"id\": 2, \"nombre\": \"Inventario\", \"descripcion\": \"Rol de usuarios administradores del sistema\"}','{\"id\": 2, \"nombre\": \"Inventario\", \"descripcion\": \"Rol de usuarios administradores del inventario\"}','2025-11-15 21:46:30'),(13,'roles','DELETE','3','{\"id\": 3, \"nombre\": \"ReadOnly\", \"descripcion\": \"Rol de usuarios básicos de solo lectura dentro del sistema\"}',NULL,'2025-11-15 21:47:48');
/*!40000 ALTER TABLE `logs_auditoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `creado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador','Rol de usuarios administradores del sistema','2025-11-12 06:27:35','2025-11-15 21:46:19'),(2,'Inventario','Rol de usuarios administradores del inventario','2025-11-15 21:39:29','2025-11-15 21:46:30');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER `trg_roles_insert` AFTER INSERT ON `roles` FOR EACH ROW INSERT INTO logs_auditoria (tabla, operacion, registro_id, datos_previos, datos_nuevos)

VALUES (

  'roles', 'INSERT', NEW.id,

  NULL,

  JSON_OBJECT(

    'id', NEW.id,

    'nombre', NEW.nombre,

    'descripcion', NEW.descripcion

  )

) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER `trg_roles_update` AFTER UPDATE ON `roles` FOR EACH ROW INSERT INTO logs_auditoria (tabla, operacion, registro_id, datos_previos, datos_nuevos)

VALUES (

  'roles', 'UPDATE', NEW.id,

  JSON_OBJECT(

    'id', OLD.id,

    'nombre', OLD.nombre,

    'descripcion', OLD.descripcion

  ),

  JSON_OBJECT(

    'id', NEW.id,

    'nombre', NEW.nombre,

    'descripcion', NEW.descripcion

  )

) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER `trg_roles_delete` AFTER DELETE ON `roles` FOR EACH ROW INSERT INTO logs_auditoria (tabla, operacion, registro_id, datos_previos, datos_nuevos)

VALUES (

  'roles', 'DELETE', OLD.id,

  JSON_OBJECT(

    'id', OLD.id,

    'nombre', OLD.nombre,

    'descripcion', OLD.descripcion

  ),

  NULL

) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `contrasena` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `celular` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `rol_id` int NOT NULL,
  `correo` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `estado` enum('Activo','Inactivo') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Activo',
  `creado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_usuarios_usuario` (`usuario`),
  UNIQUE KEY `uq_usuarios_correo` (`correo`),
  KEY `fk_usuarios_rol` (`rol_id`),
  CONSTRAINT `fk_usuarios_rol` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `chk_correo_valido` CHECK (regexp_like(`correo`,_utf8mb4'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'jrojas','Juan Carlos','Rojas','$2b$12$OSjbELwYLnYBgANSjLRI7uqCCZ7jho6M9Cc.ZWbwRHI.ScCho0p7G','3124567890',1,'juan@monamour.com','Inactivo','2025-11-12 06:29:25','2025-11-15 04:30:40'),(2,'ncamejo','Natalia','Camejo','$2b$12$COWW.6c8haILvQd6/d69Ku6reXX2tso5ayU.UIPLwZNaBZzRQixtm','3208228376',1,'ncamejo@monamour.com','Activo','2025-11-15 04:21:10','2025-11-15 04:21:10');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER `trg_usuarios_insert` AFTER INSERT ON `usuarios` FOR EACH ROW INSERT INTO logs_auditoria (tabla, operacion, registro_id, datos_previos, datos_nuevos)

VALUES (

  'usuarios', 'INSERT', NEW.id,

  NULL,

  JSON_OBJECT(

    'id', NEW.id, 'usuario', NEW.usuario, 'nombre', NEW.nombre, 'apellido', NEW.apellido,

    'celular', NEW.celular, 'rol_id', NEW.rol_id, 'correo', NEW.correo, 'estado', NEW.estado

  )

) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER `trg_usuarios_update` AFTER UPDATE ON `usuarios` FOR EACH ROW INSERT INTO logs_auditoria (tabla, operacion, registro_id, datos_previos, datos_nuevos)

VALUES (

  'usuarios', 'UPDATE', NEW.id,

  JSON_OBJECT(

    'id', OLD.id, 'usuario', OLD.usuario, 'nombre', OLD.nombre, 'apellido', OLD.apellido,

    'celular', OLD.celular, 'rol_id', OLD.rol_id, 'correo', OLD.correo, 'estado', OLD.estado

  ),

  JSON_OBJECT(

    'id', NEW.id, 'usuario', NEW.usuario, 'nombre', NEW.nombre, 'apellido', NEW.apellido,

    'celular', NEW.celular, 'rol_id', NEW.rol_id, 'correo', NEW.correo, 'estado', NEW.estado

  )

) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER `trg_usuarios_delete` AFTER DELETE ON `usuarios` FOR EACH ROW INSERT INTO logs_auditoria (tabla, operacion, registro_id, datos_previos, datos_nuevos)

VALUES (

  'usuarios', 'DELETE', OLD.id,

  JSON_OBJECT(

    'id', OLD.id, 'usuario', OLD.usuario, 'nombre', OLD.nombre, 'apellido', OLD.apellido,

    'celular', OLD.celular, 'rol_id', OLD.rol_id, 'correo', OLD.correo, 'estado', OLD.estado

  ),

  NULL

) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'tfinal_bd'
--

--
-- Dumping routines for database 'tfinal_bd'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-15 18:56:22
