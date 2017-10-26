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
                let card = helpers.createVideoCard(session, 'Video guide', 'Setting up your Super Router', 'https://www.youtube.com/watch?v=5S8O_S_k5ek&t=15s');
                // attach the card to the reply message
                msg = new builder.Message(session).addAttachment(card);
            }
            session.send(msg);
            session.beginDialog('EndRouterSetup')
        }]
    );

    bot.dialog('Walkthrough', [(session) => {
            session.send('Okay then lets begin to walk you through setting up your internet.');
            builder.Prompts.choice(session, 'Which router do you have?', [
                'D-Link 3782 Super Router',
                'HG633 Super Router',
                'Non-TalkTalk Router'
            ]);
        },
        (session, results) => {
            console.log(results.response.entity, 'hello');
            switch(results.response.entity){
                case '1':
                console.log('first one');
                    break;
                case '2':
                console.log('second one');
                    break;
                case '3':
                console.log('third one');
                    break;
            }
        }]);

    bot.dialog('EndRouterSetup', (session) => {
       session.endDialog('Is there anything else I can help you with?'); 
    });
}

module.exports = routerSetup;