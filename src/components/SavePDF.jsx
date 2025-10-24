import React, { useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Download,
  PictureAsPdf,
  CheckCircle
} from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import InvoicePreview from './InvoicePreview';

// Default invoice structure for SavePDF
const defaultInvoice = {
  invoiceDetails: {
    invoiceNumber: "#INV-0001"
  },
  to: {
    clientName: "Client Name"
  },
  items: []
};

const SavePDF = ({ invoice = defaultInvoice, open, onClose }) => {
  const invoiceRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const downloadPDF = async () => {
    setLoading(true);
    setSuccess(false);
    
    try {
      // Wait a bit for the DOM to update
      await new Promise(resolve => setTimeout(resolve, 100));

      const element = invoiceRef.current;
      if (!element) {
        throw new Error('Invoice element not found');
      }

      // Use html2canvas with better configuration
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;
      let pageNumber = 1;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pdfHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pdfHeight;
        pageNumber++;
      }

      const safeInvoice = invoice || defaultInvoice;
      const safeInvoiceDetails = safeInvoice.invoiceDetails || defaultInvoice.invoiceDetails;
      const fileName = `invoice_${safeInvoiceDetails.invoiceNumber || 'document'}.pdf`;
      
      // Save the PDF
      pdf.save(fileName);
      
      setSuccess(true);
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again. Make sure all images are loaded.');
    } finally {
      setLoading(false);
    }
  };

  // Safe data access
  const safeInvoice = invoice || defaultInvoice;
  const safeInvoiceDetails = safeInvoice.invoiceDetails || defaultInvoice.invoiceDetails;
  const safeTo = safeInvoice.to || defaultInvoice.to;
  const safeItems = safeInvoice.items || defaultInvoice.items;

  // Calculate total for summary
  const totalAmount = safeItems.reduce((sum, item) => {
    return sum + ((item.quantity || 0) * (item.price || 0));
  }, 0);

  return (
    <>
      {/* Hidden invoice preview for PDF generation */}
      <Box 
        sx={{ 
          position: 'fixed', 
          left: -10000, 
          top: 0,
          zIndex: -1000,
          opacity: 0
        }}
      >
        <Box ref={invoiceRef} sx={{ width: '794px' }}> {/* A4 width in pixels */}
          <InvoicePreview invoice={safeInvoice} />
        </Box>
      </Box>

      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <PictureAsPdf 
            sx={{ 
              fontSize: 48, 
              color: 'primary.main', 
              mb: 1,
              display: 'block',
              mx: 'auto'
            }} 
          />
          <Typography variant="h5" component="div" fontWeight="bold">
            Download Invoice
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: 'center' }}>
          {success ? (
            <Alert 
              icon={<CheckCircle fontSize="inherit" />} 
              severity="success"
              sx={{ mb: 2, justifyContent: 'center' }}
            >
              Invoice downloaded successfully!
            </Alert>
          ) : (
            <>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Your professional invoice will be generated as a PDF document. 
                This may take a few moments.
              </Typography>
              
              <Box sx={{ 
                mt: 2, 
                p: 2, 
                backgroundColor: 'grey.50', 
                borderRadius: 2,
                textAlign: 'left'
              }}>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                  Invoice Summary:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Invoice: {safeInvoiceDetails.invoiceNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Client: {safeTo.clientName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Items: {safeItems.length} item(s)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Total: ${totalAmount.toFixed(2)}
                </Typography>
              </Box>

              {loading && (
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                  <CircularProgress size={20} />
                  <Typography variant="body2" color="text.secondary">
                    Generating PDF...
                  </Typography>
                </Box>
              )}
            </>
          )}
        </DialogContent>
        
        <DialogActions sx={{ 
          justifyContent: 'center', 
          pb: 3, 
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Button 
            onClick={onClose} 
            variant="outlined"
            disabled={loading}
            sx={{ minWidth: 120 }}
          >
            {success ? 'Close' : 'Cancel'}
          </Button>
          <Button
            onClick={downloadPDF}
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} /> : <Download />}
            disabled={loading || success}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              minWidth: 140,
              '&:hover': {
                transform: loading ? 'none' : 'translateY(-1px)',
                boxShadow: loading ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.3)',
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {loading ? 'Generating...' : success ? 'Downloaded!' : 'Download PDF'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SavePDF;