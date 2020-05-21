describe('appointments', () => {
  it('should book an interview', () => {
    cy.request("GET", "http://192.168.1.67:8001/api/days")
    cy.visit('/');

    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get('[data-testid=student-name-input')
      .type("Archie Puppy")

    cy.get('[alt="Sylvia Palmer"]').click()

    cy
      .contains("Save")
      .click()

    cy.contains(".appointment__card--show", "Archie Puppy");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  })

  it('should edit an interview', () => {

    cy.request("GET", "/api/debug/reset")
    cy.visit('/');

    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get('[data-testid=student-name-input')
      .type("Archie Puppy")

    cy.get('[alt="Sylvia Palmer"]').click()

    cy
      .contains("Save")
      .click()

    cy.contains(".appointment__card--show", "Archie Puppy");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  })
})
