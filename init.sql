/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table pages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pages`;

CREATE TABLE `pages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_fb` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `username` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `json_response` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_fb` (`id_fb`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table post_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `post_type`;

CREATE TABLE `post_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

LOCK TABLES `post_type` WRITE;
/*!40000 ALTER TABLE `post_type` DISABLE KEYS */;

INSERT INTO `post_type` (`id`, `name`, `description`)
VALUES
	(1,'Image','Posts with images only'),
	(2,'Image and Text','Post with image and text'),
	(3,'Video','Post with video'),
	(4,'Video and Text','Post with video and text'),
	(5,'URL','Post with url only'),
	(6,'URL and Text','Post with url and text');

/*!40000 ALTER TABLE `post_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table post
# ------------------------------------------------------------

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_fb` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `url_link` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `likes` int(11) unsigned NOT NULL,
  `shares` int(11) unsigned NOT NULL,
  `comments` int(11) unsigned NOT NULL,
  `type` varchar(255) NOT NULL,
  `post_link` varchar(255) NOT NULL,
  `json_response` text NOT NULL,
  `created_time` datetime NOT NULL,
  `updated_time` datetime NOT NULL,
  `id__post_type` int(11) unsigned NOT NULL,
  `id__pages` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_fb` (`id_fb`),
  KEY `id__post_type` (`id__post_type`),
  KEY `id__pages` (`id__pages`),
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`id__pages`) REFERENCES `pages` (`id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`id__post_type`) REFERENCES `post_type` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table post_subject
# ------------------------------------------------------------

DROP TABLE IF EXISTS `post_subject`;

CREATE TABLE `post_subject` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) NOT NULL,
  `id__pages` int(11) unsigned NOT NULL,
  `id__user` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id__pages` (`id__pages`,`id__user`),
  KEY `id__user` (`id__user`),
  CONSTRAINT `post_subject_ibfk_2` FOREIGN KEY (`id__user`) REFERENCES `user` (`id`),
  CONSTRAINT `post_subject_ibfk_1` FOREIGN KEY (`id__pages`) REFERENCES `pages` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fb_id` varchar(255) NOT NULL,
  `fb_auth` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_pages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_pages`;

CREATE TABLE `user_pages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id__pages` int(11) unsigned NOT NULL,
  `id__user` int(11) unsigned NOT NULL,
  `is_admin` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id__pages` (`id__pages`,`id__user`),
  KEY `id__user` (`id__user`),
  CONSTRAINT `user_pages_ibfk_2` FOREIGN KEY (`id__user`) REFERENCES `user` (`id`),
  CONSTRAINT `user_pages_ibfk_1` FOREIGN KEY (`id__pages`) REFERENCES `pages` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
