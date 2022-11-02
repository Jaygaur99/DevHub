import { createRandomUser } from '../support/generateRandom';

describe('Authenticate', () => {
    it('Signin UI', () => {
        const randomUser = createRandomUser();

        cy.clearCookies();
        cy.visit(Cypress.env('authenticateUrl'));

        cy.findByTestId('welcome-card').should('exist');
        cy.findByTestId('welcome-card').should(
            'contain',
            `Welcome to Devhouse!`,
        );
        cy.findByTestId('welcome-card').should(
            'contain',
            `Devhouse i nearly ready and some more features are adding in. Enjoy`,
        );
        cy.findByTestId('welcome-card')
            .find('button')
            .should('contain', 'Get your username');

        cy.findByTestId('welcome-card').should(
            'contain',
            'Have an invite text?',
        );
        cy.findByTestId('welcome-card').find('a').should('contain', 'Sign in');
        cy.findByTestId('welcome-card').find('a').click();

        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('loginUrl')}`,
        );
        cy.go('back');

        cy.findByTestId('welcome-card').find('button').click();
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('authenticateUrl')}`,
        );

        //
        cy.findByTestId('authenticate-card').should('exist');
        cy.findByTestId('authenticate-card').should(
            'contain',
            `Enter your email id`,
        );
        cy.findByTestId('authenticate-card')
            .findByPlaceholderText('devhouse@gmail.com')
            .should('exist');
        cy.findByTestId('authenticate-card').find('input').should('exist');

        cy.findByTestId('authenticate-card').find('button').should('exist');
        cy.findByTestId('authenticate-card')
            .find('button')
            .should('contain', 'Next');

        cy.findByTestId('authenticate-card').should(
            'contain',
            `By entering your email, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!`,
        );

        cy.findByTestId('authenticate-card')
            .find('input')
            .type(randomUser.email);
        cy.findByTestId('authenticate-card')
            .find('button')
            .contains('Next')
            .click();

        //
        cy.findByTestId('authenticate-password-card').should('exist');
        cy.findByTestId('authenticate-password-card').should(
            'contain',
            `Create new password`,
        );
        cy.findByTestId('authenticate-password-card')
            .findAllByPlaceholderText('Enter password')
            .should('exist');

        cy.findByTestId('authenticate-password-card').should(
            'contain',
            'Password',
        );
        cy.findByTestId('authenticate-password-card').should(
            'contain',
            'Confirm Password',
        );
        cy.findByTestId('authenticate-password-card')
            .find('button')
            .should('contain', 'Next');

        cy.findByTestId('password-input').type(randomUser.password);
        cy.findByTestId('confirm-password-input').type(randomUser.password);

        cy.findByTestId('authenticate-password-card').find('button').click();

        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('activateUrl')}`,
        );

        //
        cy.findByTestId('activate-full-name-card').should('exist');
        cy.findByTestId('activate-full-name-card').should(
            'contain',
            `What's your full name?`,
        );
        cy.findByTestId('activate-full-name-card')
            .find('input')
            .should('exist');
        cy.findByTestId('activate-full-name-card')
            .findByPlaceholderText('Your fullname')
            .should('exist');
        cy.findByTestId('activate-full-name-card')
            .findByPlaceholderText('Your fullname')
            .type(randomUser.name);
        cy.findByTestId('activate-full-name-card').should(
            'contain',
            'People use their real names at devhouse',
        );
        cy.findByTestId('activate-full-name-card')
            .find('button')
            .should('contain', 'Next');

        cy.findByTestId('activate-full-name-card').find('button').click();

        //
        cy.findByTestId('activate-avatar-card').should('exist');
        cy.findByTestId('activate-avatar-card').should(
            'contain',
            `Okay, ${randomUser.name}`,
        );
        cy.findByTestId('activate-avatar-card').should(
            'contain',
            `How's this photo?`,
        );
        cy.findByTestId('activate-avatar-card')
            .findByTestId('activate-user-avatar')
            .should('exist');
        cy.findByTestId('activate-avatar-card').find('input').should('exist');
        cy.findByTestId('activate-avatar-card').contains(
            'Choose a different photo',
        );
        cy.findByTestId('activate-avatar-card')
            .find('button')
            .should('contain', 'Next');
        cy.findByTestId('activate-avatar-card').find('button').click();

        //
        cy.findByTestId('activate-username-card').should('exist');
        cy.findByTestId('activate-username-card').should(
            'contain',
            `Pick a username`,
        );
        cy.findByTestId('activate-username-card').should(
            'contain',
            `Username can be used for login`,
        );
        cy.findByTestId('activate-username-card').find('input').should('exist');
        cy.findByTestId('activate-username-card')
            .findByPlaceholderText('@')
            .should('exist');
        cy.findByTestId('activate-username-card')
            .findByPlaceholderText('@')
            .type(randomUser.username);
        cy.findByTestId('activate-username-card')
            .find('button')
            .should('contain', 'Next');
    });

    it('Invalid Signin Check Toasts', () => {
        const randomUser = createRandomUser();

        cy.clearCookies();
        cy.visit(Cypress.env('authenticateUrl'));

        cy.findByTestId('welcome-card').find('button').click();

        cy.findByTestId('authenticate-card').find('button').first().click();
        cy.contains('Email is not valid').should('exist');
        cy.findByTestId('authenticate-card')
            .find('input')
            .type(randomUser.email);
        cy.findByTestId('authenticate-card').find('button').first().click();

        cy.findByTestId('authenticate-password-card').find('button').click();
        cy.contains('Password should be greater than 6').should('exist');
        cy.findByTestId('password-input').type(randomUser.password);
        cy.findByTestId('confirm-password-input').type(randomUser.password);
        cy.findByTestId('authenticate-password-card').find('button').click();

        cy.findByTestId('activate-full-name-card').find('button').click();
        cy.contains('Enter a valid name').should('exist');
        cy.findByTestId('activate-full-name-card')
            .findByPlaceholderText('Your fullname')
            .type(randomUser.name);
        cy.findByTestId('activate-full-name-card').find('button').click();

        cy.findByTestId('activate-avatar-card').find('button').click();

        cy.findByTestId('activate-username-card').find('button').click();
        cy.contains('Fill Valid Username').should('exist');
    });

    it.skip('Valid Signup', () => {
        const randomUser = createRandomUser();

        cy.clearCookies();
        cy.visit(Cypress.env('authenticateUrl'));

        cy.findByTestId('welcome-card').find('button').click();

        cy.findByTestId('authenticate-card')
            .find('input')
            .type(randomUser.email);
        cy.findByTestId('authenticate-card').find('button').first().click();

        cy.findByTestId('password-input').type(randomUser.password);
        cy.findByTestId('confirm-password-input').type(randomUser.password);
        cy.findByTestId('authenticate-password-card').find('button').click();

        cy.findByTestId('activate-full-name-card')
            .findByPlaceholderText('Your fullname')
            .type(randomUser.name);
        cy.findByTestId('activate-full-name-card').find('button').click();

        cy.findByTestId('activate-avatar-card')
            .find('input')
            .attachFile('avatar.jpg');
        cy.findByTestId('activate-avatar-card').find('button').click();

        cy.findByTestId('activate-username-card')
            .findByPlaceholderText('@')
            .type(randomUser.name);
        cy.findByTestId('activate-username-card').find('button').click();

        cy.findByTestId('activate-card').should('exist');
        cy.findByTestId('activate-spinner').should('exist');
        cy.findByTestId('activate-card').contains('Activation in progress ...');

        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('codeboxUrl')}`,
        );
        cy.contains('Code Box').should('exist');
        cy.contains('Meetp').should('exist');
        cy.contains('Logout').should('exist');
    });

    it('Login Ui', () => {
        cy.clearCookies();
        cy.visit(Cypress.env('loginUrl'));

        //
        cy.findByTestId('login-phone-email-card').should('exist');
        cy.findByTestId('login-phone-email-card').should(
            'contain',
            `Enter your email id to login`,
        );
        cy.findByTestId('login-phone-email-card').should(
            'contain',
            `By entering your email, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!`,
        );
        cy.findByTestId('login-phone-email-card').find('input').should('exist');
        cy.findByTestId('login-phone-email-card')
            .findByPlaceholderText('devhouse@gmail.com')
            .should('exist');
        cy.findByTestId('login-phone-email-card')
            .find('button')
            .should('exist');
        cy.findByTestId('login-phone-email-card')
            .find('button')
            .should('contain', 'Next');
        cy.findByTestId('login-phone-email-card')
            .find('input')
            .type(Cypress.env('userEmail'));
        cy.findByTestId('login-phone-email-card')
            .find('button')
            .contains('Next')
            .click();

        //
        cy.findByTestId('login-password-card').should('exist');
        cy.findByTestId('login-password-card').should('contain', `Password`);
        cy.findByTestId('login-password-card').find('input').should('exist');
        cy.findByTestId('login-password-card')
            .findByPlaceholderText('Enter password')
            .should('exist');
        cy.findByTestId('login-password-card').find('button').should('exist');
        cy.findByTestId('login-password-card')
            .find('button')
            .should('contain', 'Next');
    });

    it('Invalid Login', () => {
        cy.clearCookies();
        cy.visit(Cypress.env('loginUrl'));

        //
        cy.findByTestId('login-phone-email-card')
            .find('button')
            .contains('Next')
            .click();
        cy.contains(`Email is not valid`).should('exist');
        cy.findByTestId('login-phone-email-card')
            .find('input')
            .type(Cypress.env('userEmail'));
        cy.findByTestId('login-phone-email-card')
            .find('button')
            .contains('Next')
            .click();

        //
        cy.findByTestId('login-password-card').find('button').click();
        cy.contains(`Password should be greater than 6`).should('exist');
    });

    it('Valid Login', () => {
        cy.clearCookies();
        cy.visit(Cypress.env('loginUrl'));

        //
        cy.findByTestId('login-phone-email-card')
            .find('input')
            .type(Cypress.env('userEmail'));
        cy.findByTestId('login-phone-email-card')
            .find('button')
            .contains('Next')
            .click();

        //
        cy.findByTestId('login-password-card')
            .find('input')
            .type(Cypress.env('userPassword'));
        cy.findByTestId('login-password-card').find('button').click();

        //
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('codeboxUrl')}`,
        );
        cy.contains('Code Box').should('exist');
        cy.contains('Meetp').should('exist');
        cy.contains('Logout').should('exist');
    });
});
