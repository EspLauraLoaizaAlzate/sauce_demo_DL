describe('Abrir la página sauce demo', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        cy.clearCookies();         // Limpia las cookies
        cy.clearLocalStorage();    // Limpia el almacenamiento local
        cy.reload();
    });

    it('Iniciar sesión', () => {
        cy.get('#user-name', { timeout: 10000 }).type('standard_user');      
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
    });
});