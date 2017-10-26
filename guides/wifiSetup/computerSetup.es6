function computerSetup(builder, bot) {
    let HelpersConstructor = require('../../common/helpers.es6');
    let helpers = new HelpersConstructor(builder);

    bot.dialog('Computer', [
        function (session) {
            builder.Prompts.choice(session, 'What kind of device you want to set up?', [
                'Apple OS',
                'Windows 10',
                'Windows 8',
                'windows 7',
            ]);
        },
        function (session, results) {
            session.beginDialog(results.response.entity);
        }
    ]);

    bot.dialog('Apple OS', [
        function (session) {
            builder.Prompts.choice(session, 'Would you like to see a video, or do a walkthrough?', [
                'Video',
                'Walkthrough',
            ]);
        },
        function (session, results) {
            if (results.response.entity == 'Video'){
                session.send('Okay, here you go:');
                let channelType = session.message.source;
                let msg;
                if(channelType =='facebook'){
                    msg = 'https://youtu.be/AxfGXk0SqCA';
                } else {
                    let card = helpers.createVideoCard(session);
                    // attach the card to the reply message
                    msg = new builder.Message(session).addAttachment(card);
                }
                session.endDialog(msg);
            } else {
                session.beginDialog('AppleWalktrough');
            }
        }
    ]);

    bot.dialog()
}

module.exports = computerSetup;