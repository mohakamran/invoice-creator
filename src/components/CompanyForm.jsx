import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Grid
} from '@mui/material';

const CompanyForm = ({ from, onInputChange }) => {
  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom color="primary">
        Your Company Details
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Company Name"
            value={from?.companyName || ""}
            onChange={(e) => onInputChange('from', 'companyName', e.target.value)}
            variant="outlined"
            placeholder="Enter your company name"
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={from?.email || ""}
            onChange={(e) => onInputChange('from', 'email', e.target.value)}
            variant="outlined"
            placeholder="company@email.com"
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            value={from?.phone || ""}
            onChange={(e) => onInputChange('from', 'phone', e.target.value)}
            variant="outlined"
            placeholder="+1 (555) 123-4567"
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            multiline
            rows={2}
            value={from?.address || ""}
            onChange={(e) => onInputChange('from', 'address', e.target.value)}
            variant="outlined"
            placeholder="123 Main Street, City, State, ZIP Code"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CompanyForm;