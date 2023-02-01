describe("Navigate to All Users", () => {
  it("Logs in as an administrator and asserts users", () => {
    cy.visit("/login");
    cy.get("#email").type("admin1@admin1.com");
    cy.get("#password").type("admin1");
    cy.get("button").click();
    cy.url().should('equal', 'http://localhost:4200/')
    cy.contains('Loading...').should('not.exist')

    cy.get("tr").then((rows) => {
      let adminCount = 0;
      let teacherCount = 0;
      let studentCount = 0;

      for (let i = 0; i < rows.length; i++) {
        if (rows[i].innerText.includes("Admin")) {
          adminCount++;
        } else if (rows[i].innerText.includes("Teacher")) {
          teacherCount++;
        } else if (rows[i].innerText.includes("Student")) {
          studentCount++;
        }
      }

      expect(adminCount).to.equal(2);
      expect(teacherCount).to.equal(2);
      expect(studentCount).to.equal(5);
    });
  });
});
