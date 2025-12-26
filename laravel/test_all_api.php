<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make('Illuminate\Contracts\Http\Kernel');

$endpoints = [
    'GET /api/categories',
    'GET /api/products',
    'GET /api/categories/1/products',
    'POST /api/categories',
    'PATCH /api/products/1',
    'DELETE /api/categories/1',
];

foreach ($endpoints as $endpoint) {
    [$method, $uri] = explode(' ', $endpoint);
    $request = \Illuminate\Http\Request::create($uri, $method);
    $response = $kernel->handle($request);
    
    echo "[" . str_pad($method, 6) . "] $uri -> " . $response->status() . " " . $response->getContent() . "\n";
}
