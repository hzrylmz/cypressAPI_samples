/// <reference types="cypress" />

describe("Update Request", () => {
  it("Update an existing post via the /posts api", () => {
    cy.request({
      method: "PUT",
      url: "http://localhost:3000/posts/5ca3",
      body: {
        title: "Where can i buy apples?",
        author: "Tom Jones",
      },
    }).then((response) => {
      expect(response.status).to.eql(200);
    });
  });
});
