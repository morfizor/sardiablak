<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['errors' => [['message' => 'Csak POST kérések engedélyezettek.']]]);
    exit;
}

// Mezők szűrése és tisztítása
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_SPECIAL_CHARS);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['errors' => [['message' => 'Kérjük, töltsön ki minden kötelező mezőt!']]]);
    exit;
}

$to = 'sardiablak@gmail.com';
$subject = 'Kapcsolatfelvétel: ' . $name;

$body = "Új üzenet érkezett a sardiablak.hu kapcsolatfelvételi űrlapjáról:\n\n";
$body .= "Név: $name\n";
$body .= "E-mail: $email\n";
$body .= "Telefon: " . ($phone ? $phone : 'Nincs megadva') . "\n\n";
$body .= "Üzenet:\n$message\n";

// A Websupport tárhelyeken fontos, hogy a Feladó (From) a tárhely domainjéhez tartozó cím legyen,
// különben a levelezőszerver spamnek minősítheti vagy visszautasíthatja a küldést.
$from_email = 'no-reply@sardiablak.hu';

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=utf-8';
$headers[] = "From: Sárdi Ablak Weboldal <$from_email>";
$headers[] = "Reply-To: $name <$email>";
$headers[] = 'X-Mailer: PHP/' . phpversion();

if (mail($to, $subject, $body, implode("\r\n", $headers))) {
    echo json_encode(['status' => 'success']);
} else {
    http_response_code(500);
    echo json_encode(['errors' => [['message' => 'Szerver hiba történt a levél küldésekor. Kérjük, próbálja meg később vagy küldjön e-mailt a sardiablak@gmail.com címre!']]]);
}
?>
