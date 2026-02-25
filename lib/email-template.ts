export const getBookingEmailTemplate = ({
    eventTitle,
    date,
    time,
    location,
    eventUrl,
}: {
    eventTitle: string;
    date: string;
    time: string;
    location: string;
    eventUrl: string;
}) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px; }
          .header { background-color: #0d161a; color: #59deca; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { padding: 30px; }
          .footer { text-align: center; padding: 20px; color: #777; font-size: 12px; }
          .button { display: inline-block; padding: 12px 24px; background-color: #59deca; color: #000; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
          .event-details { background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0; }
          .detail-item { margin-bottom: 10px; }
          .detail-label { font-weight: bold; color: #555; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Confirmed!</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>Pack your bags! You've successfully booked your spot for <strong>${eventTitle}</strong>.</p>
            
            <div class="event-details">
              <div class="detail-item">
                <span class="detail-label">Date:</span> ${date}
              </div>
              <div class="detail-item">
                <span class="detail-label">Time:</span> ${time}
              </div>
              <div class="detail-item">
                <span class="detail-label">Location:</span> ${location}
              </div>
            </div>
            
            <p>We're excited to have you join us. Click the button below to view the event details on our platform.</p>
            
            <a href="${eventUrl}" class="button">View Event Details</a>
            
            <p style="margin-top: 30px;">See you there,<br>The DevEvent Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2026 DevEvent. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
