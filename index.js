const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const resend = new Resend('re_KzQzevDn_K3F7ifoRoTMmboXKczC44DTG');

app.use(cors());
app.use(express.json());

app.post('/send-otp', async (req, res) => {
  const { email, name, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ success: false, error: 'Email and OTP are required' });
  }
  try {
    await resend.emails.send({
      from: 'Cory Booker Fund <onboarding@resend.dev>',
      to: email,
      subject: 'Your Cory Booker Fund Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0A1628; padding: 40px; border-radius: 12px;">
          <h1 style="color: #FFD700; text-align: center;">Cory Booker Fund</h1>
          <p style="color: #FFFFFF; font-size: 16px;">Hello ${name || 'Supporter'},</p>
          <p style="color: #FFFFFF; font-size: 16px;">Your verification code is:</p>
          <div style="background-color: #0D2137; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h2 style="color: #FFD700; font-size: 48px; letter-spacing: 10px; margin: 0;">${otp}</h2>
          </div>
          <p style="color: #A0AEC0; font-size: 14px;">This code expires in 10 minutes.</p>
          <p style="color: #A0AEC0; font-size: 14px;">Do not share this code with anyone.</p>
          <p style="color: #A0AEC0; font-size: 14px;">Cory Booker Fund will never ask for your code.</p>
          <hr style="border-color: #1A3A5C; margin: 20px 0;">
          <p style="color: #4A5568; font-size: 12px; text-align: center;">Thank you for standing with Senator Cory Booker</p>
        </div>
      `
    });
    res.json({ success: true });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'Cory Booker Fund API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
