<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];
    
    $to = "your-email@example.com"; // Replace with your email address
    $subject = "New Contact Form Submission";
    
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Message:\n$message\n";
    
    // Save to file (you can modify this to use a database later)
    $file = 'submissions.txt';
    $current = file_get_contents($file);
    $current .= "---\n" . $body . "\n";
    file_put_contents($file, $current);
    
    // Send email (uncomment and configure SMTP settings in php.ini to use)
    // mail($to, $subject, $body);
    
    echo json_encode(["status" => "success", "message" => "Thank you for your message. We'll get back to you soon!"]);
} else {
    echo json_encode(["status" => "error", "message" => "There was a problem with your submission. Please try again."]);
}