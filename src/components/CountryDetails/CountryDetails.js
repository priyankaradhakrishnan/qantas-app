import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import PageNotFound from "../PageNotFound/PageNotFound";
import CustomError from "../CustomError/CustomError";
import GetCountryListService from "../../services/GetCountryListService";
const CountryDetails = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
  const getDetails= GetCountryListService.getCountryListDetails(name)
      .then(response => {
        setCountry(response.data[0]);
      })
      .catch(error => {
        console.log(error);
        if (error) {
          if (error.message === '404') {
            return <PageNotFound />;
          } else {
            return <CustomError onRetry={() => window.location.reload()} />;
          }
        }
      });
  }, [name]);

  if (!country) {
    return <div><Box sx={{ display: 'flex' }} align="center">  <CircularProgress ></CircularProgress></Box></div>;
  }

  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
      <Typography variant="h4" gutterBottom>
      Country Details
      </Typography>
        </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 500 }}>
          <CardMedia
            component="img"
            height="200"
            image={country.flags.svg}
            alt={country.name.common}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {country.name.common}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ISO Code: {country.cca2}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Calling Code: {country.ccn3}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Timezones: {country.timezones.join(', ')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Currency: {country.status}
            </Typography>
            {/* add more information as desired */}
          </CardContent>
        </Card>
        <Button variant="contained" sx={{ marginTop: '16px' }} onClick={handleClick}>Back</Button>
      </Grid>
    </Grid>
  );
};

export default CountryDetails;
