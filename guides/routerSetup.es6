function routerSetup (builder, bot) {
    let helpersConstructor = require('../common/helpers.es6');
    let helpers = new helpersConstructor(builder);
    bot.dialog('RouterSetup', [
        function (session) {
            builder.Prompts.choice(session, 'Would you prefer a video or walkthrough?', ['Walkthrough', 'Video']);
        },
        function (session, results) {
            session.userData.setupChoice = results.response.entity;
            if(session.userData.setupChoice == 'Video'){
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
                'D-Link 3782 Super Router',
                'HG633 Super Router',
                'Non-TalkTalk Router'
            ]);
        },
        (session, results) => {
            session.beginDialog(results.response.entity);
        }]
    );

    bot.dialog('D-Link 3782 Super Router', [(session)=>{
        session.send(helpers.createImageCard(session, 'Router Components', 'Do you have all these parts?', '', 'https://m0.ttxm.co.uk/gfx/help/broadband/d-link_3782_box_contents.png', ['Yes', 'No']));
    }]);

    bot.dialog('HG633 Super Router', [(session)=>{

    }]);

    bot.dialog('Non-TalkTalk Router', [(session)=>{

    }]);

    bot.dialog('SocketTypeRouter', [(session) => {
            session.send('Find your master socket');
            session.send('Your master socket is the main phone socket in your home - it’s usually a little larger than a normal phone socket and often has a horizontal line in the middle.');
            session.send('The type of master socket you have will determine whether or not you need to use microfilters');
        }
    ]);

    bot.dialog('DisconnectRouter', [(session) => {
            session.send('Unplug everything from your master socket and all other sockets in your home, including:');
            session.send('Your phone cable');
            session.send('Any microfilters');
            session.send('Any splitters');
        }
    ]);

    bot.dialog('RouterContactUs', (session) => {
        session.endDialog('Please contact us via: 0345 172 0088');
    });

    bot.dialog('EndRouterSetup', (session) => {
       session.endDialog('Is there anything else I can help you with?'); 
    });
}

module.exports = routerSetup;