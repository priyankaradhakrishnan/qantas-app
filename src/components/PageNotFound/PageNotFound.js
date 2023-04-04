import React from 'react';
import Typography from "@mui/material/Typography";
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
const PageNotFound = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: 50 }}>
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Oops! Page not found
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go back to homepage
      </Button>
    </div>
  );
};

export default PageNotFound;
