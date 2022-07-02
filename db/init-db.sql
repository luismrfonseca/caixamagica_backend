CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `intro` varchar(45) DEFAULT NULL,
  `content` varchar(45) DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `articles` (`id`, `title`, `intro`, `author_id`, `created_at`, `updated_at`) VALUES ('1', 'All about Dave', 'Dave Rocks', '2', '2018-03-21 00:01:03.946', '2018-03-21 00:01:03.946');
INSERT INTO `articles` (`id`, `title`, `intro`, `author_id`, `created_at`, `updated_at`) VALUES ('2', 'Angular is Cool', 'I really like Angular', '2', '2018-03-21 00:01:03.953', '2018-03-21 00:01:03.953');
INSERT INTO `articles` (`id`, `title`, `intro`, `author_id`, `created_at`, `updated_at`) VALUES ('3', 'Strom of swords', 'Something introlike', '2', '2018-03-23 12:22:15.639', '2018-03-23 12:22:15.639');
INSERT INTO `articles` (`id`, `created_at`, `updated_at`) VALUES ('4', '2018-03-23 12:47:21.666', '2018-03-23 12:47:21.666');
INSERT INTO `articles` (`id`, `created_at`, `updated_at`) VALUES ('5', '2018-03-23 12:48:24.587', '2018-03-23 12:48:24.587');
INSERT INTO `articles` (`id`, `created_at`, `updated_at`) VALUES ('6', '2018-05-09 13:59:44.984', '2018-05-09 13:59:44.984');
INSERT INTO `articles` (`id`, `created_at`, `updated_at`) VALUES ('7', '2018-05-09 14:01:54.333', '2018-05-09 14:01:54.333');
INSERT INTO `articles` (`id`, `title`, `created_at`, `updated_at`) VALUES ('8', 'hello', '2018-05-09 14:06:40.991', '2018-05-09 14:06:40.991');
INSERT INTO `articles` (`id`, `title`, `intro`, `content`, `author_id`, `created_at`, `updated_at`) VALUES ('9', 'hello', 'OUIII', 'NO_CONTENT', '0', '2018-05-09 14:08:15.945', '2018-05-09 14:08:15.945');
INSERT INTO `articles` (`id`, `created_at`, `updated_at`) VALUES ('10', '2018-07-25 18:03:05.468', '2018-07-25 18:03:05.468');
INSERT INTO `articles` (`id`, `created_at`, `updated_at`) VALUES ('11', '2018-07-25 19:57:15.398', '2018-07-25 19:57:15.398');
INSERT INTO `articles` (`id`, `created_at`, `updated_at`) VALUES ('12', '2018-07-26 03:07:33.018', '2018-07-26 03:07:33.018');
INSERT INTO `articles` (`id`, `created_at`, `updated_at`) VALUES ('13', '2018-07-26 03:24:42.341', '2018-07-26 03:24:42.341');
INSERT INTO `articles` (`id`, `created_at`, `updated_at`) VALUES ('14', '2018-07-26 05:04:09.003', '2018-07-26 05:04:09.003');
INSERT INTO `articles` (`id`, `created_at`, `updated_at`) VALUES ('15', '2018-07-26 05:16:20.850', '2018-07-26 05:16:20.850');
INSERT INTO `articles` (`id`, `created_at`, `updated_at`) VALUES ('16', '2018-07-26 08:26:37.912', '2018-07-26 08:26:37.912');
INSERT INTO `articles` (`id`, `created_at`, `updated_at`) VALUES ('17', '2018-07-26 08:27:59.760', '2018-07-26 08:27:59.760');
INSERT INTO `articles` (`id`, `created_at`, `updated_at`) VALUES ('18', '2018-07-26 08:30:51.789', '2018-07-26 08:30:51.789');
INSERT INTO `articles` (`id`, `created_at`, `updated_at`) VALUES ('19', '2018-07-26 09:10:42.146', '2018-07-26 09:10:42.146');
INSERT INTO `articles` (`id`, `created_at`, `updated_at`) VALUES ('20', '2018-07-26 09:16:44.829', '2018-07-26 09:16:44.829');
