import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export default async function VideoData(id) {
  if (!id) {
    const ps = await getRequestContext().env.videoDB.prepare(`SELECT name, id FROM demos`);
    const { results } = await ps.all();
    console.log(results);
    return Response.json(results);
  } else {
    const ps = await getRequestContext().env.videoDB.prepare(`SELECT * FROM demos WHERE id = '${id}' LIMIT 1`);
    const { results } = await ps.all();
    console.log(results);

    if (!results) {
        return new Response('Not found', { status: 404 });
    }
    return Response.json(results[0]);
  }
}

