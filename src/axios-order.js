import axios from "axios";

const axiosInstances = axios.create({
     baseURL: "https://my-react-burger-ec96c.firebaseio.com/"
});
export default axiosInstances;