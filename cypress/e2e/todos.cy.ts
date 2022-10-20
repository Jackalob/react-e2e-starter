describe("todos", () => {
  // add todo
  // remove a todo
  // check/ toggle todo
  // todo count values

  beforeEach(() => {
    cy.visit("/");
  });

  it("add todo", () => {
    cy.findByRole("textbox", { name: /title/i }).type("TEST1").type("{enter}");
    cy.findByText(/test1/i).should("exist");
  });

  it("remove todo", () => {
    cy.findByRole("textbox", { name: /title/i }).type("TEST1").type("{enter}");
    cy.wait(1000);
    cy.findByRole("textbox", { name: /title/i }).type("TEST2").type("{enter}");
    cy.wait(1000);

    cy.get('[data-cy="todo-TEST2"]').within(() =>
      cy.findByRole("button", { name: /remove/i }).click()
    );

    cy.findByText(/test2/i).should("not.exist");
  });
});
