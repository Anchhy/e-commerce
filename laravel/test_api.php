<?php

require __DIR__ . '/vendor/autoload.php';

// Bootstrap Laravel
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make('Illuminate\Contracts\Http\Kernel');

// Create a test request
$request = \Illuminate\Http\Request::create('/api/categories', 'GET');
$response = $kernel->handle($request);

echo "Status: " . $response->status() . "\n";
echo "Content:\n";
echo $response->getContent() . "\n";
