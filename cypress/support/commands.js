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
  cy.contains('oksana').should('exist');
});

Cypress.Commands.add('ApiDeleteBox', (ApiUrl) =>{
  cy.request({
    method: "DELETE",
    headers: {
        Cookie: "_ym_uid=1673040386524679934; _ym_d=1673040386; _ym_isad=1; connect.sid=s:UoauwBVdVGFLfeTCofEk_Vbh6Y3fORvj.pqV3Wwaai9rLTDKWHKvHwh74ntieOP0BjYnShvc6xKA; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDA3NTYsImlhdCI6MTY3Mzc1MDA3NywiZXhwIjoxNjczNzUzNjc3fQ.UWfum_s7ZzML5OJPOBThQj6iuh9how9qPcIbX6zwcmU"
    },
    url: ApiUrl
}).then((response) => {
    expect(response.status).to.equal(200);
})
})
