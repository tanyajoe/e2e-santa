// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const loginPage = require("../fixtures/pages/loginPage.json");
const generalElements = require("../fixtures/pages/general.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
const mainPage = require("../fixtures/pages/mainPage.json");

Cypress.Commands.add("login", (userName, password) => {
  cy.get(loginPage.loginField).type(userName);
  cy.get(loginPage.passwordField).type(password);
  cy.get(generalElements.submitButton).click({ force: true });
});

Cypress.Commands.add("approveParticipation", (userName, password, wishes) => {

  cy.login(userName, password);
  cy.contains("Создать карточку участника").should("exist");
  cy.get(generalElements.submitButton).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(inviteeBoxPage.wishesInput).type(wishes);
  cy.get(generalElements.arrowRight).click();
  cy.get(inviteeDashboardPage.noticeForInvitee)
  .invoke("text")
  .then((text) => {
    expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
  });
cy.clearCookies();
});

Cypress.Commands.add("checkNotification", () => {
  cy.contains("Коробки").should('exist');
  cy.get(mainPage.notificationsBtn).click();
  cy.contains("Отметить все как прочитанные").should('exist');
  cy.get(mainPage.notificationFirst).click();
  cy.contains("Жеребьевка проведена и у тебя появился подопечный").should('exist');
  cy.get(generalElements.submitButton).click();
  //cy.contains('oksana').should('exist');
  cy.get('.user-card__pic').should('exist');
});

Cypress.Commands.add('ApiDeleteBox', (ApiUrl) =>{
  cy.request({
    method: "DELETE",
    headers: {
        Cookie: "_ym_uid=1673040386524679934; _ym_d=1673040386; _ym_isad=1; connect.sid=s:Q40dv6rvt8sh2YDSpwuN28-p_zeY8Ho2.nMYyImfkYZW2a9pKyzTzX78yUwc8RUqxC6nLI+H7iWQ; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDAwMTUsImlhdCI6MTY3NDU4OTA1MiwiZXhwIjoxNjc0NTkyNjUyfQ.IgJDE20N6mN0m2Ohn--VXHRcT5FL6esdWyZGVAwdWa8"
    },
    url: ApiUrl
}).then((response) => {
    expect(response.status).to.equal(200);
})
})
