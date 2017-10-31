function computerSetup(builder, bot) {
    let HelpersConstructor = require('../../../common/helpers.es6');
    let helpers = new HelpersConstructor(builder);

    require('./apple.es6')(builder, bot);
    require('./android.es6')(builder, bot);

    bot.dialog('Mobile', [
        (session) => {
            builder.Prompts.choice(session, 'What kind of device do you want to set up?', [
                'Apple',
                'Android',
            ]);
        },
        (session, results) => {
            if(results.response.entity == 'Apple'){
                session.beginDialog('Apple');
            } else {
                session.beginDialog('Android');
            }
        }
    ]);

    bot.dialog('EndMobileSetup', [
        (session) => {
            builder.Prompts.choice(session, 'Is there anything else I can help you with?', ['Yes', 'No']);
        },
        (session, results) =>{
            if(results.response.entity == 'Yes'){
                session.beginDialog('WifiSetup');
            } else {
                session.endDialog('Ok, have a nice day!');
            }
        }
    ]);
}

module.exports = computerSetup;