describe('Teacher Login and Student Management', () => {
  it('Logs in as a teacher and view student progress', () => {
    cy.visit('/login');
    cy.get('input[name="username"]').type('teacherUsername');
    cy.get('input[name="password"]').type('teacherPassword');
    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="student-row"]').should('have.length', 2);
    cy.get('[data-testid="student-row"]:first').click();

    cy.url().should('include', '/students/');
    cy.get('[data-testid="completed-subject-english-grade-1"]').should('be.visible');
    cy.get('[data-testid="incompleted-subject-math-grade-1"]').should('be.visible');

    cy.get('[data-testid="mark-as-completed-subject-math-grade-1"]').click();
    cy.reload();

    cy.get('[data-testid="completed-subject-math-grade-1"]').should('be.visible');
  });
});
