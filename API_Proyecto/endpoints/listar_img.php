<?php
require_once "../config/database.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

// Leer parámetro GET (si existe)
$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : null;

// Construir la consulta base
$sql = "SELECT * FROM imagenes";

// Si se especifica una categoría, agregar filtro
if ($categoria) {
    $sql .= " WHERE categoria = ?";
}

// Preparar la consulta
$stmt = $conn->prepare($sql);

if ($categoria) {
    $stmt->bind_param("s", $categoria);
}

$stmt->execute();
$result = $stmt->get_result();

$imagenes = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $imagenes[] = $row;
    }
}

echo json_encode($imagenes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

$stmt->close();
$conn->close();
?>
