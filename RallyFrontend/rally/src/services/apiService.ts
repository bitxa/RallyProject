import axios from "axios";

class ApiService {
  API_URL: String = "http://localhost:3000";

  async postData(data: Object, endpoint: String) {
    return axios.post(`${this.API_URL}/${endpoint}`, data);
  }
}

const apiService = new ApiService();
export { apiService };
