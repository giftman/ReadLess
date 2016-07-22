'use strict';

import type {Article} from '../../reducers/reading';

function byType(articles: Array<Article>, typeId: number): Array<Article> {
  return Array.isArray(articles)? articles.filter((article) => article.typeId == typeId):[];
}

module.exports = {byType};
