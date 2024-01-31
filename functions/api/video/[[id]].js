import videos from './data'

export function onRequestGet(context) {
    const id = context.params.id

    if (!id) {
        return new Response('Not found', { status: 404 })
    }

    const video = videos.find(video => video.id === Number(id))

    if (!video) {
        return new Response('Not found', { status: 404 })
    }

    return Response.json(video)
}
