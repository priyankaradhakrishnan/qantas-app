import axios from 'axios';
import memoryCache from 'memory-cache';
import { BASEURL,DETAILS_URL } from '../constants/constants';

class GetCountryListService {
  constructor() {
    this.api = axios.create({
      adapter: require('axios-cache-adapter').setupCache({
        maxAge: 15 * 60 * 1000, // Cache responses for 15 minutes
        store: memoryCache, // Use the memory cache
      }).adapter,
    });
  }

  getCountryListValues() {
    return this.api.get(BASEURL, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }

  getCountryListDetails(name) {
    return this.api.get(DETAILS_URL+`${name}?fullText=true`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }
}

export default new GetCountryListService();
