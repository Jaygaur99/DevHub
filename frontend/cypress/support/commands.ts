declare namespace Cypress {
    interface Chainable {
        login(): Cypress.Chainable<{
            createdAt: string;
            email: string;
            user_id: string;
            _id: string;
            mobile: string;
            activated: boolean;
            name: string;
            profile_photo: {
                id: string;
                secure_url: string;
            };
            username: string;
        }>;
        rooms(): Cypress.Chainable<{
            rooms: Array<{
                _id: string;
                name: string;
                creator: {
                    email: string;
                    name: string;
                    profile_photo: {
                        id: string;
                        secure_url: string;
                    };
                    user_id: string;
                    username: string;
                    _id: string;
                };
                room_id: string;
                type: 'OPEN' | 'SOCIAL' | 'PRIVATE';
                speakers: Array<{
                    email: string;
                    name: string;
                    profile_photo: {
                        id: string;
                        secure_url: string;
                    };
                    user_id: string;
                    username: string;
                    _id: string;
                }>;
                password?: string;
                createdAt: Date;
                qrcode: {
                    id: string;
                    secure_url: string;
                };
            }>;
        }>;
        singleRoom(room_id: string): Cypress.Chainable<{
            _id: string;
            name: string;
            creator: {
                email: string;
                name: string;
                profile_photo: {
                    id: string;
                    secure_url: string;
                };
                user_id: string;
                username: string;
                _id: string;
            };
            room_id: string;
            type: 'OPEN' | 'SOCIAL' | 'PRIVATE';
            speakers: Array<{
                email: string;
                name: string;
                profile_photo: {
                    id: string;
                    secure_url: string;
                };
                user_id: string;
                username: string;
                _id: string;
            }>;
            password?: string;
            createdAt: Date;
            qrcode: {
                id: string;
                secure_url: string;
            };
        }>;
    }
}

Cypress.Commands.add('login', () => {
    cy.request({
        url: `${Cypress.env('apiUrl')}${Cypress.env('loginUrlBackend')}`,
        method: 'POST',
        body: {
            email: Cypress.env('userEmail'),
            password: Cypress.env('userPassword'),
            userType: 'EMAIL',
        },
    }).then((response) => ({
        ...response.body.user,
    }));
});

Cypress.Commands.add('rooms', () => {
    cy.request({
        url: `${Cypress.env('apiUrl')}${Cypress.env('allRoomsUrlBackend')}`,
    }).then((response) => ({
        ...response.body,
    }));
});

Cypress.Commands.add('singleRoom', (room_id: string) => {
    cy.request({
        url: `${Cypress.env('apiUrl')}${Cypress.env(
            'singleRoomUrlBackend',
        )}/${room_id}`,
    }).then((response) => ({
        ...response.body.room,
    }));
});
