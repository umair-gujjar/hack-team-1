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
                    let card = helpers.createVideoCard(session, 'Mac wifi setup', '', 'https://youtu.be/AxfGXk0SqCA');
                    // attach the card to the reply message
                    msg = new builder.Message(session).addAttachment(card);
                }
                session.endDialog(msg);
            } else {
                session.beginDialog('AppleWalktrough');
            }
        }
    ]);

    bot.dialog('AppleWalktrough', [
        function (session) {
            session.send('Okay then lets begin the walkthrough!');
            let firstPart =
                '1. Click the Wi-Fi icon in the top-right of your screen.\n' +
                '2. Select Turn Wi-Fi On.\n' +
                '3. Your Mac will automatically scan for available wireless networks.\n';
            let channelType = session.message.source;
            let msg;
            if(channelType =='facebook'){
                msg = 'http://m3.ttxm.co.uk/gfx/help/broadband/turn_wifi_on_mac.png';
            } else {
                let card = helpers.createImageCard(session, 'Wifi guide', '', firstPart, 'http://m3.ttxm.co.uk/gfx/help/broadband/turn_wifi_on_mac.png');
                // attach the card to the reply message
                msg = new builder.Message(session).addAttachment(card);
            }
            session.send(msg);
        }
    ]);
}

module.exports = computerSetup;