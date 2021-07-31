/// <reference types="cypress" />

before(() => {
  Cypress.env("validPostalCode", "64001970");
  Cypress.env("postalCodeWithoutCoordinates", "64011630");
  Cypress.env("invalidPostalCode", "999");
});

beforeEach(() => {
  cy.visit("http://localhost:3000/");
  cy.intercept("GET", "https://brasilapi.com.br/api/cep/v2/*").as(
    "getBrasilAPI"
  );
});

describe("Add new place on the list", () => {
  it("should search place by postal code", () => {
    cy.get("input#search").type(Cypress.env("validPostalCode"));

    cy.get("#btnSearch").click();

    cy.wait("@getBrasilAPI").then((interception) => {
      return new Cypress.Promise((resolve, reject) => {
        expect(interception.response.statusCode).eq(200);

        expect(interception.response.body).property("cep");
        assert.isNotEmpty(interception.response.body.cep);

        expect(interception.response.body).property("city");
        assert.isNotEmpty(interception.response.body.city);

        expect(interception.response.body).property("state");
        assert.isNotEmpty(interception.response.body.state);

        expect(interception.response.body).property("neighborhood");
        assert.isNotEmpty(interception.response.body.neighborhood);

        expect(interception.response.body).property("street");
        assert.isNotEmpty(interception.response.body.street);

        expect(interception.response.body).property("location");
        assert.isNotEmpty(interception.response.body.location);

        expect(interception.response.body.location).property("coordinates");
        assert.isNotEmpty(interception.response.body.location.coordinates);

        expect(interception.response.body.location.coordinates).property(
          "latitude"
        );
        assert.isNotEmpty(
          interception.response.body.location.coordinates.latitude
        );

        expect(interception.response.body.location.coordinates).property(
          "longitude"
        );
        assert.isNotEmpty(
          interception.response.body.location.coordinates.longitude
        );

        cy.get("#coordinates").should("be.not.visible");

        resolve();
      });
    });
  });

  it("should report error when searching invalid postal code", () => {
    cy.get("input#search").type(Cypress.env("invalidPostalCode"));

    cy.get("#btnSearch").click();

    cy.wait("@getBrasilAPI").then((interception) => {
      return new Cypress.Promise((resolve, reject) => {
        expect(interception.response.statusCode).eq(404);
        resolve();
      });
    });
  });

  it("should display entries for coordinates when the api does not return them", () => {
    cy.get("input#search").type(Cypress.env("postalCodeWithoutCoordinates"));

    cy.get("#btnSearch").click();

    cy.wait("@getBrasilAPI").then((interception) => {
      return new Cypress.Promise((resolve, reject) => {
        expect(interception.response.statusCode).eq(200);
        expect(interception.response.body.location).property("coordinates");
        assert.isEmpty(interception.response.body.location.coordinates);

        cy.get("#coordinates").should("be.visible");

        resolve();
      });
    });
  });

  it("should report an error when trying to save with some empty input", () => {
    cy.get("input#search").type(Cypress.env("validPostalCode"));

    cy.get("#btnSearch").click();

    cy.wait("@getBrasilAPI").then((interception) => {
      return new Cypress.Promise((resolve, reject) => {
        expect(interception.response.statusCode).eq(200);

        cy.get("input#postalCode").clear();

        cy.get("#btnSave").click();

        cy.get("#placeForm").should("be.visible");

        cy.get("#placeForm").contains("Preencha este campo");

        resolve();
      });
    });
  });

  it("should report an error when trying to save with some empty coordinates input", () => {
    cy.get("input#search").type(Cypress.env("postalCodeWithoutCoordinates"));

    cy.get("#btnSearch").click();

    cy.wait("@getBrasilAPI").then((interception) => {
      return new Cypress.Promise((resolve, reject) => {
        expect(interception.response.statusCode).eq(200);

        cy.get("#coordinates").should("be.visible");

        cy.get("input#latitude").clear();
        cy.get("input#longitude").clear();

        cy.get("#btnSave").click();

        cy.get("#placeForm").should("be.visible");

        cy.get("#placeForm").contains("Preencha estes campos");

        resolve();
      });
    });
  });

  it("should be able to save new valid location", () => {
    cy.get("input#search").type(Cypress.env("validPostalCode"));

    cy.get("#btnSearch").click();

    cy.wait("@getBrasilAPI").then((interception) => {
      return new Cypress.Promise((resolve, reject) => {
        expect(interception.response.statusCode).eq(200);

        cy.get("#initialEmptyList").should("be.visible");

        cy.get("input#postalCode").invoke("val").should("not.be.empty");
        cy.get("input#street").invoke("val").should("not.be.empty");
        cy.get("input#neighborhood").invoke("val").should("not.be.empty");
        cy.get("input#city").invoke("val").should("not.be.empty");
        cy.get("input#state").invoke("val").should("not.be.empty");
        cy.get("input#latitude").invoke("val").should("not.be.empty");
        cy.get("input#longitude").invoke("val").should("not.be.empty");

        cy.get("#btnSave").click();

        cy.get("#listSelector div:nth-child(1)").should("have.class", "active");

        cy.get("#placesList").should("be.visible");

        cy.get("#placesList").should(($list) => {
          expect($list).length(1);
          expect($list.eq(0)).contain(Cypress.env("validPostalCode"));
        });

        resolve();
      });
    });
  });
});

