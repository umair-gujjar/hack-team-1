require('dotenv-extended').load();

var builder = require('botbuilder');
var restify = require('restify');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
// Create connector and listen for messages
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {
    session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);
});

let askAnythingElse = (session) => {
    builder.Prompts.confirm(session, 'Is there anything else I can help with?');
};

let handleYesNo = (session, results) => {
    if (results.response) {
        session.endDialog('How can I help you?');
    } else {
        session.endDialog('Good Bye');
    }
}

// You can provide your own model by specifing the 'LUIS_MODEL_URL' environment variable
// This Url can be obtained by uploading or creating your model from the LUIS portal: https://www.luis.ai/
var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
bot.recognizer(recognizer);

bot.dialog('GetPaymentDueDate', [(session, results, next) => {
    session.send("Pay by 25 Dec 2017");
    next();
},
    askAnythingElse,
    handleYesNo
]).triggerAction({
    matches: 'GetPaymentDueDate'
});

bot.dialog('GetAccountSummary', [(session, results, next) => {
    session.send('Your account is ABC');
    next();
},
    askAnythingElse,
    handleYesNo]
).triggerAction({
    matches: 'GetAccountSummary'
});

bot.dialog('GetAccountBalance', [(session, results, next) => {
    session.send("You are in debt of £50");
    next();
},
    askAnythingElse,
    handleYesNo
]).triggerAction({
    matches: 'GetAccountBalance'
});

bot.dialog('GetPackageName', [(session, results, next) => {
    session.send("Your package is Fast");
    next();
},
    askAnythingElse,
    handleYesNo
]).triggerAction({
    matches: 'GetPackageName'
});

bot.dialog('Help', function (session) {
    session.send('You can ask help for: payment, account summary, package name or account balance');
}).triggerAction({
    matches: 'Help'
});

const greetings = 'Hello, welcome to chatbot';

bot.on('conversationUpdate', function (activity) {
    // when user joins conversation, send instructions
    if (activity.membersAdded) {
        activity.membersAdded.forEach(function (identity) {
            if (identity.id === activity.address.bot.id) {
                var reply = new builder.Message()
                    .address(activity.address)
                    .text(greetings);
                bot.send(reply);
            }
        });
    }
});