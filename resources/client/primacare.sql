-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 06, 2016 at 07:27 AM
-- Server version: 5.7.16-0ubuntu0.16.04.1
-- PHP Version: 7.0.8-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `primacare`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `uid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `seo_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` mediumtext COLLATE utf8_unicode_ci,
  `created_by` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`uid`, `name`, `avatar`, `slug`, `seo_title`, `description`, `content`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
('838d1f60-ba1e-11e6-a893-e5e177503072', 'Blog 12', 'blog/avatars/b2b2d3c32d41716fe3532d1a8135b3ef.jpeg', 'blog-12', '', 'ssas', '<p>sasasas</p>', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 12:38:10', '2016-12-04 12:39:28', NULL),
('9b375a90-ba1e-11e6-be13-49e05c915ae8', 'AHihi', NULL, 'ahihi', '', '1121', '<p>2121</p>', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 12:38:49', '2016-12-04 12:38:53', '2016-12-04 12:38:53');

-- --------------------------------------------------------

--
-- Table structure for table `cat_faqs`
--

CREATE TABLE `cat_faqs` (
  `uid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_by` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cat_faqs`
--

INSERT INTO `cat_faqs` (`uid`, `name`, `description`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
('0e028420-ba27-11e6-ba2c-2749c8d9b9b5', 'klkl', 'klkkl', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 13:39:18', '2016-12-05 07:19:51', NULL),
('11950f20-ba26-11e6-9945-d51a91beb9ca', 'Lung Hurts', 'ss', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 13:32:14', '2016-12-04 13:38:59', NULL),
('4e68e810-ba26-11e6-b32c-378e67f3d960', 'sasasa', 'saassa', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 13:33:56', '2016-12-04 13:34:28', '2016-12-04 13:34:28');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `uid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `user_uid` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `job_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthday` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`uid`, `user_uid`, `avatar`, `first_name`, `last_name`, `phone`, `address`, `job_title`, `description`, `birthday`) VALUES
('13c9b950-b923-11e6-a8eb-9bb371a7eea5', '13c9b790-b923-11e6-9031-e902426e8be1', 'doctor/avatars/b5f742284a24c0e0457c0d3fbfa53bef.jpeg', 'Bùi', 'Hoàng Vinh', '1234566', '22121', 'Da Liễu', '', '1990-01-23 00:00:00'),
('9c954850-b977-11e6-b90c-839841e53513', '9c954440-b977-11e6-822b-2f21e691a4df', 'doctor/avatars/63cf12935c1549144a6265700902f475.jpeg', 'Nguyễn Thị', 'Kim', '2121sss', '212', 'Răng Miệng', '2121kk', '1990-01-01 00:00:00'),
('b4de2650-b952-11e6-a300-bfa317b9d590', 'b4de22f0-b952-11e6-b551-0763f3e356a7', 'doctor/avatars/2cf0aecbbe844804afd18ca4bb76d224.jpeg', 'Hoàng Văn', 'Thụ', '2121ss', '212', 'Giới tính', '212121', '1990-01-02 00:00:00'),
('ca5a3760-bb05-11e6-bea3-57fddf74c8f7', 'ca5a3200-bb05-11e6-9f90-e7de4eca2768', 'doctor/avatars/0096c68b1fd5190e0c7b4c47798248c6.jpeg', 'Kim Tae', 'Yeon', '', '', 'Da Liễu', '', '1900-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `doctors_images`
--

CREATE TABLE `doctors_images` (
  `uid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `user_uid` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `uid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `cat_faq_uid` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `question` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `answer` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(4, '2014_10_12_000000_create_users_table', 1),
(5, '2016_11_30_211109_create_doctors', 1),
(6, '2016_12_03_114548_create_doctors_images_table', 1),
(9, '2016_12_04_092122_create_pages_table', 2),
(10, '2016_12_04_153102_create_services_table', 3),
(11, '2016_12_04_154552_create_services_images_table', 4),
(13, '2016_12_04_185318_create_blogs_table', 5),
(15, '2016_12_04_194739_create_faqs_table', 6),
(17, '2016_12_04_195942_create_cat_faqs_table', 7),
(19, '2016_12_04_205114_create_qualifications_table', 8),
(21, '2016_12_05_180529_create_sites_table', 9),
(22, '2016_12_05_202119_create_slideshows_table', 10);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `uid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `seo_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` mediumtext COLLATE utf8_unicode_ci,
  `created_by` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`uid`, `name`, `slug`, `seo_title`, `content`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
('274af9e0-b9ef-11e6-a4ed-01ffdb3ba2a4', 'ahah', 'ahah', '21212', '<p>sasaasss</p>', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 06:59:08', '2016-12-04 08:19:02', NULL),
('996730d0-b9cc-11e6-a3e2-efeb90db552a', 'test', 'test', '', '<p>test</p>', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 02:51:47', '2016-12-04 06:58:24', '2016-12-04 06:58:24'),
('bc9429b0-b9fa-11e6-b026-eb6b1a8aff52', 'ahahss', 'ahahss', 'sa', '<p>sasasaas</p>', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 08:22:03', '2016-12-04 11:32:07', '2016-12-04 11:32:07'),
('cf305260-b9cc-11e6-9d21-592d54850fe4', 'TRang 1sas', 'trang-1sas', 'ssass', '<b>&lt;div&gt;&lt;/div&gt;sasa</b>', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 02:53:18', '2016-12-04 09:22:51', NULL),
('d7c46400-b9cc-11e6-a665-6778d93653fb', 's', 's', '', '', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 02:53:32', '2016-12-04 06:57:51', '2016-12-04 06:57:51');

-- --------------------------------------------------------

--
-- Table structure for table `qualifications`
--

CREATE TABLE `qualifications` (
  `uid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `user_uid` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_by` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `qualifications`
--

INSERT INTO `qualifications` (`uid`, `user_uid`, `name`, `description`, `avatar`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
('0cb1f700-ba48-11e6-82ac-dbce6b710f83', '13c9b790-b923-11e6-9031-e902426e8be1', 'Ahihi', '', NULL, 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 17:35:29', '2016-12-04 17:35:33', '2016-12-04 17:35:33'),
('7c8dbe60-ba3d-11e6-9bfb-690d555f3a69', '13c9b790-b923-11e6-9031-e902426e8be1', 'bebe', '', 'qualification/avatars/b2b2d3c32d41716fe3532d1a8135b3ef.jpeg', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 16:19:52', '2016-12-04 18:10:01', NULL),
('82839080-ba4c-11e6-878e-ffcad3699924', '13c9b790-b923-11e6-9031-e902426e8be1', '2121', 'saassa', NULL, 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 18:07:25', '2016-12-04 18:10:22', '2016-12-04 18:10:22'),
('975a6b10-ba3d-11e6-bd32-af8154f57120', '13c9b790-b923-11e6-9031-e902426e8be1', '2121', '122112', 'qualification/avatars/5e6c3e18990ad08576e7f77df67ce4b0.jpeg', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 16:20:37', '2016-12-05 10:45:17', '2016-12-05 10:45:17'),
('a5dd39a0-ba3b-11e6-838b-49ac2b4e4ce9', '13c9b790-b923-11e6-9031-e902426e8be1', 'sasa', 'sasa', 'qualification/avatars/b2b2d3c32d41716fe3532d1a8135b3ef.jpeg', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 16:06:43', '2016-12-04 18:00:38', '2016-12-04 18:00:38'),
('debd8510-ba3b-11e6-834e-b74f7aa00ff4', '13c9b790-b923-11e6-9031-e902426e8be1', 'sasa', 'sasa', 'qualification/avatars/b2b2d3c32d41716fe3532d1a8135b3ef.jpeg', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 16:08:18', '2016-12-04 17:33:09', '2016-12-04 17:33:09'),
('fe624cd0-ba47-11e6-be28-c115a351b9ba', '13c9b790-b923-11e6-9031-e902426e8be1', 'sssa', 'sasa', NULL, 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 17:35:05', '2016-12-04 17:35:05', NULL),
('fe64f3e0-ba3b-11e6-91a7-59d90f37b5f8', '13c9b790-b923-11e6-9031-e902426e8be1', 'ASSA', 'saasassa', 'qualification/avatars/b2b2d3c32d41716fe3532d1a8135b3ef.jpeg', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-04 16:09:11', '2016-12-04 17:32:38', '2016-12-04 17:32:38');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `uid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` mediumtext COLLATE utf8_unicode_ci,
  `created_by` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`uid`, `avatar`, `name`, `description`, `content`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
('29441020-bb00-11e6-9ab6-8b785fd582d9', 'service/avatars/28ad3d3d23dafaaf3fb05e87629db7a0.jpeg', 'Chăm sóc y tế', 'Trái với quan điểm chung của số đông, Lorem Ipsum không phải chỉ là một đoạn văn bản ngẫu nhiên.', '', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-05 15:33:24', '2016-12-05 15:51:31', NULL),
('73832d80-bb00-11e6-88ef-73f645d96da8', 'service/avatars/b5bb7ba9785176972c948dc49a656c40.png', 'Nhấn mí mắt', 'Trái với quan điểm chung của số đông, Lorem Ipsum không phải chỉ là một đoạn văn bản ngẫu nhiên.', '', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-05 15:35:29', '2016-12-05 15:51:19', NULL),
('8ea90080-bb00-11e6-8f87-8f9d4cefc5f6', 'service/avatars/2acb20a24217c7486ecb4673beb97199.jpeg', 'Chơi Bowling', 'Trái với quan điểm chung của số đông, Lorem Ipsum không phải chỉ là một đoạn văn bản ngẫu nhiên.', '', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-05 15:36:14', '2016-12-05 15:51:08', NULL),
('a5bfb0c0-bb00-11e6-9606-01019f35576b', 'service/avatars/0b9d0b1999d4fdcbc9fec6c4de20c4ba.jpeg', 'Kim tiêm Meditek', 'Trái với quan điểm chung của số đông, Lorem Ipsum không phải chỉ là một đoạn văn bản ngẫu nhiên.', '', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-05 15:36:53', '2016-12-05 15:50:56', NULL),
('c1609590-bb00-11e6-8d79-33327c8017ce', 'service/avatars/1bb7f4974f74da98cdbe025a49267756.jpeg', 'Xét nghiệm máu', 'Trái với quan điểm chung của số đông, Lorem Ipsum không phải chỉ là một đoạn văn bản ngẫu nhiên.', '', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-05 15:37:40', '2016-12-05 15:50:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `services_images`
--

CREATE TABLE `services_images` (
  `uid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `service_uid` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `services_images`
--

INSERT INTO `services_images` (`uid`, `service_uid`, `image`, `created_at`, `updated_at`) VALUES
('c19d56d0-ba14-11e6-b197-1d3d1f1fd242', 'b12dc980-ba09-11e6-b2f1-eb368b19b8d7', 'service/images/16680a34c1e695b26880f25a2ae1f80d.jpeg', '2016-12-04 11:28:19', '2016-12-04 11:28:19');

-- --------------------------------------------------------

--
-- Table structure for table `sites`
--

CREATE TABLE `sites` (
  `uid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `facebook_link` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `twitter_link` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gplus_link` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `youtube_link` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `instagram_link` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sites`
--

INSERT INTO `sites` (`uid`, `name`, `email`, `address`, `phone`, `avatar`, `facebook_link`, `twitter_link`, `gplus_link`, `youtube_link`, `instagram_link`) VALUES
('26adc000-baea-11e6-a86e-2999cbadee1a', 'PrimaCare', 'primacare@pm.com', '261/8 Nguyễn Trọng Thuật, Phú Nhuận, TPHCM', '(123)-45-789', 'site/avatars/c51bf81db1f4d1a6fdd27d63fa05793b.png', 'http://facebook.com', 'http://twitter.com', 'http://google.com', 'https://youtube.com', 'http://instagram.com');

-- --------------------------------------------------------

--
-- Table structure for table `slideshows`
--

CREATE TABLE `slideshows` (
  `uid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_by` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `slideshows`
--

INSERT INTO `slideshows` (`uid`, `name`, `description`, `avatar`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
('3985b040-baf4-11e6-9ac8-fdbd4950cf9f', 'Quan trọng với bạn', 'Đội ngũ những y bác sĩ chuyên nghiệp sẵn sàng với bạn.', 'slideshow/avatars/1533c62efa16996c9ddd78fd798998e1.jpeg', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-05 14:07:58', '2016-12-05 14:09:53', NULL),
('b3efbce0-baf2-11e6-860f-6fee85561665', 'slideshow', 'slideshow', NULL, 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-05 13:57:04', '2016-12-05 13:58:38', '2016-12-05 13:58:38'),
('bb0cc510-baf4-11e6-ad00-35346b2f1c37', 'Nụ cười của bạn', 'Nụ cười của bạn là nụ cười của chúng tôi', 'slideshow/avatars/806fc69b27f0b4d841508cc96f8546e7.jpeg', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-05 14:11:35', '2016-12-05 14:13:00', NULL),
('d0c5af70-baf4-11e6-93ba-ff08d87ec777', 'Chúng tôi yêu bạn', 'Chúng tôi yêu bạn trên từng cây số', 'slideshow/avatars/51033b26a91377f104d2590d16f3c8ce.jpeg', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-05 14:12:11', '2016-12-05 14:12:48', NULL),
('e907f610-baf2-11e6-a3fd-a50c1fe7f70c', 'ahihi', 'ahihi', 'slideshow/avatars/bb2e63606e06dc90ea38f2ced7ec81c8.jpeg', 'ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '2016-12-05 13:58:33', '2016-12-05 14:06:51', '2016-12-05 14:06:51');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `login_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` enum('active','pending','unactive') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'unactive',
  `role` enum('admin','doctor','client') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'client',
  `last_login_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `password`, `email`, `remember_token`, `login_token`, `status`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('13c9b790-b923-11e6-9031-e902426e8be1', '$2y$10$6nSDZPzQ/WgCxbHFOC1Mi.z/ONpVNmLHHuhPZrIvNUCHSo0wdqIpW', 'buivuongdhmo@yahoo.com', NULL, NULL, 'active', 'doctor', NULL, '2016-12-03 06:38:18', '2016-12-03 06:38:18'),
('9c954440-b977-11e6-822b-2f21e691a4df', '$2y$10$wXIYVVfDLbJm531bz0I.RO2dm1xCbtl.Hy4mXplEX2kRWcgucMiG2', 'test@gmail.com', NULL, NULL, 'active', 'doctor', NULL, '2016-12-03 16:43:26', '2016-12-03 16:43:26'),
('b4de22f0-b952-11e6-b551-0763f3e356a7', '$2y$10$MglQWkYj3BkN7TAkRZycy.E.hM10R3msMETAx4LRxSg/wdfztfCay', 'hoangvanthu@gmail.com', NULL, NULL, 'active', 'doctor', NULL, '2016-12-03 12:19:15', '2016-12-03 12:19:15'),
('ca5a3200-bb05-11e6-9f90-e7de4eca2768', '$2y$10$cvk2laOHkzzzm5OA9HtrxOm/9PRLPIekohRJBuxxrm0qRUDt.X7H6', 'kimtan@yahoo.com.vn', NULL, NULL, 'active', 'doctor', NULL, '2016-12-05 16:13:42', '2016-12-05 16:13:42'),
('ffbfcb80-b922-11e6-aae9-25dd50e9b92e', '$2y$10$fBxbtXDMUCRDpU1w7ipkFuElS3FuI8uDKm9EYOmQtpnKypUWoSWHm', 'buivuongdhmo@gmail.com', NULL, NULL, 'active', 'admin', NULL, '2016-12-03 06:37:45', '2016-12-03 06:37:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `cat_faqs`
--
ALTER TABLE `cat_faqs`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `doctors_images`
--
ALTER TABLE `doctors_images`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `qualifications`
--
ALTER TABLE `qualifications`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `services_images`
--
ALTER TABLE `services_images`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `sites`
--
ALTER TABLE `sites`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `slideshows`
--
ALTER TABLE `slideshows`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
