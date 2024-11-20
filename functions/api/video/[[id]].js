export async function onRequestGet(context) {
    const id = context.params.id;

    if (!id) {
        const ps = await context.env.videoDB.prepare(`SELECT name, id FROM demos`);
        const { results } = await ps.all();
        return Response.json(results);
    }

    const ps = context.env.videoDB.prepare(`SELECT * FROM demos WHERE id = '${id}' LIMIT 1`);
    const { results } = await ps.all();

    if (!results) {
        return new Response('Not found', { status: 404 });
    }

    return Response.json(results[0]);
}
