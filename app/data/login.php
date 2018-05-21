<?php
    header('Content-type:text/html;charset=utf-8');
	require("init.php");
	#1、接收前端请求的数据
	$user_name=$_REQUEST["user_name"];
	$user_pwd=$_REQUEST["user_pwd"];
	#2、拼SQL语句，执行
	$sql="select * from wanyan_user where user_name='$user_name' and user_pwd='$user_pwd'";
	$result=mysqli_query($conn,$sql);
	//3:获取返回结果(不是true/false)并且抓取结果(一行)
     $row = mysqli_fetch_assoc($result);
     //4:判断输出
     if($row==null){
       echo '{"code":-1,"msg":"用户名或密码不确"}';
       #echo 0;
     }else{
      $uid = $row["uid"];
      $user_name = $row["user_name"];
      echo '{"code":1,"msg":"登录成功","user_id":'.$uid.',"user_name":"'.$user_name.'"}';
     }
?>