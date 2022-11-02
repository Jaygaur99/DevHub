import { defineConfig } from 'cypress';

export default defineConfig({
    projectId: 'd4hrn4',
    e2e: {
        baseUrl: 'http://localhost:3000',
        video: false,
        screenshotOnRunFailure: false,
    },
    env: {
        apiUrl: 'http://localhost:4000/api/v1',
        userEmail: 'gmail@gmail.com',
        userPassword: 'Saurabh',
        codeboxUrl: '/code-box',
        meetpUrl: '/meetp',
        loginUrl: '/login',
        authenticateUrl: '/authenticate',
        activateUrl: '/activate',
        loginUrlBackend: '/user/login',
        allRoomsUrlBackend: '/room/rooms',
        singleRoomUrlBackend: '/room/single',
    },
});
