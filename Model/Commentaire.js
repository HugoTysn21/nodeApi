'use strict';

module.exports = class Commentaire {

    content;
    user_id;
    article_id;

    constructor(content, date_publi, user_id,article_id) {
        this.content = content;
        this.user_id = user_id;
        this.article_id = article_id;
    }
}