CREATE TABLE IF NOT EXISTS `people` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `profile_id` bigint(30) NOT NULL,
  `group_member_id` bigint(30) NOT NULL,
  `group_id` bigint(30) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `othername` varchar(255) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` int(2) DEFAULT NULL,
  `quote` varchar(10000) DEFAULT NULL,
  `profile_img` int(2) DEFAULT NULL,
  `isdownloaded` int(2) DEFAULT 0,
  `about` varchar(10000) DEFAULT NULL,
  `interest` varchar(255) DEFAULT NULL,
  `show_dob` int(11) NOT NULL DEFAULT '1',
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `dummy_people` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `profile_id` bigint(30) NOT NULL,
  `group_member_id` bigint(30) NOT NULL,
  `group_id` bigint(30) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `othername` varchar(255) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `dob` date NOT NULL,
  `gender` int(2) DEFAULT NULL,
  `quote` varchar(10000) DEFAULT NULL,
  `profile_img` int(2) DEFAULT NULL,
  `isdownloaded` int(2) DEFAULT 0,
  `about` varchar(10000) DEFAULT NULL,
  `interest` varchar(255) DEFAULT NULL,
  `show_dob` int(11) NOT NULL DEFAULT '1',
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO `dummy_people` (`id`, `profile_id`, `group_member_id`, `group_id`, `surname`, `firstname`, `othername`, `phone`, `email`, `address`, `dob`, `gender`, `quote`, `profile_img`, `about`, `show_dob`, `date_updated`, 'isdownloaded', 'interest') VALUES
(1, 0, 1, 1, 'Onuoha', 'Abel', 'Agu', '07034481876', 'abonuoha@gmail.com', 'Zaria, Nigeria', '1990-01-17', 1, 'If i see further, it is by standing on the shoulders of a giant', '1.jpg', 'I am a cool guy', 1, '2019-02-19 08:24:45', 1, 'Reading, Traveling, Football'),
(2, 0, 2, 1, 'Joshua', 'Ajaka', '', '08162472087', 'joshuaajaka@gmail.com', 'Kano, Kano state, Nigeria', '1996-02-19', 1, 'Let love leads', '2.jpg', '', 0, '2019-02-19 19:49:56', 1, 'Swimming, Traveling, Reading '),
(3, 0, 3, 1, 'Oluwole', 'Damilare', '', '08185089242', 'dammypop93@gmail.com', 'Lagos, Lagos', '1998-03-19', 1, '', '3.jpg', '', 0, '2019-02-19 19:51:21', 1, ''),
(4, 0, 4, 1, 'Tokura', 'Shalom', '', '08070831301', 'shaloam@suprixtechnology.com', 'Benue, Nigeria', '1999-05-17', 1, 'Love is all that matters', '4.jpg', 'I am a cool guy', 1, '2019-02-19 08:24:45', 1, 'Reading, Football'),
(5, 0, 5, 1, 'Abdurahaman', 'Omeiza', '', '07037196386', 'yisahabdulrahaman@gmail.com', 'Kabba, Kogi state, Nigeria', '1996-02-19', 1, '', '5.jpg', 'I am a cool guy', 0, '2019-02-19 19:49:56', 1, 'Traveling, Reading '),
(6, 0, 6, 1, 'Benson', 'Elvis', '', '08060966929', 'elviswole@yahoo.com', 'Lagos, Lagos', '1998-03-19', 1, 'Pursue modesty', '6.jpg', 'I am a cool guy', 0, '2019-02-19 19:51:21', 1, 'Coding, Reading'),
(7, 0, 7, 1, 'Swancy', 'Sarah', '', '08138042306', 'swancysarah@gmail.com', 'Zaria, Kaduna state, Nigeria', '1996-02-19', 2, '', '7.jpg', 'I am a cool girl', 0, '2019-02-19 19:49:56', 1, 'Swimming, Traveling, Reading '),
(8, 0, 8, 1, 'Lawal', 'Felix', 'Do not be afraid', '08068127962', 'lawalfelixdaniel@yahoo.com', 'Lagos, Lagos', '1998-03-19', 1, '', '10.jpg', '', 0, '2019-02-19 19:51:21', 1, ''),
(9, 0, 9, 1, 'Ibinaiye', 'Jennifer', '', '08024761769', 'JenniferIbi@gmail.com', 'Zaria, Kaduna state, Nigeria', '1996-02-19', 2, '', '9.jpg', 'I am a cool lady', 0, '2019-02-19 19:49:56', 1, 'Swimming, Traveling, Reading ');



CREATE TABLE IF NOT EXISTS `photo` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `group_member_id` bigint(30) NOT NULL,
  `photo_id` bigint(30) NOT NULL,
  `name` varchar(255) NOT NULL,
  `album_id` bigint(30) NOT NULL,
  `group_id` bigint(30) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isdownloaded` int(2) DEFAULT 0,
  `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS `album` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `album_id` bigint(30) NOT NULL,
  `group_id` bigint(30) NOT NULL,
  `group_member_id` bigint(30) NOT NULL,
  `name` varchar(255) NOT NULL,
  `isdeleted` int(2) DEFAULT 0,
  `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `dummy_photo` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `group_member_id` int(11) NOT NULL,
  `photo_id` bigint(30) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isdownloaded` int(2) DEFAULT 0,
  `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO `dummy_photo` (`id`, `group_member_id`, `photo_id`, `name`, `description`, `date_modified`, 'isdownloaded') VALUES
(1, 1, 0, '6.jpg', 'how do we look now', '2019-02-19 19:58:20', 1),
(2, 1, 0, '1.jpg', 'i love this', '2019-02-19 19:57:53', 1),
(3, 1, 0, '10.jpg', '', '2019-02-19 19:56:52', 1),
(4, 2, 0, '1.jpg', 'me and me', '2019-02-19 19:56:52', 1),
(5, 2, 0, '5.jpg', '', '2019-02-19 19:57:30', 1),
(6, 3, 0, '1.jpg', 'me and me', '2019-02-19 19:57:30', 1),
(7, 6, 2, '2.jpg', '', '2019-02-19 19:56:52', 1),
(8, 3, 3, '6.jpg', 'me and me', '2019-02-19 19:56:52', 1),
(9, 1, 0, '3.jpg', '', '2019-02-19 19:56:52', 1),
(10, 4, 0, '1.jpg', 'me and me', '2019-02-19 19:56:52', 1),
(11, 5, 0, '4.jpg', '', '2019-02-19 19:57:30', 1),
(12, 7, 0, '9.jpg', 'me and me', '2019-02-19 19:57:30', 1),
(13, 8, 2, '2.jpg', '', '2019-02-19 19:56:52', 1),
(14, 9, 3, '7.jpg', 'me and me', '2019-02-19 19:56:52', 1);


CREATE TABLE IF NOT EXISTS `my_group` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `group_id` bigint(30) NOT NULL,
  `user_id` bigint(30) DEFAULT 0,
  `user_password` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `group_member_id` bigint(30) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);