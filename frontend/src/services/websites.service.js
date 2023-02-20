import axios from "axios";

const API_URL = "/api/websites/";

const getWebsites = () => {
  return axios.get(API_URL + "show");
};

const uploadWebsite = () => {
  return axios.post(API_URL + "uplad");
};

const deleteWebsite = () => {
  return axios.delete(API_URL + "delete");
};


const WebsiteService = {
    deleteWebsite,
    uploadWebsite,
    getWebsites
}
export default WebsiteService;