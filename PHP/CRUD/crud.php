<?php
$conn = new mysqli('localhost', 'root', '', 'contacts_db');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($_POST['id']) ? intval($_POST['id']) : null;
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';

    switch ($_POST['action']) {
        case 'create':
            $stmt = $conn->prepare("INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $name, $email, $phone);
            $stmt->execute();
            break;

        case 'update':
            $stmt = $conn->prepare("UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?");
            $stmt->bind_param("sssi", $name, $email, $phone, $id);
            $stmt->execute();
            break;

        case 'delete':
            $stmt = $conn->prepare("DELETE FROM contacts WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            break;
    }

    header('Location: index.html');
    exit;
}

function fetchContacts() {
    global $conn;
    $result = $conn->query("SELECT * FROM contacts");
    return $result->fetch_all(MYSQLI_ASSOC);
}
