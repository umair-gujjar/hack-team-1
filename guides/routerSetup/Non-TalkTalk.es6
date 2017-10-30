function NonTalkTalk (builder, bot) {
    let helpersConstructor = require('../../common/helpers.es6');
    let helpers = new helpersConstructor(builder);

    bot.dialog('Non-TalkTalk Router', [
        (session)=>{
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
        (session) => {
            session.send('Ok, you need to enter the following information manually into the connection settings on your router. This would be visit the manufacturer’s website or check your router manual.');
            session.send('First, you need to add a username. This will be your telephone number followed by @talktalk.net - for example, 1234567891@talktalk.net');
            
            helpers.nextSteps(session);
        },
        (session) => {
            if(!helpers.continue(session, results)) {
                return;
            }

            session.send("Next, you need to enter in the password.  this is the password your router uses to connect to the exchange. If you don't know it, You can call our automated reminder service on 0345 172 0049.");
            
            helpers.nextSteps(session);
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                return;
            }

            session.send('Ok now, you need to set the following things to this values: VPI: 0, VCI: 38, MTU: 1432, DNS settings: Set as automatic (or similar), Encapsulation: PPP over ATM (PPPoA) using VC-MUX, Modulation Type: Auto');
        
            helpers.nextSteps(session);
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                return;
            }

            session.send('Ok now that should be done. All you have to do is save those changes and just turn the router off and on again and you should be sorted.');

            session.beginDialog('EndRouterSetup');
        }
    ]);
    
    bot.dialog('TalkTalk TV', [
        (session) => {
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
        (session) => {
            session.send('First, you need to add a username. This will be your telephone number followed by @talktalk.net - for example, 1234567891@talktalk.net');            

            helpers.nextSteps(session);
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                return;
            }
            session.send("Next, you need to enter in the password.  this is the password your router uses to connect to the exchange. If you don't know it, You can call our automated reminder service on 0345 172 0049.");

            helpers.nextSteps(session);
        },
        (session, results) => {
            if(!helpers.continue(session, results)) {
                return;
            }
            session.send('Great, next you will need to enable IGMP Proxy.');
            session.send('If this option is not visible, try adding a second connection bridge using the VPI / VCI settings below:');
            session.send('Set the IGMP Proxy to IGMP V2/V3, Enable IGMP Snooping, VPI: 0, VCI: 65, QoS: ubr, Encapsulation: 1483 Bridged Only LLC, BridgeType: PPP');

            helpers.nextSteps(session);
        },
        (session, results) => {
            session.send('Ok now that should be done. All you have to do is save those changes and just turn the router and TV Box off and on again and you should be sorted.');
            
            session.beginDialog('EndRouterSetup');
        }
    ]);
}

module.exports = NonTalkTalk;