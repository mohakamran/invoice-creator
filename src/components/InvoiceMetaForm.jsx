import React from 'react';
import {
    Paper,
    Typography,
    TextField,
    Grid,
    InputAdornment
} from '@mui/material';

const InvoiceMetaForm = ({ details, onInputChange, taxRate, discount }) => {

    // Debug the incoming props
    console.log('InvoiceMetaForm props:', { taxRate, discount, details });

    const handleTaxRateChange = (e) => {
        const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
        console.log('Setting tax rate to:', value);
        onInputChange('taxRate', null, value);
    };

    const handleDiscountChange = (e) => {
        const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
        console.log('Setting discount to:', value);
        onInputChange('discount', null, value);
    };

    return (
        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">
                Invoice Details
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Invoice Number"
                        value={details?.invoiceNumber || ""}
                        onChange={(e) => onInputChange('invoiceDetails', 'invoiceNumber', e.target.value)}
                        variant="outlined"
                        margin="normal"
                        placeholder="#INV-0001"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Invoice Date"
                        type="date"
                        value={details?.date || ""}
                        onChange={(e) => onInputChange('invoiceDetails', 'date', e.target.value)}
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Due Date"
                        type="date"
                        value={details?.dueDate || ""}
                        onChange={(e) => onInputChange('invoiceDetails', 'dueDate', e.target.value)}
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                <TextField
                    fullWidth
                    label="Tax Rate"
                    type="number"
                    value={taxRate}
                    onChange={handleTaxRateChange}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                />

                <TextField
                    fullWidth
                    label="Discount"
                    type="number"
                    value={discount}
                    onChange={handleDiscountChange}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                />

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Notes / Terms & Conditions"
                        multiline
                        rows={3}
                        value={details?.notes || ""}
                        onChange={(e) => onInputChange('invoiceDetails', 'notes', e.target.value)}
                        variant="outlined"
                        margin="normal"
                        placeholder="Payment terms, thank you note, or additional information..."
                    />
                </Grid>
            </Grid>

            {/* Debug info */}
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Component Debug: Tax Rate: {taxRate}%, Discount: {discount}%
            </Typography>
        </Paper>
    );
};

export default InvoiceMetaForm;