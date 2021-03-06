function computerSetup(builder, bot) {
    let HelpersConstructor = require('../../../common/helpers.es6');
    let helpers = new HelpersConstructor(builder);

    bot.dialog('Windows 10', [
        (session) => {
            builder.Prompts.choice(session, 'Would you like to see a video, or do a walkthrough?', [
                'Walkthrough',
                'Video',
            ]);
        },
        (session, results) => {
            if (results.response.entity == 'Video'){
                session.send('Okay, here you go:');
                session.endDialog(helpers.createVideoCard(session, 'Win 10 wifi setup', '', 'https://youtu.be/IsFhU2oUICk', []));
            } else {
                session.beginDialog('Win10Walktrough');
            }
        }
    ]);

    bot.dialog('Win10Walktrough', [
        (session) => {
            session.send('Okay then lets begin the walkthrough!');

            let text = 'Select the wireless icon at the bottom right of your screen.';

            session.send(
                helpers.createImageCard(session, 'Wifi guide', '', '', 'http://m0.ttxm.co.uk/sites/rightnow/windows/Windows_10/Windows-10-Wireless-Icon.png', [])
            );

            session.send(text);
            helpers.nextSteps(session);
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                session.beginDialog('EndComputerSetup');
                return;
            }

            session.beginDialog('Win10List');
        } 
    ]);

    bot.dialog('Win10List', [
        (session) => {
            let text = `Select your wireless network name from the list. 
                        Remember: you can find your wireless network name and password on the sticker on the back of your router, or on the card supplied with your router.`;

            session.send(
                helpers.createImageCard(session, 'Wifi guide', '', '', 'http://m1.ttxm.co.uk/sites/rightnow/windows/Windows_10/Original-Wireless-list.png', [])
            );
            session.send(text);
            helpers.nextSteps(session);
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                session.beginDialog('EndComputerSetup');
                return;
            }

            session.beginDialog('');
        }
    ]);

    bot.dialog('Win10Connect', [
        (session) => {
            let text = `Select Connect automatically, and then click Connect.`;

            session.send(helpers.createImageCard(session, 'Wifi guide', '', '', 'http://m3.ttxm.co.uk/sites/rightnow/windows/Windows_10/Connect-automatically.png', []));
            session.send(text);
            helpers.nextSteps(session);
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                session.beginDialog('EndComputerSetup');
                return;
            }

            session.beginDialog('Win10Pass');
        }            
    ]);

    bot.dialog('Win10Pass', [
        (session) => {
            let text =
                `Enter your Wi-Fi password and click Next.
                Remember: you can find your wireless password on the sticker on the back of your router, or on the card supplied with your router.`;

            session.send(helpers.createImageCard(session, 'Wifi guide', '', '', 'http://m3.ttxm.co.uk/sites/rightnow/windows/Windows_10/Enter-password.PNG', []));
            session.send(text);

            session.beginDialog('EndComputerDialog');
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                session.beginDialog('EndComputerSetup');
                return;
            }

            session.beginDialog('Win10Complete');
        }
    ]);

    bot.dialog('Win10Complete', [
        (session) => {
            let text =
                `You should now be ready to go online on your Window computer.
                If you are still unable to connect or you have encountered any other problems, head over to the Microsoft windows support site for more detailed help and troubleshooting.`;
            session.send(text);

            session.beginDialog('EndComputerDialog')
        }
    ]);
}

module.exports = computerSetup;