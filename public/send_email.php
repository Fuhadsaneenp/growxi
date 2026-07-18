<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

// Get POST data
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON input"]);
    exit;
}

$receipt_no = filter_var($data['receiptNo'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
$receipt_date = filter_var($data['receiptDate'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
$customer_name = filter_var($data['name'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
$customer_email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
$customer_phone = filter_var($data['phone'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
$plan_name = filter_var($data['planLabel'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
$format_name = filter_var($data['formatLabel'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
$amount_paid = filter_var($data['price'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);

if (!$customer_email) {
    http_response_code(400);
    echo json_encode(["error" => "Valid customer email is required"]);
    exit;
}

// 1. Send Email to Customer
$to_customer = $customer_email;
$subject_customer = "Order Placed Successfully - Receipt #$receipt_no";
$message_customer = "Dear $customer_name,\n\n"
                  . "Your order has been placed successfully.\n"
                  . "Our concern person will contact you soon.\n\n"
                  . "----------------------------------------\n"
                  . "ORDER DETAILS:\n"
                  . "----------------------------------------\n"
                  . "Receipt No  : $receipt_no\n"
                  . "Plan        : $plan_name\n"
                  . "Format      : $format_name\n"
                  . "Amount Paid : $amount_paid\n"
                  . "Date        : $receipt_date\n\n"
                  . "Thank you for choosing GrowXi!\n\n"
                  . "Best regards,\n"
                  . "GrowXi Team\n"
                  . "info@growxi.com";

$headers_customer = "From: GrowXi <info@growxi.com>\r\n"
                  . "Reply-To: info@growxi.com\r\n"
                  . "X-Mailer: PHP/" . phpversion();

$mail_customer_ok = mail($to_customer, $subject_customer, $message_customer, $headers_customer);

// 2. Send Email to Admin/Owner
$to_admin = "info@growxi.com";
$subject_admin = "🚨 New Order Received - Receipt #$receipt_no";
$message_admin = "Hi Team,\n\n"
                . "A new order has been successfully placed on GrowXi.\n\n"
                . "----------------------------------------\n"
                . "CUSTOMER DETAILS:\n"
                . "----------------------------------------\n"
                . "Name  : $customer_name\n"
                . "Email : $customer_email\n"
                . "Phone : $customer_phone\n\n"
                . "----------------------------------------\n"
                . "ORDER DETAILS:\n"
                . "----------------------------------------\n"
                . "Receipt No  : $receipt_no\n"
                . "Plan        : $plan_name\n"
                . "Format      : $format_name\n"
                . "Amount Paid : $amount_paid\n"
                . "Date        : $receipt_date\n\n"
                . "Please review and follow up with the client.\n";

$headers_admin = "From: GrowXi System <info@growxi.com>\r\n"
                . "Reply-To: $customer_email\r\n"
                . "X-Mailer: PHP/" . phpversion();

$mail_admin_ok = mail($to_admin, $subject_admin, $message_admin, $headers_admin);

echo json_encode([
    "success" => true,
    "customer_mail" => $mail_customer_ok,
    "admin_mail" => $mail_admin_ok
]);
?>
