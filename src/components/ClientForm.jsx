import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Grid
} from '@mui/material';

const ClientForm = ({ to, onInputChange }) => {
  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom color="primary">
        Bill To
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Client Name"
            value={to?.clientName || ""}
            onChange={(e) => onInputChange('to', 'clientName', e.target.value)}
            variant="outlined"
            margin="normal"
            placeholder="John Doe or Company Name"
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Client Email"
            type="email"
            value={to?.clientEmail || ""}
            onChange={(e) => onInputChange('to', 'clientEmail', e.target.value)}
            variant="outlined"
            margin="normal"
            placeholder="client@example.com"
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Client Phone"
            value={to?.clientPhone || ""}
            onChange={(e) => onInputChange('to', 'clientPhone', e.target.value)}
            variant="outlined"
            margin="normal"
            placeholder="+1 (555) 123-4567"
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Client Address"
            multiline
            rows={3}
            value={to?.clientAddress || ""}
            onChange={(e) => onInputChange('to', 'clientAddress', e.target.value)}
            variant="outlined"
            margin="normal"
            placeholder="Street Address, City, State, ZIP Code"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ClientForm;