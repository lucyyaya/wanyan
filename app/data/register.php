<?php
      header('Content-type:text/html;charset=utf-8');
      #1、获取请求提交的数据
      $user_name=$_REQUEST["user_name"];
      $user_pwd=$_REQUEST["user_pwd"];
      #2、连接到数据库
      require("init.php");
      #3、验证数据是否为空
      if($user_name=="" && $user_pwd==""){
          echo '{"code":-1,"msg":"用户名或密码为空"}';
      }else{
           $sql="select * from wanyan_user where user_name='$user_name'";
           $result1=mysqli_query($conn,$sql);
           	//4:获取返回结果(不是true/false)并且抓取结果(一行)
            $row = mysqli_fetch_assoc($result1);
            if($row==false){
                #5、执行数据库操作
                $sql="insert into wanyan_user values(NULL,'$user_name','$user_pwd')";
                $result=mysqli_query($conn,$sql);
                if($result === true){
                	echo '{"code":1,"msg":"注册成功"}';
                }else{
                	echo '{"code":0,"msg":"注册过程遇到问题，请重新注册"}';
                }
            }else{
                echo '{"code":-2,"msg":"用户名已存在"}';
            }
      }
  ?>