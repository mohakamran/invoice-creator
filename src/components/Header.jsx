import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert
} from '@mui/material';
import {
  ReceiptLong,
  LightMode,
  DarkMode,
  Download,
  Share
} from '@mui/icons-material';

const Header = ({ onToggleTheme, mode, onDownloadPDF, onShare }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleShareClick = () => {
    // Copy current URL to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          setSnackbarOpen(true);
        })
        .catch(() => {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = window.location.href;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          setSnackbarOpen(true);
        });
    } else {
      // Fallback for browsers without clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setSnackbarOpen(true);
    }
  };

  const handleExportClick = () => {
    if (onDownloadPDF) {
      onDownloadPDF();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={2}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden'
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 70, sm: 80 } }}>
          {/* Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <ReceiptLong 
              sx={{ 
                mr: 2, 
                fontSize: { xs: 28, sm: 32 },
                animation: 'pulse 2s infinite'
              }}
            />
            <Box>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  background: 'linear-gradient(45deg, #fff, #e3f2fd)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                InvoiceCraft
              </Typography>
              {!isMobile && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    opacity: 0.9,
                    color: 'rgba(255,255,255,0.8)'
                  }}
                >
                  Create Professional Invoices Instantly
                </Typography>
              )}
            </Box>
          </Box>

          {/* Features Chip */}
          {!isMobile && (
            <Chip
              icon={<Download />}
              label="Export to PDF"
              variant="outlined"
              onClick={handleExportClick}
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                mr: 2,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'scale(1.05)',
                  transition: 'all 0.2s ease-in-out'
                },
                '& .MuiChip-icon': {
                  color: 'white'
                }
              }}
            />
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              aria-label="share"
              onClick={handleShareClick}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'scale(1.1)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              <Share fontSize="small" />
            </IconButton>
            
            <IconButton
              color="inherit"
              aria-label="toggle theme"
              onClick={onToggleTheme}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'scale(1.1)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              {mode === 'light' ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
            </IconButton>
          </Box>
        </Toolbar>

        {/* Decorative Element */}
        <Box
          sx={{
            height: 3,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            width: '100%'
          }}
        />
      </AppBar>

      {/* Snackbar for share confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;