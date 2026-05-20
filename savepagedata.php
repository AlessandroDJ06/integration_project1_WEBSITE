<?php
$jsonRaw = file_get_contents('php://input');
$data = json_decode($jsonRaw, true);

if (isset($data['session_id']) && isset($data['page'])) {
    $sid = $data['session_id'];
    $page = $data['page'];
    $filename = 'navigation_logs.json';
    $alreadyIn = false;

    $logs = file_exists($filename) ? json_decode(file_get_contents($filename), true) : [];


    if (!isset($logs[$sid])) {
        $logs[$sid] = [];
    }

   
    for ($i = 0 ; $i < count($logs[$sid]); $i++){
        if ($logs[$sid][$i] == $page){
            $alreadyIn = true;
        }
    }

    if (!$alreadyIn) {
        $logs[$sid][] = $page;
    }
    file_put_contents($filename, json_encode($logs, JSON_PRETTY_PRINT), LOCK_EX);
}
?>