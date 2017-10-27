function routerSetup (builder, bot) {
    let helpersConstructor = require('../common/helpers.es6');
    let helpers = new helpersConstructor(builder);

    bot.dialog('RouterSetup', [
        function (session) {
            builder.Prompts.choice(session, 'Would you prefer a video or walkthrough?', ['Walkthrough', 'Video']);
        },
        (session, results) => {
            if(results.response.entity == 'Video'){
                session.beginDialog('RouterVideo');
            } else {
                session.beginDialog('RouterWalkthrough')
            }
        }]
    ).triggerAction({
        matches: 'RouterSetup'
    });

    bot.dialog('RouterVideo', [(session, results, next) => {
            session.send('Okay, here you go:');
            next();
        },
        (session) => {
            session.send(helpers.createVideoCard(session, 'Video guide', 'Setting up your Super Router', 'https://www.youtube.com/watch?v=5S8O_S_k5ek&t=15s'));
            session.beginDialog('EndRouterSetup')
        }]
    );

    bot.dialog('RouterWalkthrough', [(session) => {
            session.send('Okay then lets begin to walk you through setting up your internet.');
            builder.Prompts.choice(session, 'Which router do you have?', [
                'D-Link 3782',
                'HG633',
                'Non-TalkTalk'
            ]);
        },
        (session, results) => {
            if(results.response.entity == 'D-Link 3782'){
                session.beginDialog('D-Link 3782 Super Router');
            } else if(results.response.entity == 'HG633'){
                session.beginDialog('HG633 Super Router');
            } else {
                session.beginDialog('Non-TalkTalk Router');
            }
        }]
    );

    bot.dialog('D-Link 3782 Super Router', [
        function (session) {
            session.send(helpers.createImageCard(session, 'Router Components', 'Do you have all these parts?', '', 'https://m0.ttxm.co.uk/gfx/help/broadband/d-link_3782_box_contents.png', []));
            if(session.message.source == 'facebook'){
                builder.Prompts.choice(session,'Do you have all these parts?', ['Yes','No']);
            } else {
                builder.Prompts.choice(session,' ', ['Yes','No']);
            }
        },
        (session, results) => {
            if(results.response.entity == 'Yes') {
                session.beginDialog('SocketTypeRouter');
            } else {
                session.beginDialog('RouterContactUs');
            }
        }
    ]);

    bot.dialog('HG633 Super Router', [(session) => {

    }]);

    bot.dialog('Non-TalkTalk Router', [(session)=>{
        builder.Prompts.choice(session, 'Just a quick question, are you a TalkTalk TV Customer?', ['Yes', 'No']);
        },
        (session, results) => {
            if(results.response.entity == 'No') {
                session.beginDialog('Non-TalkTalk Customer');
            } else {
                session.beginDialog('TalkTalk TV');
            }
        }]
    );

    bot.dialog('Non-TalkTalk Customer', [
        function (session) {
            session.send('Ok, you need to enter the following information manually into the connection settings on your router. This would be visit the manufacturer’s website or check your router manual.');
            session.send('First, you need to add a username. This will be your telephone number followed by @talktalk.net - for example, 1234567891@talktalk.net');
            
            helpers.nextSteps(session);
        },
        function (session, results) {
            if(!helpers.continue(session, results)) {
                return;
            }

            session.send("Next, you need to enter in the password.  this is the password your router uses to connect to the exchange. If you don't know it, You can call our automated reminder service on 0345 172 0049.");
            
            helpers.nextSteps(session);
        },
        function (session, results) {
            if(!helpers.continue(session, results)) {
                return;
            }

            session.send('Ok now, you need to set the following things to this values: VPI: 0, VCI: 38, MTU: 1432, DNS settings: Set as automatic (or similar), Encapsulation: PPP over ATM (PPPoA) using VC-MUX, Modulation Type: Auto');
        
            helpers.nextSteps(session);
        },
        function (session, results) {
            if(!helpers.continue(session, results)) {
                return;
            }

            session.send('Ok now that should be done. All you have to do is save those changes and just turn the router off and on again and you should be sorted.');

            session.beginDialog('EndRouterSetup');
        }
    ]);
    
    bot.dialog('TalkTalk TV', [
        function (session) {
            session.send('Ok, you will need to configure IGMP for it to work correctly. IGMP is the data that your TalkTalk TV box uses to enable Internet channels, and not all routers support it.');
            session.send('To check whether your router is compatible, login to your router and look in the Settings section for any options to configure IGMP.');
            
            builder.Prompts.choice(session, 'Is your router supported?' ,['Yes', 'No']);
        },
        (session,results) => {
            if(results.response.entity == 'Yes'){
                session.beginDialog('TalkTalk TV Router');
            } else {
                session.send("I'm sorry but you will need to change your router for this to work.");

                session.beginDialog('EndRouterSetup');
            }
        }
    ]);

    bot.dialog('TalkTalk TV Router', [
        function (session) {
            session.send('First, you need to add a username. This will be your telephone number followed by @talktalk.net - for example, 1234567891@talktalk.net');            

            helpers.nextSteps(session);
        },
        function (session, results) {
            if(!helpers.continue(session, results)) {
                return;
            }
            session.send("Next, you need to enter in the password.  this is the password your router uses to connect to the exchange. If you don't know it, You can call our automated reminder service on 0345 172 0049.");

            helpers.nextSteps(session);
        },
        function (session, results) {
            if(!helpers.continue(session, results)) {
                return;
            }
            session.send('Great, next you will need to enable IGMP Proxy.');
            session.send('If this option is not visible, try adding a second connection bridge using the VPI / VCI settings below:');
            session.send('Set the IGMP Proxy to IGMP V2/V3, Enable IGMP Snooping, VPI: 0, VCI: 65, QoS: ubr, Encapsulation: 1483 Bridged Only LLC, BridgeType: PPP');

            helpers.nextSteps(session);
        },
        function (session, results) {
            session.send('Ok now that should be done. All you have to do is save those changes and just turn the router and TV Box off and on again and you should be sorted.');
            
            session.beginDialog('EndRouterSetup');
        }
    ]);

    bot.dialog('SocketTypeRouter', [
        function (session) {
            session.send('Find your master socket');
            session.send('Your master socket is the main phone socket in your home - it’s usually a little larger than a normal phone socket and often has a horizontal line in the middle.');
            session.send('The type of master socket you have will determine whether or not you need to use microfilters');
            helpers.nextSteps(session);
        },
        function (session, results) {
            if(!helpers.continue(session, results)) {
                return;
            }
            session.send(helpers.createImageCard(session, 'Types of Sockets', '', '', 'https://i.imgur.com/k6XkRzw.png', []));
            builder.Prompts.choice(session, 'What type of socket do you have?', ['Standard','Pre-filtered']);
        },
        function (session, results) {
            if(results.response.entity == 'Standard'){
                session.beginDialog('DisconnectRouter');
                session.beginDialog('ConnectMicrofilters');
                session.beginDialog('ConnectStandardSocketRouter');                
            } else {
                session.beginDialog('DisconnectRouter');
                session.beginDialog('ConnectPreFilteredSocketRouter');
            }
        }
    ]);

    bot.dialog('DisconnectRouter', [
        (session) => {
            session.send('Unplug everything from your master socket and all other sockets in your home, including:');
            session.send('Your phone cable');
            session.send('Any microfilters');
            session.send('Any splitters');
        }
        
    ]);

    bot.dialog('ConnectMicrofilters', () => {
        //TODO: Connect the microfilters pictures
        
    });

    bot.dialog('ConnectStandardSocketRouter', () => {
        //TODO: card with pictures on how to connect up router that includes some filter stuff
    });

    bot.dialog('ConnectPreFilteredSocketRouter', [
        (session) => {
            session.send(helpers.createImageCard(session, 'Connect A Pre-filtered Socket Router', '', '', 'https://m0.ttxm.co.uk/gfx/help/d-link_3782_setup_2.png', []));
            session.send('Connect one end of the grey broadband cable into your master socket.');
            session.send('Connect the other end of the broadband cable into the Broadband port on the back of your router.');

            helpers.nextSteps(session);
        }, 
        (session, results) => {
            if(!helpers.continue(session, results)) {
                return;
            }
            session.beginDialog('PowerUpRouter');
        }
    ]);

    bot.dialog('PowerUpRouter', [
        (session) => {
        session.send(helpers.createImageCard(session, 'Power Up Your Router', '', '', 'https://m0.ttxm.co.uk/gfx/help/broadband/power_router_on_dlink_3782.png', []));
        session.send('Plug in the power supply at the wall and connect the other end to the back of the TalkTalk Router. Turn on the power.');
        session.send('Press the on/off switch found at the side of the TalkTalk Router.');
        session.send('Your line is activated when the Power, Broadband and Internet lights go solid green. This can take a few minutes.'); 
        
        builder.Prompts.choice(session,'Are there 3 solid green lights?', ['Yes', 'No']);
        },
        (session, results) => {
            if(results.response.entity == 'Yes'){
                session.send('You are connected!');
                session.beginDialog('EndRouterSetup');
            } else {
                session.beginDialog('RouterContactUs');
            }
        }
    ]);

    bot.dialog('RouterContactUs', (session) => {
        session.endDialog('Please contact us via: 0345 172 0088');
    });

    bot.dialog('EndRouterSetup', [
        function (session) {
            builder.Prompts.choice(session, 'Is there anything else I can help you with?', ['Yes', 'No']);
        },
        function (session, results) {
            if(results.response.entity == 'Yes'){
                session.beginDialog('WifiSetup');
            } else {
                session.endDialog('Ok, have a nice day!');
            }
        }]
    );
}

module.exports = routerSetup;