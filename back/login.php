<?php
session_start();

header("Content-Security-Policy: default-src 'self';");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");

$connection = new mysqli("localhost", "root", "", "userddbb");

if($_SERVER["REQUEST_METHOD"] == "POST"){
    if(isset($_POST["sigin"])){
        $username = trim($_POST["user"]);
        $password = $_POST["password"];

        $stmt = $connection-> prepare("SELECT id, password FROM users WHERE username = ?");
        $stmt -> bind_param("s", $username);
        $stmt -> execute();
        $stmt -> bind_result($id,$hased_password);
        $stmt -> fetch();

        if (password_verify($password, $hased_password)){
            $_SESSION["user_id"] = $id;
            header("Location:../code/index.html");
        } else {
            echo "Invalid credentials";
        }
    }

    if (isset($_POST["registrer"])){

    }
}

?>