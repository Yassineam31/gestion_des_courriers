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

    // Récupération de l'email
    $email = $dData['email'];

    $result = "";

    // Vérification si l'email correspond au format autorisé
    $allowed_domains = array('men.gov.ma', 'taalim.ma');
    $domain = substr(strrchr($email, "@"), 1);
    if (!in_array($domain, $allowed_domains)) {
        // L'e-mail n'est pas autorisé
        $result = "يجب أن يكون البريد الإلكتروني مقبولاً وينتهي بـ @men.gov.ma أو @taalim.ma";
    } else {
        if (!empty($email)) {
            // Requête pour vérifier si l'email existe déjà dans la base de données
            $stmt = $conn->prepare("SELECT * FROM users WHERE email=:email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            if ($stmt->rowCount() != 0) {
                // L'email existe déjà dans la base de données
                $result = "البريد الإلكتروني مسجل سابقا";
            } else {
                // L'email n'existe pas dans la base de données
                $result = "";
            }
        } else {
            // L'email est vide
            $result = "";
        }
    }

    // Préparation de la réponse JSON
    $response[] = array("result" => $result);
    echo json_encode($response);
} catch (PDOException $e) {
    // En cas d'erreur de connexion à la base de données
    echo "Connection failed: " . $e->getMessage();
}

?>
