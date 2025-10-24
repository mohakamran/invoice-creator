import React, { forwardRef } from 'react';
import {
  Paper,
  Typography,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

// Default invoice structure to prevent destructuring errors
const defaultInvoice = {
  from: {
    companyName: "Your Company Name",
    email: "your.email@example.com",
    address: "123 Main St, City, Country",
    phone: "+1 (555) 123-4567",
  },
  to: {
    clientName: "Client Name",
    clientEmail: "client.email@example.com",
    clientAddress: "456 Client Ave, Town, Country",
    clientPhone: "+1 (555) 987-6543",
  },
  invoiceDetails: {
    invoiceNumber: "#INV-0001",
    date: new Date().toISOString().split('T')[0],
    dueDate: "",
    notes: "Thank you for your business! We appreciate your trust in our services.",
  },
  items: [
    { id: 1, name: "Web Design Services", quantity: 1, price: 750 },
    { id: 2, name: "Hosting (1 Year)", quantity: 1, price: 120 },
  ],
  taxRate: 10,
  discount: 0,
};

const InvoicePreview = forwardRef(({ invoice = defaultInvoice }, ref) => {
  
  // Safe destructuring with fallbacks
  const { 
    from = defaultInvoice.from, 
    to = defaultInvoice.to, 
    invoiceDetails = defaultInvoice.invoiceDetails, 
    items = defaultInvoice.items, 
    taxRate = defaultInvoice.taxRate,
    discount = defaultInvoice.discount
  } = invoice || {};
  
  // Safe nested destructuring
  const {
    companyName = defaultInvoice.from.companyName,
    email = defaultInvoice.from.email,
    address = defaultInvoice.from.address,
    phone = defaultInvoice.from.phone
  } = from || {};

  const {
    clientName = defaultInvoice.to.clientName,
    clientEmail = defaultInvoice.to.clientEmail,
    clientAddress = defaultInvoice.to.clientAddress,
    clientPhone = defaultInvoice.to.clientPhone
  } = to || {};

  const {
    invoiceNumber = defaultInvoice.invoiceDetails.invoiceNumber,
    date = defaultInvoice.invoiceDetails.date,
    dueDate = defaultInvoice.invoiceDetails.dueDate,
    notes = defaultInvoice.invoiceDetails.notes
  } = invoiceDetails || {};

  // Calculations with safe array
  const safeItems = Array.isArray(items) ? items : defaultInvoice.items;
  const subtotal = safeItems.reduce((sum, item) => {
    const quantity = Number(item.quantity) || 0;
    const price = Number(item.price) || 0;
    return sum + (quantity * price);
  }, 0);
  
  const safeTaxRate = Number(taxRate) || 0;
  const safeDiscount = Number(discount) || 0;
  
  const discountAmount = (subtotal * safeDiscount) / 100;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const taxAmount = (subtotalAfterDiscount * safeTaxRate) / 100;
  const total = subtotalAfterDiscount + taxAmount;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Paper 
      ref={ref}
      elevation={0}
      sx={{ 
        p: 6, 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
        color: '#2d3748',
        minHeight: '1123px', // A4 height
        width: '794px', // A4 width
        boxSizing: 'border-box',
        fontFamily: '"Segoe UI", "Inter", "Roboto", sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="invoice-preview"
    >
      {/* Background Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          opacity: 0.03,
          borderRadius: '50%',
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: 200,
          height: 200,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          opacity: 0.03,
          borderRadius: '50%',
          zIndex: 0
        }}
      />

      {/* Header Section */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 6 }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 2,
                fontSize: '2.5rem',
                fontFamily: '"Playfair Display", "Georgia", serif'
              }}
            >
              {companyName}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="body2" color="#4a5568" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span style={{ fontWeight: '600', color: '#2d3748', minWidth: '60px' }}>Address:</span>
                {address}
              </Typography>
              <Typography variant="body2" color="#4a5568" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span style={{ fontWeight: '600', color: '#2d3748', minWidth: '60px' }}>Email:</span>
                {email}
              </Typography>
              <Typography variant="body2" color="#4a5568" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span style={{ fontWeight: '600', color: '#2d3748', minWidth: '60px' }}>Phone:</span>
                {phone}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ textAlign: 'right', flex: 1 }}>
            <Typography 
              variant="h1" 
              fontWeight="black"
              sx={{
                fontSize: '4rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                lineHeight: 1,
                mb: 2,
                fontFamily: '"Playfair Display", "Georgia", serif'
              }}
            >
              INVOICE
            </Typography>
            <Box sx={{ 
              display: 'inline-block', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '12px 24px',
              borderRadius: '12px',
              color: 'white'
            }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                {invoiceNumber}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                <strong>Date:</strong> {formatDate(date)}
              </Typography>
              {dueDate && (
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  <strong>Due:</strong> {formatDate(dueDate)}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ 
          my: 4, 
          borderWidth: '2px', 
          borderColor: '#e2e8f0',
          background: 'linear-gradient(90deg, transparent, #667eea, transparent)',
          height: '2px'
        }} />

        {/* Bill To Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 6, gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h5" 
              fontWeight="bold" 
              sx={{ 
                color: '#2d3748',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <span style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                width: '4px',
                height: '24px',
                display: 'inline-block',
                borderRadius: '2px'
              }}></span>
              Bill To:
            </Typography>
            <Box sx={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
            }}>
              <Typography variant="h6" fontWeight="600" color="#2d3748" sx={{ mb: 1 }}>
                {clientName}
              </Typography>
              <Typography variant="body2" color="#4a5568" sx={{ mb: 0.5 }}>
                {clientEmail}
              </Typography>
              <Typography variant="body2" color="#4a5568" sx={{ whiteSpace: 'pre-line', mb: 0.5 }}>
                {clientAddress}
              </Typography>
              {clientPhone && (
                <Typography variant="body2" color="#4a5568">
                  {clientPhone}
                </Typography>
              )}
            </Box>
          </Box>
          
          <Box sx={{ 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '24px',
            borderRadius: '16px',
            color: 'white',
            minWidth: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
          }}>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
              Total Amount Due
            </Typography>
            <Typography variant="h2" fontWeight="bold" sx={{ fontSize: '2.5rem' }}>
              ${total.toFixed(2)}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8, mt: 1 }}>
              {dueDate ? `Due by ${formatDate(dueDate)}` : 'Due upon receipt'}
            </Typography>
          </Box>
        </Box>

        {/* Items Table */}
        <TableContainer 
          sx={{ 
            mb: 4,
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '& th': {
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  padding: '16px 12px',
                  border: 'none',
                  fontFamily: '"Inter", sans-serif'
                }
              }}>
                <TableCell>Description</TableCell>
                <TableCell align="center" width="100px">Qty</TableCell>
                <TableCell align="right" width="120px">Unit Price</TableCell>
                <TableCell align="right" width="120px">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {safeItems.map((item, index) => {
                const itemName = item.name || "Item description";
                const itemQuantity = Number(item.quantity) || 0;
                const itemPrice = Number(item.price) || 0;
                const itemTotal = itemQuantity * itemPrice;
                
                return (
                  <TableRow 
                    key={item.id || index}
                    sx={{ 
                      '&:nth-of-type(even)': { 
                        backgroundColor: '#f8f9fa' 
                      },
                      '&:last-child td': { 
                        borderBottom: '2px solid',
                        borderColor: '#e2e8f0'
                      },
                      '& td': {
                        padding: '14px 12px',
                        borderColor: '#e2e8f0',
                        color: '#2d3748'
                      }
                    }}
                  >
                    <TableCell>
                      <Typography variant="body1" fontWeight="500">
                        {itemName}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">
                        {itemQuantity}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">
                        ${itemPrice.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" fontWeight="600" color="#2d3748">
                        ${itemTotal.toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Totals Section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          mb: 6
        }}>
          <Box sx={{ 
            width: '350px',
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1" color="#4a5568">Subtotal:</Typography>
              <Typography variant="body1" fontWeight="600">${subtotal.toFixed(2)}</Typography>
            </Box>
            
            {safeDiscount > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1" color="#4a5568">
                  Discount ({safeDiscount}%):
                </Typography>
                <Typography variant="body1" color="#e53e3e" fontWeight="600">
                  -${discountAmount.toFixed(2)}
                </Typography>
              </Box>
            )}
            
            {safeTaxRate > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1" color="#4a5568">
                  Tax ({safeTaxRate}%):
                </Typography>
                <Typography variant="body1" fontWeight="600">
                  ${taxAmount.toFixed(2)}
                </Typography>
              </Box>
            )}
            
            <Divider sx={{ my: 2, borderColor: '#e2e8f0' }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5" fontWeight="bold" color="#2d3748">
                Total Due:
              </Typography>
              <Typography 
                variant="h4" 
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                ${total.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Notes & Terms */}
        {notes && (
          <Box sx={{ 
            mt: 4, 
            pt: 4, 
            borderTop: '2px dashed #e2e8f0'
          }}>
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              color="#2d3748"
              sx={{ 
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <span style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                width: '4px',
                height: '20px',
                display: 'inline-block',
                borderRadius: '2px'
              }}></span>
              Notes & Terms
            </Typography>
            <Box sx={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  whiteSpace: 'pre-line', 
                  lineHeight: 1.6,
                  color: '#4a5568',
                  fontStyle: 'italic'
                }}
              >
                {notes}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Footer */}
        <Box sx={{ 
          mt: 6, 
          pt: 4, 
          borderTop: '1px solid #e2e8f0', 
          textAlign: 'center'
        }}>
          <Typography variant="body2" color="#718096" sx={{ mb: 1 }}>
            Thank you for choosing our services!
          </Typography>
          <Typography variant="caption" color="#a0aec0">
            This invoice was generated with InvoiceCraft • {companyName} • All rights reserved
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
});

InvoicePreview.displayName = 'InvoicePreview';

export default InvoicePreview;