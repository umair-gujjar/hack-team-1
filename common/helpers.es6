function Helpers(builder) {
    this.createVideoCard = function (session, title, subtitle, url) {
        return new builder.VideoCard(session)
            .title(title)
            .subtitle(subtitle)
            .media([
                { url: url }
            ]);
    }
}

module.exports = Helpers;