describe('Home Page', () => {
    it('Check Home Unauth', () => {
        cy.visit('/');
        cy.clearCookies();

        cy.contains('Talk to').should('exist');
        cy.contains('Code').should('exist');

        cy.findByTestId('header-title').should('exist');
        cy.findByTestId('header-title').should(
            'have.text',
            `Where teams build faster , together`,
        );
        cy.contains(
            `Create, and share with collaborative code platform for rapid web development.`,
        ).should('exist');

        cy.findByTestId('header-logo-cpp').should('exist');
        cy.findByTestId('header-logo-javascript').should('exist');
        cy.findByTestId('header-logo-react').should('exist');
        cy.findByTestId('header-logo-python').should('exist');

        cy.findByTestId('header-button').should('exist');
        cy.findByTestId('header-button')
            .find('button')
            .should('have.text', '</> Start coding now');
        cy.findByTestId('header-button').find('button').click();
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('loginUrl')}`,
        );
        cy.go('back');

        cy.contains(`The best experience`).should('exist');
        cy.findByTestId('header-cards-one').should('exist');
        cy.findByTestId('header-cards-one')
            .contains(`Knowledge sharing`)
            .should('exist');
        cy.findByTestId('header-cards-one').contains(
            `Use code, apps, and templates collectively. Learn from each other and bake-in best practices`,
        );
        cy.findByTestId('header-cards-two').should('exist');
        cy.findByTestId('header-cards-two')
            .contains('Supercharged with npm')
            .should('exist');
        cy.findByTestId('header-cards-two').contains(
            'Use private packages, or any of the 1M+ public ones, to build powerful apps quickly.',
        );
        cy.findByTestId('header-cards-three').should('exist');
        cy.findByTestId('header-cards-three')
            .contains('Optimized for React')
            .should('exist');
        cy.findByTestId('header-cards-three').contains(
            'Custom environments built specifically for React, HTML/CSS, Javascript, CPP, TSX and many more.',
        );

        cy.findByTestId('room-title')
            .contains('Where people meet and chat togther')
            .should('exist');
        cy.findByTestId('room-title')
            .contains(
                'Listen , speak , chat and share memories with anyone in just one click',
            )
            .should('exist');

        cy.findByTestId('room-section-button').find('button').should('exist');
        cy.findByTestId('room-section-button')
            .find('button')
            .should('have.text', 'Create your room now');
        cy.findByTestId('room-section-button').find('button').click();
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('loginUrl')}`,
        );
        cy.go('back');

        cy.findByTestId('social-github').should('exist');
        cy.findByTestId('social-github').should(
            'have.attr',
            'href',
            'https://www.github.com/1SAURABHKUMAR1',
        );

        cy.findByTestId('social-twitter').should('exist');
        cy.findByTestId('social-twitter').should(
            'have.attr',
            'href',
            'https://www.twitter.com/1SAURABHKUMAR1',
        );

        cy.findByTestId('social-linkedin').should('exist');
        cy.findByTestId('social-linkedin').should(
            'have.attr',
            'href',
            'https://www.linkedin.com/in/1saurabhkumar1/',
        );
    });

    it('Check Authenticated', () => {
        cy.login();
        cy.visit('/');

        cy.findByTestId('header-button').find('button').click();
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('codeboxUrl')}`,
        );
        cy.go('back');

        cy.findByTestId('room-section-button').find('button').click();
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('meetpUrl')}`,
        );
        cy.go('back');
    });
});
