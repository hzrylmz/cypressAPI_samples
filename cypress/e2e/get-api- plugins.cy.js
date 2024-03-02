/// <reference types="cypress" />



describe("Get Request", {testIsolation:false},() => {
    var result;
    it.only("Validate status code of the /posts api", () => {
        result = cy.api("http://localhost:3000/posts");
        result.its("status").should("equal", 200)
    })

    it("Validate /posts api contains the correct keys and values", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:3000/posts",
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body))
            cy.log(body);

            expect(body[0]).has.property("title", "json-server");

            expect(body[0]).has.property("author", "typicode");

            expect(body[1]).has.property("title", "Want to learn automation testing?");

            expect(body[1]).has.property("author", "Hizir Yilmaz");


            body.forEach(function(item) {
                expect(item).to.have.all.keys("id", "title", "author");
                cy.log("Author: " + item["author"] + " & Title: " + item["title"]);
            });
        })
    })
})