import { emailProvider } from '@infra/providers/auth.provider';

export const passwordResetTemplate = async (userName: string, subject: string, email: string, otp: string) => {
  const html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset OTP</title>

     <style>
        /* Reset styles for email clients */
        body,
        table,
        td,
        p,
        a,
        li,
        blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            background: #2c3e50;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        /* Main styles */
        body {
            margin: 0 !important;
            padding: 0 !important;
            /* background-color: #f8f9fa; */
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;

            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            padding: 40px 40px 30px 40px;
            text-align: center;
            /* background-color: #ffffff; */
        }

        .company-logo {
            width: 120px;
            height: 120px;
            /* background-color: #225ce4; */
            border-radius: 8px;
            margin: 0 auto 30px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .logo-icon {
            color: white;
            font-size: 24px;
        }

        .company-name {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            color: #D70514;
            font-size: 12px;
            font-weight: 600;
        }

        .company-tagline {
            position: absolute;
            bottom: -2px;
            left: 50%;
            transform: translateX(-50%);
            color: #D70514;
            font-size: 8px;
            sendVerificationOtp opacity: 0.8;
        }

        .email-content {
            padding: 0 40px 30px 40px;
            text-align: left;
        }

        .greeting {
            font-size: 16px;
            color: #ffffff;
            margin: 0 0 20px 0;
            font-weight: 500;
        }

        .main-text {
            font-size: 16px;
            color: #e0e0e0;
            line-height: 1.6;
            margin: 0 0 20px 0;
        }

        .brand-highlight {
            color: #D70514;
            font-weight: 600;
        }

        .warning-text {
            font-size: 14px;
            color: #ffebeb;
            line-height: 1.5;
            margin: 0 0 30px 0;
        }

        .verification-section {
            text-align: center;
            padding: 30px 0;
            background-color: #ffffff20;
            border-radius: 8px;
            margin: 30px 0;
            position: relative;
        }

        .verification-label {
            font-size: 16px;
            color: #2c3e50;
            margin: 0 0 15px 0;
            font-weight: 600;
        }

        .verification-code {
            font-size: 36px;
            font-weight: 700;
            color: #D70514;
            letter-spacing: 3px;
            margin: 0 0 20px 0;
            font-family: 'Courier New', monospace;
            cursor: pointer;
        }

        .copy-button {
            display: inline-block;
            padding: 10px 25px;
            background-color: #D70514;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            border: none;
            position: relative;
        }

        .copy-button:hover {
            background-color: #000000;

        }

        /* Tooltip styles */
        .tooltip {
            visibility: hidden;
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #225ce4;
            color: white;
            font-size: 14px;
            padding: 5px 10px;
            border-radius: 5px;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }

        #confirmationMessage {
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #225ce4;
            color: white;
            font-size: 14px;
            padding: 5px 10px;
            border-radius: 5px;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }

        .copy-button:hover .tooltip {
            visibility: visible;
            opacity: 1;
        }

        .social-section {
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid #ecf0f1;
        }

        .social-links {
            margin: 0 0 20px 0;
        }

        .social-link {
            display: inline-block;
            width: 40px;
            height: 40px;
            margin: 0 8px;
            background-color: #ecf0f1;
            border-radius: 50%;
            text-decoration: none;
            line-height: 40px;
            color: #7f8c8d;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }

        .social-link:hover {
            background-color: #bdc3c7;
        }

        .social-link.facebook:hover {
            background-color: #3b5998;
            color: white;
        }

        .social-link.twitter:hover {
            background-color: #1da1f2;
            color: white;
        }

        .social-link.instagram:hover {
            background-color: #e4405f;
            color: white;
        }

        .social-link.youtube:hover {
            background-color: #ff0000;
            color: white;
        }

        .email-signature {
            text-align: center;
        }

        .signature-text {
            font-size: 16px;
            color: #2c3e50;
            margin: 0 0 5px 0;
        }

        .team-name {
            font-size: 14px;
            color: #7f8c8d;
            margin: 0;
        }

        /* Mobile responsive */
        @media only screen and (max-width: 600px) {

            .email-header,
            .email-content,
            .social-section {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }

            .company-logo {
                width: 100px;
                height: 100px;
            }

            .verification-code {
                font-size: 28px;
                letter-spacing: 2px;
            }

            .social-link {
                width: 35px;
                height: 35px;
                line-height: 35px;
                margin: 0 5px;
            }
        }
    </style>
</head>

<body>
    <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
            <td style="padding: 20px 0;">
                <div class="email-container">
                    <!-- Content -->
                    <div class="content">

                        <p class="text">Hello ${userName},</p>

                        <p class="text">
                            We received a request to reset your <strong>ERP</strong> account password.
                            Use the verification code below to continue.
                        </p>

                        <!-- OTP -->
                        <div class="otp-box">
                            <div class="otp-label">Your password reset code</div>
                            <div class="otp-code">${otp}</div>
                        </div>

                        <p class="note">
                            • This code expires in <strong>5 minutes</strong><br />
                            • Never share this code with anyone<br />
                            • If you didn’t request this, please ignore this email
                        </p>

                    </div>

                    <!-- Footer -->
                    <div class="footer">
                        Regards,<br />
                        Team <strong>ERP</strong>
                    </div>

                </div>
            </td>
        </tr>
    </table>
</body>

</html>`;
  //   await sendEmail(email, subject, html);
  await emailProvider.send({ to: email, subject, html });
};
