
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail(to, imageBuffer) {
  const msg = {
    to,
    from: 'your-email@example.com',
    subject: 'Your Anime-style Portrait!',
    text: 'See attached image!',
    attachments: [
      {
        content: imageBuffer.toString('base64'),
        filename: 'anime-style.png',
        type: 'image/png',
        disposition: 'attachment'
      }
    ]
  };
  await sgMail.send(msg);
}
