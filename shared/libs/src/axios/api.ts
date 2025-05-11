import axios from "axios";
import { axiosConfig } from "./config";

export const api = axios.create(axiosConfig);
