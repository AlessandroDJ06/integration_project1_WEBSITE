<?php
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

$bestand = __DIR__ . "../../chatbotData.json";
$gesprek = file_exists($bestand) ? json_decode(file_get_contents($bestand), true) : [];

$gesprek[] = [
  "message" => $data["message"],
  "category" => $data["category"],
  "recognized" => $data["recognized"]

];

file_put_contents($bestand, json_encode($gesprek, JSON_PRETTY_PRINT));
echo json_encode(["succes" => true]);