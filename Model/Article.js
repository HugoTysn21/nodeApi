'use strict';

module.exports = class Article {

    title;
    content;
    user_id;

    constructor(title, content, user_id) {
        this.title = title;
        this.content = content;
        this.user_id = user_id;
    }
}