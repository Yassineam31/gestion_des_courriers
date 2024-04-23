<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $conn = new PDO("mysql:host=localhost;dbname=usersdb", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true);

    $user = $dData['user'];
    $pass = md5($dData['pass']);
    //$password = md5($pass);
    $result = "";

    if (!empty($user) && !empty($pass)) {
        $sql = "SELECT * FROM users WHERE user=:user";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':user', $user);
        $stmt->execute();

        if ($stmt->rowCount() != 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($pass != $row['pass']) {
                $result = "كلمة المرور غير صحيحة";
            } else {
                $result = "تم تسجيل الدخول بنجاح! يتم توجيهك الآن...";
            }
        } else {
            $result = "اسم المستخدم غير صحيح";
        }
    } else {
        $result = "";
    }

    $conn = null;
    $response[] = array("result" => $result);
    echo json_encode($response);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
