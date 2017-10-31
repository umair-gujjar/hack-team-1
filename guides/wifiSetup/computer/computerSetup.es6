function computerSetup(builder, bot) {
    let HelpersConstructor = require('../../../common/helpers.es6');
    let helpers = new HelpersConstructor(builder);

    require('./appleOS.es6')(builder, bot);
    require('./windows10.es6')(builder, bot);

    bot.dialog('Computer', [
        (session) => {
            builder.Prompts.choice(session, 'What kind of operating system you have on that device?', [
                'Apple OS',
                'Windows 10',
            ]);
        },
        (session, results) => {
            if(results.response.entity == 'Apple OS'){
                session.beginDialog('Apple OS');
            } else {
                session.beginDialog('Windows 10')
            }
        },
    ]);

    bot.dialog('EndComputerSetup', [
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

module.exports = computerSetup;