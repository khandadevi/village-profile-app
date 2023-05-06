import axios from "axios";
import { IUser } from "../db/models/UserModel";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const server = `${process.env.REACT_APP_SERVER}`;
const api = {
  loadWada: (office_id: String, user_id: String) => axios.get(`${server}wards/`, {params: {office_id: office_id, user_id: user_id}}),
  loadWadaByUser: (office_id:String, user_id: String) => axios.get(`${server}wards/`, {params: {office_id: office_id, user_id:user_id}}),
  loadSabikWada: (office_id: String) => axios.get(`${server}sabik-wards/`, {params: {office_id: office_id}}),
  loadMarga: (office_id: String) => axios.get(`${server}margas/`, {params: {office_id: office_id}}),
  loadBasti: (office_id: String) => axios.get(`${server}bastis/`, {params: {office_id: office_id}}),
  loadJaati: () => axios.get(`${server}jaatis/`),
  loadJaatiSamuhas: () => axios.get(`${server}jaati-samuhas/`),
  loadCountry: () => axios.get(`${server}countries/`),
  loadCountrySamuhas: () => axios.get(`${server}country-samuhas/`),
  loadMotherTongues: () => axios.get(`${server}mother-tongues/`),
  loadDharma: () => axios.get(`${server}dharmas/`),
  loadOccupations: () => axios.get(`${server}occupations/`),
  loadTechnicalSkills: () => axios.get(`${server}technical-skills/`),
  login: (auth: IUser) => axios.post(`${server}login/`, { data: auth }),
  loginJsonServer: () => axios.get(`${server}login/`),
  
  postHousehold: (data: any) => axios.post(`${server}post-household/`, { data }),
};

export default api;
