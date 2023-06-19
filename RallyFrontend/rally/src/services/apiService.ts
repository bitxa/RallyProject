import axios from "axios";

class ApiService {
  API_URL: string = "http://localhost:3002";

  async postData(data: object, endpoint: string) {
    return axios.post(`${this.API_URL}/${endpoint}`, data);
  }

  async getData(endpoint: string) {
    return axios.get(`${this.API_URL}/${endpoint}`);
  }

  async deleteData(endpoint: string, id: string) {
    return axios.delete(`${this.API_URL}/${endpoint}/${id}`);
  }

  async patchData(data: any, endpoint: string) {
    return axios.put(`${this.API_URL}/${endpoint}`, data);
  }
}

const apiService = new ApiService();
export { apiService };
