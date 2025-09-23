import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.FROM_EMAIL || "hello@dataprism.app";

export async function sendPasswordResetOTPEmail({
  to,
  otp,
}: {
  to: string;
  otp: string;
}) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Password Reset Code",
    html: `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #ffffff; padding: 40px 20px; margin: 0;">
    <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff;">
      
      <!-- Header -->
      <div style="padding: 0 0 40px 0; border-bottom: 1px solid #e5e7eb;">
        <h1 style="color: #000000; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.3px;">
          Dataprism
        </h1>
      </div>
      
      <!-- Content -->
      <div style="padding: 40px 0;">
        <h2 style="color: #000000; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
          Reset your password
        </h2>
        
        <p style="color: #374151; margin: 0 0 30px 0; font-size: 16px; line-height: 1.5;">
          Here's your password reset code. Enter this code to reset your password:
        </p>
        
        <!-- Code Display -->
        <div style="margin: 30px 0; text-align: center;">
          <div style="display: inline-block; 
                      background-color: #f3f4f6; 
                      padding: 20px 30px; 
                      border-radius: 8px;
                      border: 2px solid #e5e7eb;">
            <span style="font-family: 'Courier New', monospace; 
                         font-size: 32px; 
                         font-weight: 700; 
                         color: #000000; 
                         letter-spacing: 8px;">
              ${otp}
            </span>
          </div>
        </div>
        
        <p style="color: #6b7280; margin: 30px 0 0 0; font-size: 14px; line-height: 1.5;">
          This code expires in 10 minutes. If you didn't request this password reset, you can safely ignore this email.
        </p>
      </div>
      
      <!-- Footer -->
      <div style="padding: 20px 0 0 0; border-top: 1px solid #e5e7eb;">
        <p style="color: #9ca3af; margin: 0; font-size: 12px;">
          Dataprism Team
        </p>
      </div>
    </div>
  </div>
`,
  });
}

export async function sendEmailVerificationOTPEmail({
  to,
  otp,
}: {
  to: string;
  otp: string;
}) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Verification Code",
    html: `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #ffffff; padding: 40px 20px; margin: 0;">
    <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff;">
      
      <!-- Header -->
      <div style="padding: 0 0 40px 0; border-bottom: 1px solid #e5e7eb;">
        <h1 style="color: #000000; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.3px;">
          Dataprism
        </h1>
      </div>
      
      <!-- Content -->
      <div style="padding: 40px 0;">
        <h2 style="color: #000000; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
          Verify your email address
        </h2>
        
        <p style="color: #374151; margin: 0 0 30px 0; font-size: 16px; line-height: 1.5;">
          Here's your verification code:
        </p>
        
        <!-- Code Display -->
        <div style="margin: 30px 0; text-align: center;">
          <div style="display: inline-block; 
                      background-color: #f3f4f6; 
                      padding: 20px 30px; 
                      border-radius: 8px;
                      border: 2px solid #e5e7eb;">
            <span style="font-family: 'Courier New', monospace; 
                         font-size: 32px; 
                         font-weight: 700; 
                         color: #000000; 
                         letter-spacing: 8px;">
              ${otp}
            </span>
          </div>
        </div>
        
        <p style="color: #6b7280; margin: 30px 0 0 0; font-size: 14px; line-height: 1.5;">
          This code expires in 10 minutes. If you didn't create an account, please ignore this email.
        </p>
      </div>
      
      <!-- Footer -->
      <div style="padding: 20px 0 0 0; border-top: 1px solid #e5e7eb;">
        <p style="color: #9ca3af; margin: 0; font-size: 12px;">
          Dataprism Team
        </p>
      </div>
    </div>
  </div>
`,
  });
}

export async function sendPasswordResetLinkEmail({
  to,
  url,
}: {
  to: string;
  url: string;
}) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Reset your password",
    html: `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #ffffff; padding: 40px 20px; margin: 0;">
    <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff;">
      
      <!-- Header -->
      <div style="padding: 0 0 40px 0; border-bottom: 1px solid #e5e7eb;">
        <h1 style="color: #000000; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.3px;">
          Dataprism
        </h1>
      </div>
      
      <!-- Content -->
      <div style="padding: 40px 0;">
        <h2 style="color: #000000; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
          Reset your password
        </h2>
        
        <p style="color: #374151; margin: 0 0 30px 0; font-size: 16px; line-height: 1.5;">
          Click the button below to reset your password. This link will expire in 1 hour.
        </p>
        
        <!-- CTA Button -->
        <div style="margin: 30px 0;">
          <a href="${url}" 
             style="display: inline-block; 
                    background-color: #000000; 
                    color: #ffffff; 
                    padding: 8px 16px; 
                    text-decoration: none; 
                    font-size: 14px; 
                    font-weight: 500; 
                    border-radius: 4px;">
            Reset Password
          </a>
        </div>
        
        <p style="color: #6b7280; margin: 30px 0 0 0; font-size: 14px; line-height: 1.5;">
          If you didn't request this password reset, you can safely ignore this email.
        </p>
      </div>
      
      <!-- Footer -->
      <div style="padding: 20px 0 0 0; border-top: 1px solid #e5e7eb;">
        <p style="color: #9ca3af; margin: 0; font-size: 12px;">
          Dataprism Team
        </p>
      </div>
    </div>
  </div>
`,
  });
}

export async function sendEmailVerificationLinkEmail({
  to,
  verificationUrl,
}: {
  to: string;
  verificationUrl: string;
}) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Verify your email address",
    html: `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #ffffff; padding: 40px 20px; margin: 0;">
    <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff;">
      
      <!-- Header -->
      <div style="padding: 0 0 40px 0; border-bottom: 1px solid #e5e7eb;">
        <h1 style="color: #000000; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.3px;">
          Dataprism
        </h1>
      </div>
      
      <!-- Content -->
      <div style="padding: 40px 0;">
        <h2 style="color: #000000; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
          Verify your email address
        </h2>
        
        <p style="color: #374151; margin: 0 0 30px 0; font-size: 16px; line-height: 1.5;">
          Click the button below to verify your email address and activate your Dataprism account.
        </p>
        
        <!-- CTA Button -->
        <div style="margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="display: inline-block; 
                    background-color: #000000; 
                    color: #ffffff; 
                    padding: 8px 16px; 
                    text-decoration: none; 
                    font-size: 14px; 
                    font-weight: 500; 
                    border-radius: 4px;">
            Verify Email
          </a>
        </div>
        
        <p style="color: #6b7280; margin: 30px 0 0 0; font-size: 14px; line-height: 1.5;">
          This link expires in 24 hours. If you didn't create an account, please ignore this email.
        </p>
      </div>
      
      <!-- Footer -->
      <div style="padding: 20px 0 0 0; border-top: 1px solid #e5e7eb;">
        <p style="color: #9ca3af; margin: 0; font-size: 12px;">
          Dataprism Team
        </p>
      </div>
    </div>
  </div>
`,
  });
}
