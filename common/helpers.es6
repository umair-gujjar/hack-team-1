function Helpers(builder) {
    this.createVideoCard = function (session, title, subtitle, url) {
        return new builder.VideoCard(session)
            .title(title)
            .subtitle(subtitle)
            .media([
                { url: url }
            ]);
    }

    this.createImageCard = function (session, title, subtitle, text, url) {
        return new builder.HeroCard(session)
            .title(title)
            .subtitle(subtitle)
            .text(text)
            .images([
                builder.CardImage.create(session, url)
            ])
    }
}

module.exports = Helpers;