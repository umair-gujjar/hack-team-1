function routerSetup (builder, bot) {
    let helpersConstructor = require('../common/helpers.es6');
    let helpers = new helpersConstructor(builder);
    bot.dialog('RouterSetup', [
        function (session) {
            builder.Prompts.choice(session, 'Would you prefer a video or walkthrough?', ['Walkthrough', 'Video']);
        },
        function (session, results) {
            session.userData.setupChoice = results.response.entity;
            if(session.userData.setupChoice == 'Video'){
                session.beginDialog('Video');
            } else {
                session.beginDialog('Walkthrough')
            }
        }]
    ).triggerAction({
        matches: 'RouterSetup'
    });

    bot.dialog('Video', [(session, results, next) => {
        session.send('Okay, here you go:');
        next();
    },
        (session) => {
            let channelType = session.message.source;
            let msg;
            if(channelType =='facebook'){
                msg = 'https://www.youtube.com/watch?v=5S8O_S_k5ek&t=15s';
            } else {
                let card = helpers.createVideoCard(session);
                // attach the card to the reply message
                msg = new builder.Message(session).addAttachment(card);
            }
            session.endDialog(msg);
        }]
    );

    bot.dialog('Walkthrough', function (session) {
        session.send('Okay then lets begin the walkthrough.');
    });
}

module.exports = routerSetup;