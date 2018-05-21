SET NAMES UTF8;
DROP DATABASE IF EXISTS wanyan;
CREATE DATABASE wanyan CHARSET=UTF8;
USE wanyan;
#创建用户表
CREATE TABLE wanyan_user(
  uid INT PRIMARY KEY AUTO_INCREMENT, 
  user_name VARCHAR(32) NOT NULL UNIQUE, 
  user_pwd VARCHAR(32)  NOT NULL
);
#插入用户数据
INSERT INTO wanyan_user VALUES
(NULL,'xiaoli','1234567');
INSERT INTO wanyan_user VALUES (NULL,'wangwu','123456');
INSERT INTO wanyan_user VALUES (NULL,'zhaoli','123456');
INSERT INTO wanyan_user VALUES (NULL,'zhangs','123456');
INSERT INTO wanyan_user VALUES (NULL,'lisi44','123456');
INSERT INTO wanyan_user VALUES (NULL,'lisa22','123456');
