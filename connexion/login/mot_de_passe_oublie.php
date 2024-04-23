<?php
// Autorisations CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

try {
    // Connexion à la base de données MySQL
    $conn = new PDO("mysql:host=localhost;dbname=usersdb", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupération des données JSON envoyées depuis le frontend
    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true);

    // Récupération des données de tous les champs
    $email = $dData['email'];
    $newPassword = md5($dData['newPassword']);
    $result = "";

    // Vérification si les champs obligatoires ne sont pas vides
    if (!empty($email) && !empty($newPassword)) {
        // Requête pour vérifier si l'email existe dans la base de données
        $stmt = $conn->prepare("SELECT * FROM users WHERE email=:email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        
        if($stmt->rowCount() != 0){
            // L'email existe dans la base de données, mise à jour du mot de passe
            $stmt = $conn->prepare("UPDATE users SET pass=:newPassword WHERE email=:email");
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':newPassword', $newPassword);
            if ($stmt->execute()) {
                $result = "تم تحديث كلمة المرور بنجاح!";
            } else {
                $result = "فشل في تحديث كلمة المرور";
            }
        }
        else{
            // L'email n'existe pas dans la base de données
            $result = "البريد الإلكتروني غير موجود";
        }
    } else {
        // Un champ est vide
        $result = "يرجى ملء جميع الحقول";
    }

    // Préparation de la réponse JSON
    $response[] = array("result" => $result);
    echo json_encode($response);
} catch(PDOException $e) {
    // En cas d'erreur de connexion à la base de données
    echo "Connection failed: " . $e->getMessage();
}
?>
