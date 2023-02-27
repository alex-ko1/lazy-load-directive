describe("My First Test", () => {
  it("loads more items on scroll", () => {
    cy.intercept("GET", "/").as("getPosts");
    cy.visit("/");

    cy.wait("@getPosts");
    cy.recursionLoop((times) => {
      cy.wait(2000);
      cy.get(".posts-1").scrollTo("bottom", { duration: 1000 });
      // .get(".posts-1 .vue-lazy-loader");

      cy.get(".posts-2").scrollTo("bottom", { duration: 1000 });

      cy.get(".posts-component").scrollTo("bottom", { duration: 1000 });
      // .get(".posts-component .vue-lazy-loader");
      return times < 10;
    });
  });
});
