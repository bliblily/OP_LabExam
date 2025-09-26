<?php
// UM College of Computing Education - Login Processing
// This is a basic example - in production, use proper security measures

// Start session
session_start();

// Database configuration (adjust as needed)
$host = 'localhost';
$dbname = 'um_cce';
$username = 'root';
$password = '';

// Response function
function sendResponse($success, $message, $redirect = null) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'redirect' => $redirect
    ]);
    exit;
}

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Invalid request method');
}

// Get form data
$username = trim($_POST['username'] ?? '');
$password = trim($_POST['password'] ?? '');

// Validate input
if (empty($username)) {
    sendResponse(false, 'Username is required');
}

if (empty($password)) {
    sendResponse(false, 'Password is required');
}

try {
    // Connect to database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
    
    // Check if user exists
    $stmt = $pdo->prepare("SELECT id, username, email, full_name, password_hash FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$username, $username]);
    $user = $stmt->fetch();
    
    if (!$user) {
        sendResponse(false, 'Invalid username or password');
    }
    
    // Verify password
    if (!password_verify($password, $user['password_hash'])) {
        sendResponse(false, 'Invalid username or password');
    }
    
    // Login successful - create session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['full_name'] = $user['full_name'];
    $_SESSION['logged_in'] = true;
    
    // Update last login time
    $stmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
    $stmt->execute([$user['id']]);
    
    sendResponse(true, 'Login successful! Welcome to UM CCE', 'index.html');
    
} catch (PDOException $e) {
    // For demo purposes, simulate successful login if database doesn't exist
    if (strpos($e->getMessage(), 'Unknown database') !== false || 
        strpos($e->getMessage(), 'Connection refused') !== false ||
        strpos($e->getMessage(), 'Access denied') !== false) {
        
        // Demo mode - accept any credentials for testing
        $_SESSION['user_id'] = 1;
        $_SESSION['username'] = $username;
        $_SESSION['email'] = 'demo@umcce.edu.ph';
        $_SESSION['full_name'] = 'Demo User';
        $_SESSION['logged_in'] = true;
        
        sendResponse(true, 'Login successful! Welcome to UM CCE (Demo Mode)', 'index.html');
    }
    
    error_log("Login error: " . $e->getMessage());
    sendResponse(false, 'Database connection error. Please try again later.');
}

// Database Schema for reference:
/*
CREATE DATABASE um_cce;
USE um_cce;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    status ENUM('active', 'inactive') DEFAULT 'active'
);
*/
?>