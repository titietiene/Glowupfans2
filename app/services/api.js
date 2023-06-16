import axios from 'axios';
import { routes, storageConstants } from '../constants';
import { getData, storeData, navigate, multiremove } from '../utils';
// import { auth } from './auth';


const API = axios.create({
    baseURL: 'https://laravel-api-sa0w.onrender.com/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});
// request header
API.interceptors.request.use(
    async (config) => {
        // //console.log(config, 'API interceptor request.use');
        const token = await getData(storageConstants.ACCESS_TOKEN);
        console.log(token, 'token check');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);


// API.interceptors.response.use(
//     (response) =>
//         // console.log(response, 'API interceptors response.use');
//         response,
//     (err) => new Promise(async (resolve, reject) => {
//         const originalReq = err.config;
//         if (
//             err.response
//             && err.response.data.message.includes('Invalid Credentials')
//         ) {
//             reject(err);
//         }
//         if (
//             err.response
//             && err.response.status === 401
//             && err.config
//             && !err.config._retry
//         ) {
//             originalReq._retry = true;


//             const res = await auth.refreshSession();
//             if (res.success && res.token) {
//                 originalReq.headers.Authorization = `Bearer ${res.token}`;
//                 resolve(axios(originalReq));
//                 return;
//             }
//             // error to be handled
//             logoutClean();
//             reject({ message: res.message, error: res.error });
//         }
//         // console.log(err.response.data, 'aako response result')
//         reject(err);
//     }),
// );


const logoutClean = async () => {
    try {
        await multiremove([
            storageConstants.ACCESS_TOKEN,
            storageConstants.PROFILE_DATA,
            storageConstants.USER_ID,
        ]);
        // navigate(routes.AUTHENTICATION, { screen: routes.LOGIN });
    } catch (e) {
        // console.log('signout error', e);
    }
};


export { API, logoutClean };



