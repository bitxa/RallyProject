import axios from "axios";

class ApiService {
  API_URL: String = "http://localhost:3000";

  async postData(data: Object, endpoint: String) {
    console.log(data);
    return axios.post(`${this.API_URL}/${endpoint}`, data);
  }

  async getData(endpoint: String) {
    return axios.get(`${this.API_URL}/${endpoint}`);
  }
}

const apiService = new ApiService();
export { apiService };
