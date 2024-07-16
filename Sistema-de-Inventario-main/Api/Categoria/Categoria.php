<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../dbConfig/database.php";

$database = new Database();
$db = $database->getConn();

$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'POST':
        crearCategoria();
        break;
    case 'PUT':
        actualizarCategoria();
        break;
    case 'GET':
        isset($_GET["id"]) ? obtenerCategoria(intval($_GET["id"])) : obtenerCategorias();
        break;
    case 'DELETE':
        inactivarCategoria();
        break;
    case 'PATCH':
        activarCategoria();
        break;
    case 'OPTIONS':
        http_response_code(200);
        break;
    default:
        http_response_code(400);
        echo json_encode(array("mensaje" => "Método inválido"));
        break;
}

function obtenerCategorias() {
    global $db;
    $query = "SELECT * FROM Categorias_JRYF";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($items);
}

function obtenerCategoria($id) {
    global $db;
    $query = "SELECT * FROM Categorias_JRYF WHERE id = ?";
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $id);
    $stmt->execute();
    $item = $stmt->fetch(PDO::FETCH_ASSOC);

    if($item) {
        echo json_encode($item);
    } else {
        http_response_code(404);
        echo json_encode(array("mensaje" => "La categoría no existe"));
    }
}

function crearCategoria() {
    global $db;
    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->nombre) || empty($data->descripcion)) {
        http_response_code(400);
        echo json_encode(array("mensaje" => "Faltan datos para crear la categoría."));
        return;
    }

    $query = "INSERT INTO Categorias_JRYF (nombre, descripcion, estado) VALUES (:nombre, :descripcion, 'activo')";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":nombre", $data->nombre);
    $stmt->bindParam(":descripcion", $data->descripcion);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("mensaje" => "Categoría creada."));
    } else {
        http_response_code(500);
        echo json_encode(array("mensaje" => "No se pudo crear la categoría."));
    }
}

function actualizarCategoria() {
    global $db;
    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->id) || empty($data->nombre) || empty($data->descripcion)) {
        http_response_code(400);
        echo json_encode(array("mensaje" => "Faltan datos para actualizar la categoría."));
        return;
    }

    $query = "UPDATE Categorias_JRYF SET nombre = :nombre, descripcion = :descripcion WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":nombre", $data->nombre);
    $stmt->bindParam(":descripcion", $data->descripcion);
    $stmt->bindParam(":id", $data->id);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("mensaje" => "Categoría actualizada."));
    } else {
        http_response_code(500);
        echo json_encode(array("mensaje" => "No se pudo actualizar la categoría."));
    }
}

function inactivarCategoria() {
    global $db;
    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->id)) {
        http_response_code(400);
        echo json_encode(array("mensaje" => "Falta el ID para inactivar la categoría."));
        return;
    }

    $query = "UPDATE Categorias_JRYF SET estado = 'inactiva' WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":id", $data->id);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("mensaje" => "Categoría inactivada."));
    } else {
        http_response_code(500);
        echo json_encode(array("mensaje" => "No se pudo inactivar la categoría."));
    }
}

function activarCategoria() {
    global $db;
    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->id)) {
        http_response_code(400);
        echo json_encode(array("mensaje" => "Falta el ID para activar la categoría."));
        return;
    }

    $query = "UPDATE Categorias_JRYF SET estado = 'activa' WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":id", $data->id);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("mensaje" => "Categoría activada."));
    } else {
        http_response_code(500);
        echo json_encode(array("mensaje" => "No se pudo activar la categoría."));
    }
}
?>
