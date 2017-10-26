function computerSetup(builder, bot) {
    let HelpersConstructor = require('../../common/helpers.es6');
    let helpers = new HelpersConstructor(builder);

    function nextSteps(session) {
        builder.Prompts.text(session, 'Ready to continue?');
    }

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
                    let card = helpers.createVideoCard(session, 'Mac wifi setup', '', 'https://youtu.be/AxfGXk0SqCA', []);
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
            let channelType = session.message.source;
            let msg;

            session.send('Okay then lets begin the walkthrough!');

            let text =
                'Click the Wi-Fi icon in the top-right of your screen.\n' +
                'Select Turn Wi-Fi On.\n' +
                'Your Mac will automatically scan for available wireless networks.\n';

            session.send(
                helpers.createImageCard(
                    session,
                    'Wifi guide',
                    '',
                    '',
                    'http://m3.ttxm.co.uk/gfx/help/broadband/turn_wifi_on_mac.png',
                    []
                )
            );

            session.send(text);
            nextSteps(session);
        },
        function (session) {
            let channelType = session.message.source;
            let msg;

            let text =
                'Select your wireless network name from the list.';

            session.send(helpers.createImageCard(session, 'Wifi guide', '', text, 'https://m0.ttxm.co.uk/gfx/help/turn_wifi_on_mac_2.png', []));
            nextSteps(session);
        },
        function (session) {
            let channelType = session.message.source;
            let msg;

            let text =
                `Enter your password and click Join.
                Remember: If you don’t know your wireless network name or password you can find them on your password card, or on the sticker on the back of your router.`;

            session.send(helpers.createImageCard(session, 'Wifi guide', '', text, 'https://m1.ttxm.co.uk/gfx/help/turn_wifi_on_mac_3.png', []));
            nextSteps(session);
        },
        function (session) {
            let channelType = session.message.source;
            let msg;

            let text =
                `You should now be ready to go online on your Mac computer.
                If you are still unable to connect or you have encountered any other problems, head over to the Apple Mac support site for more detailed help and troubleshooting.`;

            session.endDialog(text);
        },
    ]);
}

module.exports = computerSetup;