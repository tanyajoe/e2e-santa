import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
const users = require("../../fixtures/users.json");
const boxPage = require("../../fixtures/pages/boxPage.json");
const generalElements = require("../../fixtures/pages/general.json");
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");
const invitePage = require("../../fixtures/pages/invitePage.json");

let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
let idBox = faker.random.alphaNumeric(6);
let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
let maxAmount = 50;
let currency = "Евро";
let inviteLink;


Given("user logs in with {string} and {string}", function (string, string2) {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })
    cy.visit("/login");
    cy.login(string, string2);
    cy.contains("Создать коробку").should('exist');
        });

Given("user creates a box", function () {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })
    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName);
    cy.get(':nth-child(3) > .frm').clear().type(idBox);
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.sixthIcon).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.giftPriceToggle).check({ force: true });
    cy.get(boxPage.maxAnount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.contains("Дополнительные настройки").should("exist")
    cy.get(generalElements.arrowRight).click();
        });

Given("box is visible", function () {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })
    cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
    cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Участники");
        expect(text).to.include("Моя карточка");
        expect(text).to.include("Подопечный");
      });
    });

    Given("clicks submit button", function () {
        cy.get(generalElements.submitButton).click();
        });

    Given("invite link creates", function () {
            cy.get(invitePage.inviteLink)
            .invoke("text")
            .then((link) => {
              inviteLink = link;
            });
          cy.clearCookies();
        });

    Given("visit invite link", function () {
        cy.visit(inviteLink);
        });

    Given("approve by user1", function (dataTable) {
        cy.contains("войдите").click();
        cy.approveParticipation(dataTable.hashes()[1].login, dataTable.hashes()[1].password, wishes);
        });

    Given("approve by user2", function (dataTable) {
        cy.contains("войдите").click();
        cy.approveParticipation(dataTable.hashes()[2].login, dataTable.hashes()[2].password, wishes);
        });

     Given("approve by user3", function (dataTable) {
        cy.contains("войдите").click();
        cy.approveParticipation(dataTable.hashes()[3].login, dataTable.hashes()[3].password, wishes);
        });

    Given("user conducts a draw", function () {
        cy.contains("Коробки").should('exist').click({ force: true });
        cy.contains(newBoxName).should('exist').click({ force: true });
        cy.contains("Перейти к жеребьевке").should('exist').click({ force: true });
        cy.contains("Провести жеребьевку").should('exist');
        cy.contains("Жеребьевка").should('exist');
        cy.get(generalElements.submitButton).click();
        cy.get('.santa-modal_content_message').should('exist');
        cy.get('.santa-modal_content_buttons > .btn-main').click();
        });

    Given("the draw is successful", function () {
        cy.contains("Жеребьевка проведена").should('exist');
        });

    Given("notification exists", function () {
        cy.checkNotification();
        });

     Given("boxes are available", function () {
       cy.contains("Коробки").should('exist')
        });

