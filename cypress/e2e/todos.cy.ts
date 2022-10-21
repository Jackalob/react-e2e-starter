describe("todos", () => {
  // add todo
  // remove a todo
  // check/ toggle todo
  // todo count values

  beforeEach(() => {
    cy.visit("/");
  });

  it("user can add, check, and delete todos", () => {
    cy.findByRole("textbox", { name: /title/i }).type("TEST1").type("{enter}");
    cy.findByRole("textbox", { name: /title/i }).type("TEST2").type("{enter}");

    cy.findByText(/test1/i).should("exist");
    cy.findByText(/test2/i).should("exist");
    cy.findByText(/total todos: 2/i).should("exist");

    cy.findByRole("checkbox", { name: /test2/i }).check();
    cy.findByText(/selected todos: 1/i).should("exist");

    cy.get('[data-cy="todo-TEST1"]').within(() => {
      cy.findByRole("button", { name: /remove/i }).click();
    });
    cy.findByText(/total todos: 1/i).should("exist");
  });
});
