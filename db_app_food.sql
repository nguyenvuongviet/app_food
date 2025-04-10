-- database
CREATE DATABASE IF NOT EXISTS `TEMPLATE`; -- tạo database
DROP DATABASE `TEMPLATE`; -- xoá database
USE `TEMPLATE`;

-- table template
CREATE TABLE `TABLE_TEMPLATE` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT, -- mặc định luôn luôn có
	
	
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo database
CREATE DATABASE `app_food`;
USE `app_food`;

-- Tạo bảng user
CREATE TABLE `user` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    
    `full_name` VARCHAR(255),
    `email` VARCHAR(255),
    `password` VARCHAR(255),
    
    `deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng restaurant
CREATE TABLE `restaurant` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    
    `name` VARCHAR(255),
    `image` VARCHAR(255),
    `desc` VARCHAR(255),
    
    `deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng food_type
CREATE TABLE `food_type` (
   	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
     
    `name` VARCHAR(255),
    
    `deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng food
CREATE TABLE `food` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,

    `name` VARCHAR(255),
    `image` VARCHAR(255),
    `price` FLOAT,
    `desc` VARCHAR(255),
    `type_id` INT,
    FOREIGN KEY (`type_id`) REFERENCES `food_type`(`id`),
    
   	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng sub_food
CREATE TABLE `sub_food` (
 	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	
    `name` VARCHAR(255),
    `price` FLOAT,
    `food_id` INT,
    FOREIGN KEY (`food_id`) REFERENCES `food`(`id`),
    
    `deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng order
CREATE TABLE `order` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,

    `user_id` INT,
    `food_id` INT,
    `amount` INT,
    `code` VARCHAR(255),
    `arr_sub_id` VARCHAR(255),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
    FOREIGN KEY (`food_id`) REFERENCES `food`(`id`),
    
    `deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng like_res
CREATE TABLE `like_res` (
 	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,

	`user_id` INT,
    `res_id` INT,
    `date_like` DATETIME,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
    FOREIGN KEY (`res_id`) REFERENCES `restaurant`(`id`),
    
   	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng rate_res
CREATE TABLE `rate_res` (
 	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,

    `user_id` INT,
    `res_id` INT,
    `amount` INT,
    `date_rate` DATETIME,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
    FOREIGN KEY (`res_id`) REFERENCES `restaurant`(`id`),
    
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Chèn dữ liệu mẫu
INSERT INTO `food_type` (`name`) VALUES ('Fast Food'), ('Beverage'), ('Dessert');

INSERT INTO `food` (`name`, `image`, `price`, `desc`, `type_id`) VALUES 
('Burger', 'burger.jpg', 5.99, 'Delicious burger', 1),
('Pizza', 'pizza.jpg', 8.99, 'Cheesy pizza', 1),
('Coke', 'coke.jpg', 1.99, 'Refreshing drink', 2),
('Ice Cream', 'icecream.jpg', 3.99, 'Sweet ice cream', 3);

INSERT INTO `user` (`full_name`, `email`, `password`) VALUES 
('Nguyen Van A', 'a@gmail.com', '123456'),
('Tran Thi B', 'b@gmail.com', 'abcdef'),
('Le Van C', 'c@gmail.com', 'password'),
('Pham Thi D', 'd@gmail.com', 'qwerty'),
('Hoang Van E', 'e@gmail.com', 'letmein'),
('Vo Van F', 'f@gmail.com', '123abc');

INSERT INTO `restaurant` (`name`, `image`, `desc`) VALUES 
('Nha Hang 1', 'image1.jpg', 'Mo ta nha hang 1'),
('Nha Hang 2', 'image2.jpg', 'Mo ta nha hang 2'),
('Nha Hang 3', 'image3.jpg', 'Mo ta nha hang 3');

INSERT INTO `like_res` (`user_id`, `res_id`, `date_like`) VALUES 
(1, 1, NOW()),
(2, 1, NOW()),
(3, 2, NOW()),
(4, 1, NOW()),
(5, 3, NOW()),
(1, 2, NOW()),
(2, 3, NOW()),
(3, 1, NOW()),
(4, 2, NOW()),
(5, 1, NOW()),
(1, 3, NOW());

INSERT INTO `order` (`user_id`, `food_id`, `amount`, `code`, `arr_sub_id`) VALUES 
(1, 1, 2, 'A001', '1,2'),
(2, 2, 1, 'A002', '3'),
(3, 1, 3, 'A003', '1,4'),
(4, 3, 2, 'A004', '2,3'),
(5, 2, 1, 'A005', '4'),
(1, 3, 2, 'A006', '2');

-- Tìm 5 người đã like nhà hàng nhiều nhất
SELECT `user_id`, COUNT(*) AS `like_count` 
FROM `like_res` 
GROUP BY `user_id` 
ORDER BY `like_count` DESC 
LIMIT 5;

-- Tìm 2 nhà hàng có lượt like nhiều nhất
SELECT `res_id`, COUNT(*) AS `like_count` 
FROM `like_res` 
GROUP BY `res_id` 
ORDER BY `like_count` DESC 
LIMIT 2;

-- Tìm người đã đặt hàng nhiều nhất
SELECT `user_id`, COUNT(*) AS `order_count` 
FROM `order` 
GROUP BY `user_id` 
ORDER BY `order_count` DESC 
LIMIT 1;

-- Tìm người dùng không hoạt động
SELECT u.`id`, u.`full_name` 
FROM `user` u 
LEFT JOIN `order` o ON u.`id` = o.`user_id` 
LEFT JOIN `like_res` l ON u.`id` = l.`user_id` 
LEFT JOIN `rate_res` r ON u.`id` = r.`user_id` 
WHERE o.`user_id` IS NULL AND l.`user_id` IS NULL AND r.`user_id` IS NULL;