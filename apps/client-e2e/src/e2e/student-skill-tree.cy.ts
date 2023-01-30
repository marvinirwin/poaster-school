describe('Student Login and Skill Completion', () => {
  it('Student Login and Skill Completion Check', () => {
    cy.visit('/login');
    cy.get('input[name="username"]').type('student1');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.contains('Grade 1 Reading').should('be.visible');
    cy.contains('Completed').should('be.visible');

    cy.contains('Grade 1 Math').should('be.visible');
    cy.contains('Completed').should('be.visible');

    cy.contains('Grade 1 English').should('be.visible');
    cy.contains('Not Completed').should('be.visible');
  });
});
