<?php
/**
 * Secure Contact Form Handler
 * Production Ready with Security Features
 */

// Security Headers
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// CORS - Allow only your domain (update with your actual domain)
$allowed_origins = [
    'https://www.greenspacess.com',
    'https://greenspacess.com',
    'http://localhost' // Remove in production
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Rate Limiting - Simple file-based (use Redis/Memcached in production)
session_start();
$rate_limit_key = 'form_submit_' . $_SERVER['REMOTE_ADDR'];
$rate_limit_file = sys_get_temp_dir() . '/' . md5($rate_limit_key) . '.txt';

if (file_exists($rate_limit_file)) {
    $last_submit = (int)file_get_contents($rate_limit_file);
    if (time() - $last_submit < 60) { // 1 minute cooldown
        http_response_code(429);
        echo json_encode([
            'success' => false, 
            'message' => 'Please wait before submitting again'
        ]);
        exit;
    }
}

// Input Sanitization Function
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Validation Function
function validate_input($field, $value, $type, $min = 0, $max = 1000) {
    $errors = [];
    
    if (empty($value)) {
        $errors[] = "$field is required";
        return $errors;
    }
    
    $length = strlen($value);
    if ($length < $min || $length > $max) {
        $errors[] = "$field must be between $min and $max characters";
    }
    
    switch ($type) {
        case 'name':
            if (!preg_match("/^[a-zA-Z\s]+$/", $value)) {
                $errors[] = "$field should contain only letters and spaces";
            }
            break;
            
        case 'email':
            if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                $errors[] = "Invalid email format";
            }
            break;
            
        case 'phone':
            if (!preg_match("/^[0-9]{10}$/", $value)) {
                $errors[] = "Phone number must be exactly 10 digits";
            }
            break;
            
        case 'text':
            // Already sanitized, just check length
            break;
    }
    
    return $errors;
}

// Get and sanitize POST data
$name = sanitize_input($_POST['name'] ?? '');
$email = sanitize_input($_POST['email'] ?? '');
$phone = sanitize_input($_POST['phone'] ?? '');
$interest = sanitize_input($_POST['interest'] ?? '');
$subject = sanitize_input($_POST['subject'] ?? '');
$message = sanitize_input($_POST['message'] ?? '');
$honeypot = $_POST['website'] ?? '';

// Honeypot check (bot protection)
if (!empty($honeypot)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid submission']);
    exit;
}

// Validate all fields
$errors = [];
$errors = array_merge($errors, validate_input('Name', $name, 'name', 2, 100));
$errors = array_merge($errors, validate_input('Email', $email, 'email', 5, 100));
$errors = array_merge($errors, validate_input('Phone', $phone, 'phone', 10, 10));
$errors = array_merge($errors, validate_input('Subject', $subject, 'text', 5, 200));
$errors = array_merge($errors, validate_input('Message', $message, 'text', 10, 1000));

if (!empty($interest) && !in_array($interest, [
    'Purandhar Project', 
    'Khed Project', 
    'Konkan Project', 
    'Mulshi Project', 
    'General Inquiry'
])) {
    $errors[] = 'Invalid project interest selected';
}

// If validation errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Validation failed',
        'errors' => $errors
    ]);
    exit;
}

// Email Configuration
$to = 'greennspacess@gmail.com';
$email_subject = "New Contact Form Submission: $subject";

// Email Body (HTML)
$email_body = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #28a745; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { color: #333; margin-top: 5px; }
        .footer { text-align: center; padding: 20px; color: #777; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>🌱 New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>$name</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>$email</div>
            </div>
            <div class='field'>
                <div class='label'>Phone:</div>
                <div class='value'>$phone</div>
            </div>
            <div class='field'>
                <div class='label'>Project Interest:</div>
                <div class='value'>$interest</div>
            </div>
            <div class='field'>
                <div class='label'>Subject:</div>
                <div class='value'>$subject</div>
            </div>
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>" . nl2br($message) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Submitted:</div>
                <div class='value'>" . date('d M Y, h:i A') . "</div>
            </div>
            <div class='field'>
                <div class='label'>IP Address:</div>
                <div class='value'>" . $_SERVER['REMOTE_ADDR'] . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>This email was sent from the GREENSPACESS contact form</p>
        </div>
    </div>
</body>
</html>
";

// Email Headers
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: GREENSPACESS Contact Form <noreply@greenspacess.com>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'X-Priority: 1',
    'Importance: High'
];

// Send Email
$mail_sent = mail($to, $email_subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Update rate limit
    file_put_contents($rate_limit_file, time());
    
    // Log submission (optional - create logs directory first)
    $log_entry = date('Y-m-d H:i:s') . " | $name | $email | $phone | $subject\n";
    @file_put_contents('logs/contact-submissions.log', $log_entry, FILE_APPEND);
    
    // Send auto-reply to customer
    $customer_subject = "Thank you for contacting GREENSPACESS";
    $customer_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #28a745; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>🌱 Thank You for Contacting GREENSPACESS</h2>
            </div>
            <div class='content'>
                <p>Dear $name,</p>
                <p>Thank you for your interest in our agriculture land and farmhouse projects. We have received your inquiry and our team will get back to you within 24 hours.</p>
                <p><strong>Your Inquiry Details:</strong></p>
                <p><strong>Subject:</strong> $subject<br>
                <strong>Project Interest:</strong> $interest</p>
                <p>For immediate assistance, please call us at:<br>
                📞 7972258038 or 7666090107</p>
                <p>Best regards,<br>
                <strong>GREENSPACESS Team</strong></p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $customer_headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: GREENSPACESS <greennspacess@gmail.com>',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    @mail($email, $customer_subject, $customer_body, implode("\r\n", $customer_headers));
    
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully. We will contact you soon.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again or call us directly.'
    ]);
}
?>
