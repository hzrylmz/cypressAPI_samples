/// <reference types="cypress" />

describe("Get Request", {testIsolation:false},() => {
    beforeEach(() => {
        cy.request("http://localhost:3000/posts").as("posts");
    });

    it("should return a 200 status code for /posts API", () => {
        cy.get("@posts").its("status").should("equal", 200);
    });

    it("should validate /posts API response structure and values", () => {
        cy.get("@posts").then(response => {
            const posts = response.body;

            expect(posts).to.be.an("array").and.not.empty;

            posts.forEach(post => {
                expect(post).to.have.all.keys("id", "title", "author");

                // Perform assertions for specific keys/values
                if (post.title === "json-server") {
                    expect(post.author).to.equal("typicode");
                }

                // Log each post's author and title
                cy.log(`Author: ${post.author} & Title: ${post.title}`);
            });
        });
    });
});
