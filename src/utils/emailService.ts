import axios from 'axios';
import { Invoice } from './dataService';

const API_URL = 'http://localhost:3001/api';

const formatCurrency = (amount: number): string => {
  return `R ${amount.toFixed(2)}`;
};

const generateInvoiceHTML = (invoice: Invoice, isAdmin: boolean): string => {
  const items = invoice.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formatCurrency(item.price)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formatCurrency(item.price * item.quantity)}</td>
      </tr>
    `
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333; text-align: center;">Order Confirmation</h1>
      <p>Order #${invoice.orderNumber}</p>
      <p>Date: ${new Date(invoice.orderDate).toLocaleDateString()}</p>

      <h2 style="color: #444;">Customer Information</h2>
      <p>
        ${invoice.customerInfo.firstName} ${invoice.customerInfo.lastName}<br>
        Email: ${invoice.customerInfo.email}<br>
        Phone: ${invoice.customerInfo.phone}<br>
        Address: ${invoice.customerInfo.address}<br>
        ${invoice.customerInfo.city}, ${invoice.customerInfo.state} ${invoice.customerInfo.zipCode}
      </p>

      <h2 style="color: #444;">Order Details</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="padding: 8px; text-align: left;">Item</th>
            <th style="padding: 8px; text-align: left;">Quantity</th>
            <th style="padding: 8px; text-align: left;">Price</th>
            <th style="padding: 8px; text-align: left;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${items}
          <tr>
            <td colspan="3" style="padding: 8px; text-align: right; font-weight: bold;">Total:</td>
            <td style="padding: 8px; font-weight: bold;">${formatCurrency(invoice.total)}</td>
          </tr>
        </tbody>
      </table>

      ${
        isAdmin
          ? `<p style="color: #666; margin-top: 20px;">This is an admin copy of the order confirmation.</p>`
          : `<p style="color: #666; margin-top: 20px;">Thank you for your order! We'll process it shortly.</p>`
      }
    </div>
  `;
};

export const emailService = {
  sendInvoiceEmail: async (invoice: Invoice, isAdmin: boolean = false): Promise<void> => {
    const subject = isAdmin
      ? `New Order Received - #${invoice.orderNumber}`
      : `Order Confirmation - #${invoice.orderNumber}`;

    const recipient = isAdmin
      ? 'sadik@sadikul.me'
      : invoice.customerInfo.email;

    const emailData = {
      to: recipient,
      subject: subject,
      html: generateInvoiceHTML(invoice, isAdmin),
    };

    try {
      const response = await axios.post(`${API_URL}/send-email`, emailData);
      console.log(`Email sent successfully to ${recipient}:`, response.data);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },

  sendOrderConfirmation: async (invoice: Invoice): Promise<void> => {
    // Send to customer
    await emailService.sendInvoiceEmail(invoice, false);
    // Send to admin
    await emailService.sendInvoiceEmail(invoice, true);
  }
}; 