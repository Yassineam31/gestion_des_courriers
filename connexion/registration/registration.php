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
    $user = $dData['user'];
    $email = $dData['email'];
    $pass = md5($dData['pass']);
    $division = $dData['division'];
    $poste = $dData['poste'];
    $services = $dData['services'];
    $result = "";

    // Vérification si les champs obligatoires ne sont pas vides et si l'e-mail correspond au format autorisé
    if (!empty($user) && !empty($email) && !empty($pass) && !empty($division) && !empty($services) && !empty($poste)) {
        $allowed_domains = array('men.gov.ma', 'taalim.ma');
        $domain = substr(strrchr($email, "@"), 1);
        if (in_array($domain, $allowed_domains)) {
            // Requête pour insérer les données dans la table "users"
            $stmt = $conn->prepare("INSERT INTO users (user, email, pass, division, services, poste) VALUES (:user, :email, :pass, :division, :services, :poste)");
            $stmt->bindParam(':user', $user);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':pass', $pass);
            $stmt->bindParam(':division', $division);
            $stmt->bindParam(':poste', $poste);
            $stmt->bindParam(':services', $services);

            // Exécution de la requête d'insertion
            if ($stmt->execute()) {
                $result = "لقد تمت العملية بنجاح !";
            } else {
                $result = "";
            }
        } else {
            $result = "يجب أن يكون البريد الإلكتروني مقبولاً وينتهي بـ @men.gov.ma أو @taalim.ma";
        }
    } else {
        $result = "";
    }

    // Préparation de la réponse JSON
    $response[] = array("result" => $result);
    echo json_encode($response);
} catch (PDOException $e) {
    // En cas d'erreur de connexion à la base de données
    echo "Connection failed: " . $e->getMessage();
}

?>
