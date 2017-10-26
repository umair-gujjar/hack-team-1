function help (builder, bot) {
    bot.dialog('Help', function (session) {
        session.endDialog('You can ask help for: setting up your router');
    }).triggerAction({
        matches: 'Help'
    });
}

module.exports = help;