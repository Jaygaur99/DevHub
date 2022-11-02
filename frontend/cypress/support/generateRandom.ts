import { faker } from '@faker-js/faker';

export const createRandomUser = (): {
    name: string;
    email: string;
    password: string;
    username: string;
} => ({
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.lorem.word(),
});

export const createRoomName = (): {
    roomName: string;
} => ({
    roomName: faker.lorem.word(),
});
