/**
 * Created by momchillgorchev on 10/02/16.
 */

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
});