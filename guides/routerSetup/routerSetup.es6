function routerSetup (builder, bot) {
    let helpersConstructor = require('../../common/helpers.es6');
    let helpers = new helpersConstructor(builder);

    require('./D-Link.es6')(builder, bot);
    require('./HG633.es6')(builder, bot);
    require('./Non-TalkTalk.es6')(builder, bot);

    bot.dialog('RouterSetup', [
        (session) => {
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
        (session) => {
            builder.Prompts.choice(session, 'Is there anything else I can help you with?', ['Yes', 'No']);
        },
        (session, results) =>{
            if(results.response.entity == 'Yes'){
                session.beginDialog('WifiSetup');
            } else {
                session.endDialog('Ok, have a nice day!');
            }
        }]
    );
}

module.exports = routerSetup;