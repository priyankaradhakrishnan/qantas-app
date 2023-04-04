import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import GetCountryListService from "../../services/GetCountryListService";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PageNotFound from "../PageNotFound/PageNotFound";
import CustomError from "../CustomError/CustomError";

export const ListCountry = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = GetCountryListService.getCountryListValues()
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          if (error.message === "404") {
            return <PageNotFound />;
          } else {
            return <CustomError onRetry={() => window.location.reload()} />;
          }
        }
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCountries = filteredCountries.slice(startIndex, endIndex);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Country List
          </Typography>
          {loading && (
            <Box sx={{ display: "flex" }} align="center">
              <CircularProgress>Loading...</CircularProgress>
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Search Country"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <List sx={{ bgcolor: "background.paper" }}>
            {displayedCountries.map((country) => (
              <React.Fragment key={country.name.common}>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={country.flags.svg} />
                  </ListItemAvatar>

                  <ListItemText
                    primary={country.name.common}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Country code: {country.cca2},Calling Code:{" "}
                          {country.ccn3}, Timezones:{" "}
                          {country.timezones.join(", ")}{" "}
                        </Typography>{" "}
                        <Link
                          to={`/countries/${country.name.common}`}
                          underline="none"
                        >
                          <ListItemIcon
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button variant="outlined" endIcon={<SendIcon />}>
                              View Details
                            </Button>
                          </ListItemIcon>
                        </Link>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Grid>
        <Grid item xs={12}>
          <Pagination color="primary"
            count={Math.ceil(filteredCountries.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListCountry;
