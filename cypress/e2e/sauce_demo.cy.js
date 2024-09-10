describe('Abrir la página sauce demo', () => {

    let loginJson
    before (()=>{
        cy.fixture("login.json").then((data)=>{
            loginJson=data
        })
    })
    beforeEach(function() {
        console.log(loginJson)
        if(this.currentTest.title !=="'Iniciar sesión"){
            cy.login(loginJson.admin.username, loginJson.admin.password)
        }
    });

    it('Iniciar sesión', () => {
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    });

    it('Cerrar sesión', () =>{
        cy.wait(2000)
        cy.get('#react-burger-menu-btn').click()
        cy.wait(1000)
        cy.get('#logout_sidebar_link').click()
        cy.url().should('eq', 'https://www.saucedemo.com/')

    })

    it('Clasificar productos por nombre', () =>{
        cy.wait(2000)
        cy.get('.product_sort_container').select('Name (Z to A)')
        //Selecciona el primer artículo en la lista y compara
        cy.get('[data-test="inventory-item"]').first().find('[data-test="inventory-item-name"]').then(($itemName) => {
        const nameText = $itemName.text().trim();
        expect(nameText).to.equal('Test.allTheThings() T-Shirt (Red)');
      });

    
    })

    it('Clasificar productos por precio', () =>{
        cy.wait(2000)
        cy.get('.product_sort_container').select('Price (high to low)')
        //Selecciona el primer artículo en la lista y compara
        cy.get('[data-test="inventory-item"]').first().find('[data-test="inventory-item-price"]').then(($priceElement) => {
        const priceText = $priceElement.text().trim();
        expect(priceText).to.equal('$49.99');
    });

    })

    it('Agregar productos al carrito', () => {
        cy.wait(2000)
        cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click()
        cy.get('#add-to-cart-sauce-labs-onesie').click()
        // Selecciona el elemento y obtiene el texto, luego compara
        cy.get('[data-test="shopping-cart-badge"]').then($badge => {
        // badgeText es el texto obtenido
        const badgeText = $badge.text();
        expect(badgeText).to.equal('2');

      })
    })

    it('Quitar productos del carrito', () =>{
        cy.wait(1000)
        cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click()
        cy.get('#add-to-cart-sauce-labs-onesie').click()
        cy.wait(1000)
        //Comando para remover los productos desde la página principal
        cy.get('#remove-sauce-labs-bolt-t-shirt').click()
        cy.get('#remove-sauce-labs-onesie').click()
        //Añadir productos al carrito desde la página pricipal
        cy.get('#add-to-cart-sauce-labs-fleece-jacket').click()
        cy.get('#add-to-cart-sauce-labs-backpack').click()
        //Remover los productos desde la página página 'Your cart'
        cy.get('.shopping_cart_link').click()
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html')
        // Selecciona todos los elementos de los artículos del carrito
        cy.get('.cart_item').find('.inventory_item_name').each(($itemName) => {
        const nameText = $itemName.text().trim(); // Obtiene el texto y elimina espacios en blanco innecesarios
        expect(nameText).to.be.oneOf(['Sauce Labs Fleece Jacket', 'Sauce Labs Backpack']);
      });


    })

    it('Completando el proceso de pago', () =>{
        cy.wait(2000)
        cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click()
        cy.get('#add-to-cart-sauce-labs-onesie').click()
        cy.get('.shopping_cart_link').click()
        cy.get('#checkout').click()
        cy.get('#first-name').type('TestName')
        cy.get('#last-name').type('TestLastName')
        cy.get('#postal-code').type(909090)
        cy.get('#continue').click()
        cy.get('#finish').click()
        cy.get('#back-to-products').click()

    })

    it('Verificando la página de agradecimiento', () =>{
        cy.wait(2000)
        cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click()
        cy.get('#add-to-cart-sauce-labs-onesie').click()
        cy.get('.shopping_cart_link').click()
        cy.get('#checkout').click()
        cy.get('#first-name').type('TestName')
        cy.get('#last-name').type('TestLastName')
        cy.get('#postal-code').type(909090)
        cy.get('#continue').click()
        cy.get('#finish').click()
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-complete.html')
        cy.get('.complete-header').then($badge => {
            // badgeText es el texto obtenido
            const badgeText = $badge.text();
            expect(badgeText).to.equal('Thank you for your order!');

        })
    })

});