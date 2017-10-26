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
            let channelType = session.message.source;
            let msg;

            session.send('Okay then lets begin the walkthrough!');

            let text =
                '1. Click the Wi-Fi icon in the top-right of your screen.\n' +
                '2. Select Turn Wi-Fi On.\n' +
                '3. Your Mac will automatically scan for available wireless networks.\n';

            if(channelType =='facebook'){
                msg = {
                    attachment: {
                        "type":"template",
                        "payload":{
                            "template_type":"generic",
                            "elements":[
                                {
                                    "title":"Welcome to Peter\'s Hats",
                                    "image_url":"https://petersfancybrownhats.com/company_image.png",
                                    "subtitle":"We\'ve got the right hat for everyone.",
                                    "default_action": {
                                        "type": "web_url",
                                        "url": "https://peterssendreceiveapp.ngrok.io/view?item=103",
                                        "messenger_extensions": true,
                                        "webview_height_ratio": "tall",
                                        "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                    },
                                    "buttons":[
                                        {
                                            "type":"web_url",
                                            "url":"https://petersfancybrownhats.com",
                                            "title":"View Website"
                                        },{
                                            "type":"postback",
                                            "title":"Start Chatting",
                                            "payload":"DEVELOPER_DEFINED_PAYLOAD"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                };
                //msg = 'http://m3.ttxm.co.uk/gfx/help/broadband/turn_wifi_on_mac.png';
            } else {
                let card = helpers.createImageCard(session, 'Wifi guide', '', text, 'http://m3.ttxm.co.uk/gfx/help/broadband/turn_wifi_on_mac.png');
                // attach the card to the reply message
                msg = new builder.Message(session).addAttachment(card);
            }
            session.send(msg);
            nextSteps(session);
        },
        function (session) {
            let channelType = session.message.source;
            let msg;

            let text =
                '4. Select your wireless network name from the list.';

            if(channelType =='facebook'){
                msg = 'http://m3.ttxm.co.uk/gfx/help/broadband/turn_wifi_on_mac.png';
            } else {
                let card = helpers.createImageCard(session, 'Wifi guide', '', text, 'https://m0.ttxm.co.uk/gfx/help/turn_wifi_on_mac_2.png');
                // attach the card to the reply message
                msg = new builder.Message(session).addAttachment(card);
            }
            session.send(msg);
        },
    ]);
}

module.exports = computerSetup;