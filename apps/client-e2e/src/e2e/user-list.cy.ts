describe("Navigate to All Users", () => {
  it("Logs in as an administrator and asserts users", () => {
    cy.visit("/login");
    cy.get("#username").type("admin");
    cy.get("#password").type("adminpassword");
    cy.get("button").click();

    cy.get("a").contains("All Users.tsx").click();

    cy.get("tr").then((rows) => {
      let adminCount = 0;
      let teacherCount = 0;
      let studentCount = 0;

      for (let i = 0; i < rows.length; i++) {
        if (rows[i].innerText.includes("Administrator")) {
          adminCount++;
        } else if (rows[i].innerText.includes("Teacher")) {
          teacherCount++;
        } else if (rows[i].innerText.includes("Student")) {
          studentCount++;
        }
      }

      expect(adminCount).to.equal(1);
      expect(teacherCount).to.equal(2);
      expect(studentCount).to.equal(5);
    });
  });
});
