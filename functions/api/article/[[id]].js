import articles from './data';

export function onRequestGet(context) {
    const id = context.params.id;

    if (!id) {
        return new Response('Not found', { status: 404 });
    }

    const article = articles.find(article => article.id === Number(id));

    if (!article) {
        return new Response('Not found', { status: 404 });
    }

    return Response.json(article);
}
