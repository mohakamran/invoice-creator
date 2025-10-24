import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles, Container, Paper, Grid, Button, Box, Typography } from '@mui/material';
import { Download } from '@mui/icons-material';
import Header from './components/Header';
import CompanyForm from './components/CompanyForm';
import ClientForm from './components/ClientForm';
import InvoiceMetaForm from './components/InvoiceMetaForm';
import ItemTable from './components/ItemTable';
import InvoicePreview from './components/InvoicePreview';
import SavePDF from './components/SavePDF';

function App() {
  const [mode, setMode] = useState('light');
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);

  // Create theme with mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#1565c0' : '#90caf9',
          },
          secondary: {
            main: mode === 'light' ? '#7b1fa2' : '#ce93d8',
          },
          background: {
            default: mode === 'light' ? '#f8f9fa' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 8,
                }
              }
            }
          }
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handleDownloadPDF = () => {
    setPdfDialogOpen(true);
  };

  // State for all form data
  const [formData, setFormData] = useState({
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
      invoiceNumber: `#INV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: "",
      notes: "Thank you for your business! Payment is due within 15 days.",
    },
    items: [
      {
        id: 1,
        name: "Web Design Services",
        quantity: 1,
        price: 750
      },
      {
        id: 2,
        name: "Hosting (1 Year)",
        quantity: 1,
        price: 120
      }
    ],
    taxRate: 10,
    discount: 0, // Added discount field
  });

  // FIXED: Proper state update function
  const handleInputChange = (section, field, value) => {
    console.log('Updating - Section:', section, 'Field:', field, 'Value:', value);

    setFormData(prevData => {
      if (section === 'from' || section === 'to' || section === 'invoiceDetails') {
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [field]: value
          }
        };
      } else {
        // For top-level fields like taxRate, discount
        return {
          ...prevData,
          [field]: value
        };
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
            '100%': { transform: 'scale(1)' },
          },
          body: {
            overflowX: 'hidden',
            margin: 0,
            padding: 0
          }
        }}
      />

      <Header
        onToggleTheme={toggleTheme}
        mode={mode}
        onDownloadPDF={handleDownloadPDF}
      />

      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* Left Column - Forms */}
          <Grid item xs={12} lg={6}>
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <CompanyForm
                from={formData.from}
                onInputChange={handleInputChange}
              />
            </Paper>

            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <ClientForm
                to={formData.to}
                onInputChange={handleInputChange}
              />
            </Paper>

            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <InvoiceMetaForm
                details={formData.invoiceDetails}
                onInputChange={handleInputChange}
                taxRate={formData.taxRate}
                discount={formData.discount}
              />
            </Paper>

            <Paper elevation={1} sx={{ p: 3 }}>
              <ItemTable
                items={formData.items}
                setFormData={setFormData}
                taxRate={formData.taxRate}
                discount={formData.discount}
              />
            </Paper>

            {/* Download PDF Button - Mobile */}
            <Box sx={{ textAlign: 'center', mt: 3, display: { xs: 'block', lg: 'none' } }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Download />}
                onClick={handleDownloadPDF}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                  }
                }}
              >
                Download PDF
              </Button>
            </Box>

            {/* Debug Section */}
            {/* <Paper elevation={1} sx={{ p: 2, mt: 2, backgroundColor: '#e8f5e8' }}>
              <Typography variant="subtitle2" color="success.dark" gutterBottom>
                Live State Debug:
              </Typography>
              <Typography variant="body2" color="success.dark">
                Tax Rate: <strong>{formData.taxRate}%</strong> |
                Discount: <strong>{formData.discount}%</strong>
              </Typography>
            </Paper> */}
          </Grid>

          {/* Right Column - Preview */}
          <Grid item xs={12} lg={6}>
            <InvoicePreview invoice={formData} />
          </Grid>
        </Grid>
      </Container>

      {/* PDF Download Dialog */}
      <SavePDF
        invoice={formData}
        open={pdfDialogOpen}
        onClose={() => setPdfDialogOpen(false)}
      />
    </ThemeProvider>
  );
}

export default App;