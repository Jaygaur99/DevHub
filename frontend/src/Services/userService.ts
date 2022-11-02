import Axios from './Axios';

const checkEmail = (email: string) => Axios.post('/verify/email', { email });

const checkMobile = (mobile: string) =>
    Axios.post('/verify/mobile', { mobile });

const authenticateUser = (
    email: string,
    mobile: string,
    password: string,
    userType: 'MOBILE' | 'EMAIL',
) =>
    Axios.post('/user/authenticate', {
        email,
        mobile,
        password,
        userType,
    });

const checkUsername = (username: string) =>
    Axios.post('/verify/username', { username });

const activateUser = (name: string, avatar: string, username: string) =>
    Axios.post('/user/activate', { name, avatar, username });

const verifyEmail = (email: string) => Axios.post('/user/email', { email });

const verifyMobile = (mobile: string) => Axios.post('/user/mobile', { mobile });

const loginUser = (
    email: string,
    mobile: string,
    password: string,
    userType: 'MOBILE' | 'EMAIL',
) => Axios.post('/user/login', { email, mobile, password, userType });

const logoutUser = () => Axios.get('/user/logout');

export {
    checkEmail,
    checkMobile,
    authenticateUser,
    checkUsername,
    activateUser,
    verifyEmail,
    verifyMobile,
    loginUser,
    logoutUser,
};
