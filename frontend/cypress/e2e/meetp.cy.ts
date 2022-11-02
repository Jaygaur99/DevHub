import { createRoomName } from '../support/generateRandom';

describe('Meetp', () => {
    it('Check UI Home Page', () => {
        cy.login().then((user) => {
            cy.visit(Cypress.env('meetpUrl'));
            cy.url().should(
                'eq',
                `${Cypress.config().baseUrl}${Cypress.env('meetpUrl')}`,
            );
            cy.contains('All rooms').should('exist');
            cy.findByTestId('start-room-button').should('exist');
            cy.findByTestId('start-room-button').should(
                'contain',
                'Start room',
            );
            cy.findByTestId('join-room-button').should('exist');
            cy.findByTestId('join-room-button').should('contain', 'Join room');

            cy.rooms().then((body) => {
                if (body.rooms.length > 0) {
                    cy.findAllByTestId('single-room').should(
                        'have.length',
                        body.rooms.length,
                    );
                    cy.findAllByTestId('single-room')
                        .first()
                        .contains(body.rooms[0].name);
                    cy.findAllByTestId('single-room')
                        .first()
                        .contains(body.rooms[0].speakers[0].name);
                    cy.findAllByTestId('single-room')
                        .first()
                        .contains(body.rooms[0].speakers.length);
                }
            });
        });
    });

    it('Check UI Create Room Button', () => {
        cy.login();
        cy.visit(Cypress.env('meetpUrl'));
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('meetpUrl')}`,
        );

        //
        cy.findByTestId('start-room-button').click();
        cy.findByTestId('create-room-modal').should('exist');
        cy.findByTestId('create-room-modal').should(
            'contain',
            'Enter the topic to be discussed',
        );
        cy.findByTestId('create-room-modal-close').click();
        cy.findByTestId('create-room-modal').should('not.exist');

        cy.findByTestId('start-room-button').click();
        cy.findByTestId('create-room-modal').find('input').should('exist');
        cy.findByTestId('create-room-modal')
            .findByPlaceholderText(`Enter room name`)
            .should('exist');
        cy.findByTestId('create-room-modal')
            .findByTestId('create-roomname-input')
            .should('exist');
        cy.findByTestId('create-room-modal').should('contain', `Room Type`);
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-open')
            .should('exist');
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-social')
            .should('exist');
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-private')
            .should('exist');
        cy.findByTestId('create-room-modal').find('button').contains('Lets Go');
        cy.findByTestId('create-room-modal').find('button').contains('Cancel');

        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-open')
            .should(
                'have.css',
                'box-shadow',
                'rgb(49, 130, 206) 0px 0px 0px 2px',
            );
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-social')
            .should(
                'have.css',
                'box-shadow',
                'rgba(0, 0, 0, 0) 0px 0px 0px 2px',
            );
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-private')
            .should(
                'have.css',
                'box-shadow',
                'rgba(0, 0, 0, 0) 0px 0px 0px 2px',
            );
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-social')
            .click();
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-open')
            .should(
                'have.css',
                'box-shadow',
                'rgba(0, 0, 0, 0) 0px 0px 0px 2px',
            );
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-social')
            .should(
                'have.css',
                'box-shadow',
                'rgb(49, 130, 206) 0px 0px 0px 2px',
            );
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-private')
            .should(
                'have.css',
                'box-shadow',
                'rgba(0, 0, 0, 0) 0px 0px 0px 2px',
            );
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-private')
            .click();

        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-open')
            .should(
                'have.css',
                'box-shadow',
                'rgba(0, 0, 0, 0) 0px 0px 0px 2px',
            );
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-social')
            .should(
                'have.css',
                'box-shadow',
                'rgba(0, 0, 0, 0) 0px 0px 0px 2px',
            );
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-private')
            .should(
                'have.css',
                'box-shadow',
                'rgb(49, 130, 206) 0px 0px 0px 2px',
            );

        cy.findByTestId('create-room-modal')
            .find('button')
            .contains('Cancel')
            .click();
        cy.findByTestId('create-room-modal').should('not.exist');
    });

    it('Check UI Join Room Button', () => {
        cy.login();
        cy.visit(Cypress.env('meetpUrl'));
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('meetpUrl')}`,
        );

        cy.findByTestId('join-room-button').click();
        cy.findByTestId('join-room-modal').should('exist');

        cy.findByTestId('join-room-modal')
            .should('contain', 'Join Room')
            .should('exist');

        cy.findByTestId('join-room-modal')
            .findByTestId('join-room-modal-close')
            .click();
        cy.findByTestId('join-room-modal').should('not.exist');
        cy.findByTestId('join-room-button').click();
        cy.findByTestId('join-room-modal').should('exist');

        cy.findByTestId('join-room-modal')
            .should('contain', 'Room Id')
            .should('exist');
        cy.findByTestId('join-room-modal')
            .findByPlaceholderText('Enter room id...')
            .should('exist');

        cy.findByTestId('join-room-modal')
            .should('contain', 'Confirm Password')
            .should('exist');
        cy.findByTestId('join-room-modal')
            .findByPlaceholderText('Enter room password...')
            .should('exist');
        cy.findByTestId('join-room-modal')
            .findByTestId('create-roomid-input')
            .should('exist');
        cy.findByTestId('join-room-modal')
            .findByTestId('create-roompassword-input')
            .should('exist');

        cy.findByTestId('join-room-modal')
            .find('button')
            .contains('Join Room')
            .should('exist');
        cy.findByTestId('join-room-modal')
            .findByTestId('join-room-submit-button')
            .should('exist');
        cy.findByTestId('join-room-modal')
            .find('button')
            .contains('Cancel')
            .should('exist');
        cy.findByTestId('join-room-modal')
            .findByTestId('cancel-join-room-button')
            .should('exist');
        cy.findByTestId('join-room-modal')
            .find('button')
            .contains('Cancel')
            .click();
        cy.findByTestId('join-room-modal').should('not.exist');
    });

    it('Create Room Invalid Form', () => {
        cy.login();
        cy.visit(Cypress.env('meetpUrl'));
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('meetpUrl')}`,
        );

        cy.findByTestId('start-room-button').click();
        cy.findByTestId('create-room-modal')
            .find('button')
            .contains('Lets Go')
            .click();
        cy.contains('Enter a valid name').should('exist');
        cy.findByTestId('create-room-modal')
            .find('button')
            .contains('Cancel')
            .click();
    });

    it('Join Room Invalid Form', () => {
        cy.login();
        cy.visit(Cypress.env('meetpUrl'));
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('meetpUrl')}`,
        );
        cy.findByTestId('join-room-button').click();
        cy.findByTestId('join-room-modal')
            .find('button')
            .contains('Join Room')
            .click();
        cy.contains('Fill all details').should('exist');
    });

    it.skip('Create Room Form', () => {
        const roomName = createRoomName();

        cy.login();
        cy.visit(Cypress.env('meetpUrl'));
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('meetpUrl')}`,
        );

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

        cy.wait('@createRoomRequest').then(({ request, response }) => {
            cy.findByTestId('create-room-modal')
                .contains('Room link and password')
                .should('exist');
            cy.contains('Room Links').should('exist');

            // cy.findByTestId('create-room-modal').contains(
            //     `${Cypress.config().baseUrl}${Cypress.env('meetpUrl')}/${
            //         response.body.room.room_id
            //     }`,
            // );

            cy.findByTestId('create-room-modal')
                .findByTestId('qr-code-box')
                .should('exist');
            cy.findByTestId('create-room-modal')
                .findByTestId('whatsapp-box')
                .should('exist');
            cy.findByTestId('create-room-modal')
                .findByTestId('twitter-box')
                .should('exist');
            cy.findByTestId('create-room-modal')
                .findByTestId('telegram-box')
                .should('exist');

            cy.findByTestId('create-room-modal')
                .findByTestId('qr-code-box')
                .click();
            cy.findByTestId('qr-code-image').should(
                'have.attr',
                'src',
                // @ts-ignore
                `${response.body.room.qrcode.secure_url}`,
            );

            cy.findByTestId('close-qr-modal').click();
            cy.findByTestId('create-room-modal')
                .findByTestId('close-share-modal')
                .click();
        });
    });
});