describe("Bookmark item from visited place list", () => {
  beforeEach(() => {
    cy.get("input#search").type(Cypress.env("validPostalCode"));
    cy.get("#btnSearch").click();
  });

  it("should add place in favorite listing", () => {
    cy.wait("@getBrasilAPI").then((interception) => {
      return new Cypress.Promise((resolve, reject) => {
        expect(interception.response.statusCode).eq(200);

        cy.get("#btnSave").click();

        cy.get("#btnFavorite").click();

        cy.get("#listSelector div:nth-child(2)").click();

        cy.get("#listSelector div:nth-child(2)").should("have.class", "active");

        cy.get("#placesList").should("be.visible");

        cy.get("#placesList").should(($list) => {
          expect($list).length(1);
          expect($list.eq(0)).contain(Cypress.env("validPostalCode"));
        });

        resolve();
      });
    });
  });

  it("should remove place from favorite listing", () => {
    cy.wait("@getBrasilAPI").then((interception) => {
      return new Cypress.Promise((resolve, reject) => {
        expect(interception.response.statusCode).eq(200);

        cy.get("#btnSave").click();

        cy.get("#btnFavorite").click();

        cy.get("#listSelector div:nth-child(2)").click();

        cy.get("#listSelector div:nth-child(2)").should("have.class", "active");

        cy.get("#placesList").should("be.visible");

        cy.get("#placesList").should(($list) => {
          expect($list).length(1);
          expect($list.eq(0)).contain(Cypress.env("validPostalCode"));
        });

        cy.get("#btnFavorite").click();

        cy.get("#emptyList").should("be.visible");

        resolve();
      });
    });
  });
});

describe("Delete item from visited place list", () => {
  beforeEach(() => {
    cy.get("input#search").type(Cypress.env("validPostalCode"));
    cy.get("#btnSearch").click();
  });

  it("should remove place from visited place list", () => {
    cy.wait("@getBrasilAPI").then((interception) => {
      return new Cypress.Promise((resolve, reject) => {
        expect(interception.response.statusCode).eq(200);

        cy.get("#btnSave").click();

        cy.get("#listSelector div:nth-child(1)").should("have.class", "active");

        cy.get("#placesList").should("be.visible");

        cy.get("#placesList").should(($list) => {
          expect($list).length(1);
          expect($list.eq(0)).contain(Cypress.env("validPostalCode"));
        });

        cy.get("#btnDelete").click();

        cy.get("#initialEmptyList").should("be.visible");

        resolve();
      });
    });
  });
});

describe("View specific location on map", () => {
  beforeEach(() => {
    cy.get("input#search").type(Cypress.env("validPostalCode"));
    cy.get("#btnSearch").click();
  });

  it("should select a specific item from visited place list", () => {
    cy.wait("@getBrasilAPI").then((interception) => {
      return new Cypress.Promise((resolve, reject) => {
        expect(interception.response.statusCode).eq(200);

        cy.get("#btnSave").click();

        cy.get(".leaflet-marker-icon").should("have.length", 2);

        cy.get("#placesList li:nth-child(1)").click();

        cy.get("#placesList li:nth-child(1)").should(
          "have.class",
          "highlighted"
        );

        cy.get(".leaflet-marker-icon").should("have.length", 1);

        resolve();
      });
    });
  });

  it("should view details popup from marker on the map", () => {
    cy.wait("@getBrasilAPI").then((interception) => {
      return new Cypress.Promise((resolve, reject) => {
        expect(interception.response.statusCode).eq(200);

        cy.get("#btnSave").click();

        cy.get(".leaflet-marker-icon:last").click();

        cy.get(".leaflet-popup").should("be.visible");

        resolve();
      });
    });
  });
});
