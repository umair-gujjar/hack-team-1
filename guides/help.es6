function help (builder, bot) {
    bot.dialog('Help', (session) => {
            session.endDialog('You can ask help for setting up your router or connecting your device to the internet.');
    }).triggerAction({
        matches: 'Help'
    });
}

module.exports = help;