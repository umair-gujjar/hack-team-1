function computerSetup(builder, bot) {
    let HelpersConstructor = require('../../../common/helpers.es6');
    let helpers = new HelpersConstructor(builder);

    bot.dialog('Android',
        function (session) {
            session.beginDialog('AndroidWalktrough');
        }
    );

    bot.dialog('AndroidWalktrough', [
        function (session) {
            session.send('Okay then lets begin the walkthrough!');

            let text =
                'Open Settings. You can do this by either tapping your Menu button and selecting Settings or by simply tapping the Settings icon on the App List.';

            session.send(
                helpers.createImageCard(
                    session,
                    'Wifi guide',
                    '',
                    '',
                    'http://m0.ttxm.co.uk/sites/rightnow/android/android-mainmenu.png',
                    []
                )
            );

            session.send(text);
            helpers.nextSteps(session);
        },
        function (session, results) {
            if(!helpers.continue(session, results)) {
                return;
            }

            let text =
                `If you haven’t already, you’ll need to activate Wi-Fi on your Android device.

            Select Wireless & Networks and tick Wi-Fi, or flip the Wi-Fi switch to ON.`;

            session.send(helpers.createImageCard(session, 'Wifi guide', '', '', 'http://m2.ttxm.co.uk/sites/rightnow/android/android-settings.png', []));
            session.send(text);
            helpers.nextSteps(session);
        },
        function (session, results) {
            if(!helpers.continue(session, results)) {
                return;
            }

            let text =
                `Select your Wireless Network Name from the list.`;

            session.send(helpers.createImageCard(session, 'Wifi guide', '', '', 'http://m1.ttxm.co.uk/sites/rightnow/android/android-wifi-list.png', []));
            session.send(text);
            helpers.nextSteps(session);
        },
        function (session, results) {
            if(!helpers.continue(session, results)) {
                return;
            }

            let text =
                `Enter your Wireless Network Password using the onscreen keyboard and tap Connect.

Remember: You can find your Wireless Network Name and Password on the sticker at the back of your router.`;

            session.send(helpers.createImageCard(session, 'Wifi guide', '', '', 'http://m0.ttxm.co.uk/sites/rightnow/android/android-wifi-password.png', []));
            session.send(text);
            helpers.nextSteps(session);
        },
        function (session, results) {
            if(!helpers.continue(session, results)) {
                return;
            }

            let text =
                `You should now be connected to your wireless network. Try opening your web browser and surfing the web.

If you’re still having trouble connecting to your wireless network, head over to the Android support site for more detailed help and troubleshooting`;

            session.send(helpers.createImageCard(session, 'Wifi guide', '', '', 'http://m1.ttxm.co.uk/sites/rightnow/android/android-wifi-connected.png', []));
            session.endDialog(text);
        },

    ]);
}

module.exports = computerSetup;