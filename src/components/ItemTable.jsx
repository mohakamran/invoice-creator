import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const ItemTable = ({ items, setFormData, taxRate, discount }) => {

  const addItem = () => {
    setFormData(prevData => ({
      ...prevData,
      items: [
        ...(prevData.items || []),
        {
          id: Date.now(), // simple unique id
          name: "",
          quantity: 1,
          price: 0
        }
      ]
    }));
  };

  const deleteItem = (id) => {
    setFormData(prevData => ({
      ...prevData,
      items: (prevData.items || []).filter(item => item.id !== id)
    }));
  };

  const handleItemChange = (id, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      items: (prevData.items || []).map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Calculate Totals
  const safeItems = items || [];
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

  return (
    <div>
      <Typography variant="h6" gutterBottom color="primary">
        Items
      </Typography>
      
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Item Description</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', width: '100px' }}>Qty</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold', width: '120px' }}>Price</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold', width: '120px' }}>Total</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', width: '80px' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {safeItems.map((item) => (
              <TableRow 
                key={item.id}
                sx={{ 
                  '&:nth-of-type(odd)': { backgroundColor: 'action.hover' }
                }}
              >
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={item.name || ""}
                    onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                    placeholder="Item description"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    variant="outlined"
                    size="small"
                    value={item.quantity || 1}
                    onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                    inputProps={{ 
                      min: "1",
                      style: { textAlign: 'center' }
                    }}
                    sx={{ width: '80px' }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    variant="outlined"
                    size="small"
                    value={item.price || 0}
                    onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                    inputProps={{ 
                      min: "0", 
                      step: "0.01",
                      style: { textAlign: 'right' }
                    }}
                    sx={{ width: '120px' }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1" fontWeight="medium">
                    ${((item.quantity || 0) * (item.price || 0)).toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton 
                    aria-label="delete" 
                    color="error" 
                    onClick={() => deleteItem(item.id)}
                    disabled={safeItems.length === 1}
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            
            {/* Summary Row */}
            {safeItems.length > 0 && (
              <>
                <TableRow>
                  <TableCell rowSpan={4} />
                  <TableCell colSpan={2} align="right">
                    <Typography variant="body1" fontWeight="medium">
                      Subtotal:
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1" fontWeight="medium">
                      ${subtotal.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell />
                </TableRow>
                {safeDiscount > 0 && (
                  <TableRow>
                    <TableCell colSpan={2} align="right">
                      <Typography variant="body1">
                        Discount ({safeDiscount}%):
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" color="error">
                        -${discountAmount.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                )}
                <TableRow>
                  <TableCell colSpan={2} align="right">
                    <Typography variant="body1">
                      Tax ({safeTaxRate}%):
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1">
                      ${taxAmount.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell />
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} align="right">
                    <Typography variant="h6">
                      Total:
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" color="primary">
                      ${total.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Button
        startIcon={<Add />}
        onClick={addItem}
        variant="outlined"
        sx={{ mt: 2 }}
      >
        Add Item
      </Button>

      {safeItems.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No items added yet. Click "Add Item" to get started.
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default ItemTable;