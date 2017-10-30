function computerSetup(builder, bot) {
    let HelpersConstructor = require('../../../common/helpers.es6');
    let helpers = new HelpersConstructor(builder);

    bot.dialog('Apple OS', [
        function (session) {
            builder.Prompts.choice(session, 'Would you like to see a video, or do a walkthrough?', [
                'Walkthrough',
                'Video',
            ]);
        },
        function (session, results) {
            if (results.response.entity == 'Video'){
                session.send('Okay, here you go:');
                session.send(helpers.createVideoCard(session, 'Mac wifi setup', '', 'https://youtu.be/AxfGXk0SqCA', []));
            } else {
                session.beginDialog('AppleWalktrough');
            }
        }
    ]);

    bot.dialog('AppleWalktrough', [
        function (session) {
            session.send('Okay then lets begin the walkthrough!');

            let text =
                'Click the Wi-Fi icon in the top-right of your screen.\n' +
                'Select Turn Wi-Fi On.\n' +
                'Your Mac will automatically scan for available wireless networks.\n';

            session.send(helpers.createImageCard(session,'Wifi guide','','','http://m3.ttxm.co.uk/gfx/help/broadband/turn_wifi_on_mac.png',[]));

            session.send(text);
            helpers.nextSteps(session);
        },
        function (session, results) {
            if(!helpers.continue(session, results)) {
                return;
            }

            let text =
                'Select your wireless network name from the list.';

            session.send(helpers.createImageCard(session, 'Wifi guide', '', '', 'https://m0.ttxm.co.uk/gfx/help/turn_wifi_on_mac_2.png', []));
            session.send(text);
            helpers.nextSteps(session);
        },
        function (session, results) {
            if(!helpers.continue(session, results)) {
                return;
            }

            let text =
                `Enter your password and click Join.
                Remember: If you don’t know your wireless network name or password you can find them on your password card, or on the sticker on the back of your router.`;

            session.send(helpers.createImageCard(session, 'Types of Sockets', '', '', 'https://m1.ttxm.co.uk/gfx/help/turn_wifi_on_mac_3.png', []));
            session.send(text);
            helpers.nextSteps(session);
        },
        function (session, results) {
            if(!helpers.continue(session, results)) {
                return;
            }

            let text =
                `You should now be ready to go online on your Mac computer.
                If you are still unable to connect or you have encountered any other problems, head over to the Apple Mac support site for more detailed help and troubleshooting.`;

            session.beginDialog('EndComputerDialog')
        },
    ]);
}

module.exports = computerSetup;