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

  async deleteData(endpoint: any, id: any) {
    return axios.delete(`${this.API_URL}/${endpoint}/${id}`);
  }
}

const apiService = new ApiService();
export { apiService };
