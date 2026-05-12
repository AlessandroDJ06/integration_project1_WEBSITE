<?php
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

$file = __DIR__ . "/chatbotdata.json";
$conversation = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

$conversation[] = [
  "message" => $data["message"],
  "response" => $data["response"]

];

file_put_contents($file, json_encode($conversation, JSON_PRETTY_PRINT));
echo json_encode(["succes" => true]);