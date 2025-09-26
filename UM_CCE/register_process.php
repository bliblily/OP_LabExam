<?php
// UM College of Computing Education - Registration Processing
// This is a basic example - in production, use proper security measures

// Start session
session_start();

// Database configuration (adjust as needed)
$host = 'localhost';
$dbname = 'um_cce';
$db_username = 'root';
$db_password = '';

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
$fullName = trim($_POST['fullName'] ?? '');
$email = trim($_POST['email'] ?? '');
$username = trim($_POST['username'] ?? '');
$password = trim($_POST['password'] ?? '');
$confirmPassword = trim($_POST['confirmPassword'] ?? '');

// Validate input
if (empty($fullName)) {
    sendResponse(false, 'Full name is required');
}

if (strlen($fullName) < 2) {
    sendResponse(false, 'Full name must be at least 2 characters');
}

if (empty($email)) {
    sendResponse(false, 'Email is required');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, 'Please enter a valid email address');
}

if (empty($username)) {
    sendResponse(false, 'Username is required');
}

if (strlen($username) < 3) {
    sendResponse(false, 'Username must be at least 3 characters');
}

if (empty($password)) {
    sendResponse(false, 'Password is required');
}

if (strlen($password) < 6) {
    sendResponse(false, 'Password must be at least 6 characters');
}

if ($password !== $confirmPassword) {
    sendResponse(false, 'Passwords do not match');
}

try {
    // Connect to database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $db_username, $db_password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
    
    // Check if username already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        sendResponse(false, 'Username already exists. Please choose a different one.');
    }
    
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        sendResponse(false, 'Email already registered. Please use a different email or login.');
    }
    
    // Hash password
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user
    $stmt = $pdo->prepare("INSERT INTO users (username, email, full_name, password_hash) VALUES (?, ?, ?, ?)");
    $stmt->execute([$username, $email, $fullName, $passwordHash]);
    
    // Get the new user ID
    $userId = $pdo->lastInsertId();
    
    // Registration successful
    sendResponse(true, 'Registration successful! Welcome to UM CCE. You can now log in.', 'login.html');
    
} catch (PDOException $e) {
    // For demo purposes, simulate successful registration if database doesn't exist
    if (strpos($e->getMessage(), 'Unknown database') !== false || 
        strpos($e->getMessage(), 'Connection refused') !== false ||
        strpos($e->getMessage(), 'Access denied') !== false) {
        
        // Demo mode - simulate successful registration
        sendResponse(true, 'Registration successful! Welcome to UM CCE (Demo Mode). You can now log in.', 'login.html');
    }
    
    // Check for duplicate entry errors
    if ($e->getCode() == 23000) {
        if (strpos($e->getMessage(), 'username') !== false) {
            sendResponse(false, 'Username already exists. Please choose a different one.');
        } elseif (strpos($e->getMessage(), 'email') !== false) {
            sendResponse(false, 'Email already registered. Please use a different email or login.');
        }
    }
    
    error_log("Registration error: " . $e->getMessage());
    sendResponse(false, 'Database error. Please try again later.');
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

-- Create indexes for better performance
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_status ON users(status);
*/
?>