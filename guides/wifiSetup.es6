function wifiSetup (builder, bot) {
    require('./routerSetup/routerSetup.es6')(builder, bot);
    require('./wifiSetup/computer/computerSetup.es6')(builder, bot);
    require('./wifiSetup/mobile/mobileSetup.es6')(builder, bot);
    /*require('./gamingConsole.es6')(builder, bot);
    require('./kindleSetup.es6')(builder, bot);
    require('./mobileSetup.es6')(builder, bot);
    require('./powerlineAdapterSetup.es6')(builder, bot);
    require('./smartTVSetup.es6')(builder, bot);
    require('./tabletSetup.es6')(builder, bot);*/

    bot.dialog('WifiSetup', [
        (session) => {
            builder.Prompts.choice(session, 'What kind of device you want to connect with wifi?', [
                'Router',
                'Computer',
                'Mobile',
            ]);
        },
        (session, results) => {
            session.beginDialog(results.response.entity);
        }
    ]).triggerAction({
        matches: 'WifiSetup'
    });

    bot.dialog('Router', [
        (session, results) => {
            session.beginDialog('RouterSetup');
        }
    ]);
}

module.exports = wifiSetup;