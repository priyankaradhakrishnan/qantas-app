import React from 'react';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
const NetworkError = ({ onRetry }) => {
  return (
    <div style={{ textAlign: 'center', paddingTop: 50 }}>
      <Typography variant="h4" gutterBottom>
        Network Error
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Oops! Something went wrong. Please check your internet connection and try again.
      </Typography>
      <Button variant="contained" color="primary" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
};

export default NetworkError;
