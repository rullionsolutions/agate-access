"use strict";

var Data = require("lazuli-data/index.js");
var text_strings = Data.areas.get("ac").text_strings;


text_strings.user_account_created = {
    text: "{product_name}: Log On Details",
    type: "N",
    purpose: "Email sent to the user when their new user account is created (general)",
    trigger: "Whenever a new user is created unless another email template is specified for their user type",
    tokens: Data.entities.get("ac_user").unlock_tokens,
    detail: "Welcome to {product_name}.\n"
        + "A new user account has been created for you and you need to set your password before you can log in.\n"
        + "You can do this by following this link: {base_uri}{unlock_url}\n"
        + "Your User ID is: {to_user}\n"
        + "Please store this in a safe place.\n"
        + "If you forget your password you can use the 'Forgotten Password?' button to be sent an email to reset your password.\n"
        + "You will need your user Id or the email address you registered with to do this.\n"
        + "{email_footer}",
};


text_strings.pswd_forgotten_send = {
    type: "I",
    text: "Thank you. You should now receive an email regarding setting a new password on your account.",
};

text_strings.forgotten_password_email = {
    text: "{product_name}: Password Reset",
    type: "N",
    purpose: "Email sent to a user who has requested a password reset (general)",
    trigger: "A user clicks on the 'Forgotten your Password?' link and enters their email address",
    tokens: Data.entities.get("ac_user").unlock_tokens,
    detail: "Dear {nice_name},\n"
        + "You (or someone claiming to be you) has requested a Password Reset, which has been processed.\n"
        + "Please click on this link below to change your password: {base_uri}{unlock_url}\n"
        + "If you did not request this, please contact the Rullion Support Helpdesk immediately on 0161 601 3416.\n"
        + "{email_footer}",
};

text_strings.email_address_changed = {
    text: "{product_name}: Email Address Change",
    type: "N",
    purpose: "Sent to the original email address when the email address field on a user account is changed",
    trigger: "Any action that changes the email address of an existing user account",
    tokens: [
        "- {new_email_addr} = the new email address as a result of the change (this email is sent to the OLD address)",
    ],
    detail: "Dear {nice_name},\n"
        + "Your email address has been changed from {to_addr} to {new_email_addr},\n"
        + "either by yourself, by an administrator, or by an update from another system.\n"
        + "All email notifications from now on will go to this new address. "
        + "You will also need to use this email address if you require a password reset.\n"
        + "{email_footer}",
};


text_strings.user_account_extended = {
    text: "{product_name}: User Account Extended",
    type: "N",
    purpose: "Email sent to the user when their new user account is reopened (general)",
    trigger: "expiry date extended",
    tokens: Data.entities.get("ac_user").unlock_tokens,
    detail: ""
        + "Welcome to {product_name}.\n\n"
        + "Your existing user account has been extended and its details are provided below as a reminder.\n\n"
        + "Your User ID is: {to_user}\n"
        + "Homepage: {base_uri}index.html\n\n"
        + "If you have forgotten your password you can use the link on the logon screen to request a "
        + "password reset email is sent to your registered email address.\n\n"
        + "Please log in as a matter of urgency to:\n"
        + " > ensure you are assigned to the correct Line Manager and/or Timesheet Approver.\n"
        + " > if you will be submitting timesheets, check the timesheet format accommodates your contract as it should, "
        + "e.g. there are spaces to add all relevant rates you are eligible to claim.\n\n"
        + "If you need any help or guidance to use the system, we have created a number of training videos which can be found here:\n"
        + "{base_uri}index.html?page_id=pb_article_show&page_key=help_guest\n\n"
        + "If you require any assistance with the application or encounter any problems, please let us know "
        + "via rsl.support@rullion.co.uk or on 0161 601 3416\n\n"
        + "{email_footer}",
};

text_strings.duplicate_account_request = {
    text: "{product_name}: A new account request has been made on your email address",
    type: "N",
    purpose: "Email sent to the user to advise them that their account may be the target of a potential ennumeration attack",
    trigger: "Whenever an account request is made using an existing email address",
    tokens: Data.entities.get("ac_user").unlock_tokens,
    detail: "Welcome to {product_name}.\n"
        + "A request has been made to create a new account using this email address.\n\n"
        + "This could indicate an attempt to hack your account.\n\n"
        + "If you did not make this request then it is suggested that you update your password at {base_uri}/index.html?page_id=ac_pswd_change"
        + "{email_footer}",
};

text_strings.user_added_as_delegate = {
    text: "{product_name}: You have been set as another user's delegate",
    type: "N",
    purpose: "Email sent to the user to advise them that another user has added them as a delegate",
    trigger: "Whenever a user adds another user as a delegate",
    tokens: [
        "- {delegater} = the nice name of the person who has just delegated to this user",
    ],
    detail: "{email_header}\n" +
        "{delegater} has added you as a delegate for their workflow tasks in {product_name}.\n\n" +
        "You will receive notification emails for important workflow tasks assigned to {delegater}.\n\n" +
        "You can choose to switch off these notification emails by clicking on your name in the top-right corner, " +
        "choosing 'Update your Profile', and unticking the checkbox in the 'Receive Email Notifications?' column. \n" +
        "{email_footer}",
};

text_strings.calendar_event = {
    text: "{product_name}: {event_title}",
    type: "N",
    purpose: "Email sent to the user to invite him/her to a specific calendar event",
    trigger: "Whenever a calendar event is created or updated; unless a more specific email template is used instead",
    tokens: Data.entities.get("ac_user").calendar_tokens,
    calendar_event: true,
    detail: "Welcome to {product_name}.\n"
        + "You have been invited to a calendar event: \n\n"
        + "{full_description}\n\n"
        + "{email_footer}",
};
