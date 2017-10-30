function computerSetup(builder, bot) {
    let HelpersConstructor = require('../../../common/helpers.es6');
    let helpers = new HelpersConstructor(builder);

    bot.dialog('Apple', [
        (session) => {
            builder.Prompts.choice(session, 'Would you like to see a video, or do a walkthrough?', [
                'Walkthrough',
                'Video',
            ]);
        },
        (session, results) => {
            if (results.response.entity == 'Video'){
                session.send('Okay, here you go:');
                session.endDialog(helpers.createVideoCard(session, 'Iphone wifi setup', '', 'https://youtu.be/MNwv50GDtGY', []));
            } else {
                session.beginDialog('IphoneWalktrough');
            }
        }
    ]);

    bot.dialog('IphoneWalktrough', [
        (session) => {
            session.send('Okay then lets begin the walkthrough!');

            let text =
                'On your iPhone home screen, tap the Settings icon.';

            session.send(
                helpers.createImageCard(
                    session,
                    'Wifi guide',
                    '',
                    '',
                    'https://m0.ttxm.co.uk/gfx/help/iphone_email_talktalk_step1..png',
                    []
                )
            );

            session.send(text);
            helpers.nextSteps(session);
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                return;
            }

            let text =
                'Now tap Wi-Fi.';

            session.send(helpers.createImageCard(session, 'Wifi guide', '', '', 'http://m3.ttxm.co.uk/sites/rightnow/iphone/iphone_wifi_setup_step2.jpg', []));
            session.send(text);
            helpers.nextSteps(session);
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                return;
            }

            let text =
                `Make sure your Wi-Fi is switched ON. Your iPhone will automatically search for available networks.`;

            session.send(helpers.createImageCard(session, 'Wifi guide', '', '', 'http://m1.ttxm.co.uk/sites/rightnow/iphone/iphone_wifi_setup_step3final.jpg', []));
            session.send(text);
            helpers.nextSteps(session);
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                return;
            }

            let text =
                `Select your network from the list. If your network is not showing, make sure that wireless is enabled on your router.`;

            session.send(helpers.createImageCard(session, 'Wifi guide', '', '', 'http://m3.ttxm.co.uk/sites/rightnow/iphone/iphone_wifi_setup_steps4.jpg', []));
            session.send(text);
            helpers.nextSteps(session);
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                return;
            }

            let text =
                `Enter your Wireless Network Password (remember this is case sensitive) and tap Join.
                Remember: You can find your Wireless Network Name and Password on the sticker at the back of your router.`;

            session.send(helpers.createImageCard(session, 'Wifi guide', '', '', 'http://m3.ttxm.co.uk/sites/rightnow/iphone/iphone_wifi_setup_step5.jpg', []));
            session.send(text);
            helpers.nextSteps(session);
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                return;
            }

            let text =
                `You should now be connected to your wireless network. Try opening your web browser and surfing the web.
If you’re still having trouble connecting to your wireless network, head over to the Apple support site for more detailed help and troubleshooting.`;

            session.endDialog(text);
        },
    ]);
}

module.exports = computerSetup;