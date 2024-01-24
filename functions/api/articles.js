import articles from './article/data';

export function onRequestGet() {
    return Response.json(articles);
}