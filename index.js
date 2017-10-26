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

// bot.dialog('Help', [(session, results, next) => {
//     session.send('You can ask help for: setting up your router');
//     next();
// },
//     askAnythingElse,
//     handleYesNo]
// ).triggerAction({
//     matches: 'Help'
// });

bot.dialog('RouterSetup', function (session) {
    session.endDialog('Yes of course, would you like me to guide you through it or would you prefer a video?');
}).triggerAction({
    matches: 'RouterSetup'
});

bot.dialog('Help', function (session) {
    session.endDialog('You can ask help for: setting up your router');
}).triggerAction({
    matches: 'Help'
});

const greetings = 'Hi, I\'m Jay your virtual assistant, how can I help?';

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