import { mount } from "cypress/vue";
import PostList from "../../src/components/PostList.vue";

describe("PostList.cy.js", () => {
  it("playground", () => {
    mount(PostList);
    // cy.mount(PostList);
    // cy.get("transition-group-stub").then(($el) => {
    //   const content = $el.html();
    //   $el.replaceWith(content);
    // });
    cy.recursionLoop((times) => {
      cy.wait(2000);

      cy.get(".posts-component").scrollTo("bottom", { duration: 1000 });

      return times < 10;
    });
  });
});
