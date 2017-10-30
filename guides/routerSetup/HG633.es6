function HG633 (builder, bot) {
    let helpersConstructor = require('../../common/helpers.es6');
    let helpers = new helpersConstructor(builder);

    bot.dialog('HG633 Super Router', [
        (session) => {
            session.send(helpers.createImageCard(session, 'Router Components', 'Do you have all these parts?', '', 'https://m0.ttxm.co.uk/gfx/help/broadband/d-link_3782_box_contents.png', []));
            if(session.message.source == 'facebook'){
                builder.Prompts.choice(session,'Do you have all these parts?', ['Yes','No']);
            } else {
                builder.Prompts.choice(session,' ', ['Yes','No']);
            }
        },
        (session, results) => {
            if(results.response.entity == 'Yes') {
                session.beginDialog('HG633_SocketTypeRouter');
            } else {
                session.beginDialog('RouterContactUs');
            }
        }
    ]);

    bot.dialog('HG633_SocketTypeRouter', [
        (session) => {
            session.send('Find your master socket');
            session.send('Your master socket is the main phone socket in your home - it’s usually a little larger than a normal phone socket and often has a horizontal line in the middle.');
            session.send('The type of master socket you have will determine whether or not you need to use microfilters');
            helpers.nextSteps(session);
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                return;
            }
            session.send(helpers.createImageCard(session, 'Types of Sockets', '', '', 'https://m0.ttxm.co.uk/gfx/help/standard_prefiltered_socket.png', []));
            builder.Prompts.choice(session, 'What type of socket do you have?', ['Standard','Pre-filtered']);
        },
        (session, results) => {
            if(results.response.entity == 'Standard'){
                session.beginDialog('HG633_DisconnectRouter');
                session.beginDialog('HG633_ConnectMicrofilters');            
            } else {
                session.beginDialog('HG633_DisconnectRouter');
                session.beginDialog('HG633_ConnectPreFilteredSocketRouter');
            }
        }
    ]);

    bot.dialog('HG633_DisconnectRouter', [
        (session) => {
            session.send('Unplug everything from your master socket and all other sockets in your home, including:');
            session.send('Your phone cable');
            session.send('Any microfilters');
            session.send('Any splitters');
        }
    ]);

    bot.dialog('HG633_ConnectMicrofilters', [
        (session) => {
            helpers.nextSteps(session);
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                return;
            }

            session.send(helpers.createImageCard(session, 'Connect Microfilters', '', '', 'http://m2.ttxm.co.uk/gfx/help/2316/phone_microfilter_diagram_9052.png', []));
            session.send('Plug your microfilter into your master socket.');
            session.send('If you have a phone, plug the cable into the Phone port on the microfilter.');
            session.send("It's important that you plug a microfilter into every socket you're using in your home. You can buy extra microfilters from the TalkTalk Shop or any electronics shop. ");
            session.send('Never plug microfilters into other microfilters. This will affect your broadband performance');

            helpers.nextSteps(session);
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                return;
            }
            session.beginDialog('HG633_ConnectStandardSocketRouter');   
        }
    ]);

    bot.dialog('HG633_ConnectStandardSocketRouter', [
        (session) => {
            session.send(helpers.createImageCard(session, 'Connect Router to Standard Socket ', '', '', 'https://m0.ttxm.co.uk/gfx/help/d-link_3782_setup_1.png', []));
            session.send('Connect one end of the grey broadband cable into the ADSL port on your microfilter.');
            session.send('Connect the other end of the broadband cable into the Broadband port on the back of your router.');
            helpers.nextSteps(session);
        }, 
        (session, results) => {
            if(!helpers.continue(session, results)) {
                return;
            }
            session.beginDialog('HG633_PowerUpRouter');
        }
    ]);

    bot.dialog('HG633_ConnectPreFilteredSocketRouter', [
        (session) => {
            helpers.nextSteps(session);
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                return;
            }

            session.send(helpers.createImageCard(session, 'Connect A Pre-filtered Socket Router', '', '', 'https://m0.ttxm.co.uk/gfx/help/d-link_3782_setup_2.png', []));
            session.send('Connect one end of the grey broadband cable into your master socket.');
            session.send('Connect the other end of the broadband cable into the Broadband port on the back of your router.');

            helpers.nextSteps(session);
        }, 
        (session, results) => {
            if(!helpers.continue(session, results)) {
                return;
            }
            session.beginDialog('HG633_PowerUpRouter');
        }
    ]);

    bot.dialog('HG633_PowerUpRouter', [
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
}

module.exports = HG633;