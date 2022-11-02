describe('Navbar', () => {
    it('Navbar unauthenticated', () => {
        cy.visit('/');
        cy.clearCookies();

        // check logo and link
        cy.findByTestId('header-logo');
        cy.findByTestId('header-logo').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        // check codebox and link
        cy.findByTestId('codebox-button').should('exist');
        cy.contains('a', 'Code Box');
        cy.findByTestId('codebox-button').click();
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('loginUrl')}`,
        );
        cy.go('back');

        // check meetp and link
        cy.findByTestId('meetp-button').should('exist');
        cy.contains('a', 'Meetp');
        cy.findByTestId('meetp-button').click();
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('loginUrl')}`,
        );
        cy.go('back');

        // check signup and link
        cy.findByTestId('login-button').should('exist');
        cy.contains('a', 'Log in');
        cy.findByTestId('login-button').click();
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('loginUrl')}`,
        );
        cy.go('back');

        // check login and link
        cy.findByTestId('signup-button').should('exist');
        cy.contains('a', 'Sign Up');
        cy.findByTestId('signup-button').click();
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('authenticateUrl')}`,
        );
        cy.go('back');

        // not exits
        cy.findByTestId('logout-button').should('not.exist');
        cy.findByTestId('avatar-button').should('not.exist');
        cy.findByTestId('profile-wrapper').should('not.exist');
        cy.findByTestId('logout--menu-button').should('not.exist');
    });

    it('Navbar authenticated', () => {
        cy.login().then((user) => {
            cy.visit('/');

            // check logo and link
            cy.findByTestId('header-logo');
            cy.findByTestId('header-logo').click();
            cy.url().should('eq', `${Cypress.config().baseUrl}/`);

            // check codebox and link
            cy.findByTestId('codebox-button').should('exist');
            cy.contains('a', 'Code Box');
            cy.findByTestId('codebox-button').click();
            cy.url().should(
                'eq',
                `${Cypress.config().baseUrl}${Cypress.env('codeboxUrl')}`,
            );
            cy.go('back');

            // check meetp and link
            cy.findByTestId('meetp-button').should('exist');
            cy.contains('a', 'Meetp');
            cy.findByTestId('meetp-button').click();
            cy.url().should(
                'eq',
                `${Cypress.config().baseUrl}${Cypress.env('meetpUrl')}`,
            );
            cy.go('back');

            // check signup and link
            cy.findByTestId('login-button').should('not.exist');

            // check login and link
            cy.findByTestId('signup-button').should('not.exist');

            cy.findByTestId('logout-button').should('exist');
            cy.findByTestId('logout-button').should('contain', 'Logout');

            cy.findByTestId('avatar-button').should('exist');
            cy.findByTestId('user-avatar-header')
                .children('img')
                .should('have.attr', 'src', user.profile_photo.secure_url);

            cy.findByTestId('logout-menu-button').should(
                'have.css',
                'visibility',
                'hidden',
            );

            cy.findByTestId('avatar-button').click();
            cy.findByTestId('black-area-header').click();

            cy.findByTestId('logout-menu-button').should(
                'have.css',
                'visibility',
                'visible',
            );

            // check  logout link
            cy.findByTestId('avatar-button').click();
            cy.findByTestId('logout-menu-button').click();
            cy.url().should('eq', `${Cypress.config().baseUrl}/`);

            cy.findByTestId('logout-button').should('not.exist');
            cy.findByTestId('avatar-button').should('not.exist');
        });
    });
});
