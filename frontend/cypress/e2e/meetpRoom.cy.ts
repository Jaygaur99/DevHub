import { createRoomName } from '../support/generateRandom';

describe('Meetp Room', () => {
    it.only('', () => {
        const roomName = createRoomName();

        cy.login().then((user) => {
            cy.visit(Cypress.env('meetpUrl'));

            cy.findByTestId('start-room-button').click();
            cy.findByTestId('create-room-modal')
                .findByTestId('create-roomname-input')
                .type(roomName.roomName);
            cy.intercept({ method: 'POST', url: '**/room/create' }).as(
                'createRoomRequest',
            );
            cy.findByTestId('create-room-modal')
                .find('button')
                .contains('Lets Go')
                .click();
            cy.findByTestId('create-room-modal')
                .findByTestId('close-share-modal')
                .click();

            cy.wait('@createRoomRequest').then(({ request, response }) => {
                cy.findByTestId('join-room-button').click();

                cy.findByTestId('create-roomid-input')
                    // @ts-ignore
                    .type(response.body.room.room_id);

                cy.findByTestId('join-room-submit-button').click();

                cy.url().should(
                    'eq',
                    `${Cypress.config().baseUrl}${Cypress.env('meetpUrl')}/${
                        // @ts-ignore
                        response.body.room.room_id
                    }`,
                );
            });

            cy.location().then((url) => {
                cy.singleRoom(url.pathname.split('/').at(-1) as string).then(
                    (room) => {
                        cy.contains('All rooms').should('exist');
                        cy.findByTestId('room-name').should(
                            'contain',
                            room.name,
                        );
                        cy.contains('Mute').should('exist');
                        cy.findByTestId('mute-button').should('exist');
                        cy.contains('Leave').should('exist');
                        cy.findByTestId('leave-button').should('exist');
                        cy.contains('Chat').should('exist');
                        cy.findByTestId('chat-box-button').should('exist');
                    },
                );
            });

            // TODO: chat box
        });
    });
});
