const prettier = require('prettier');
const fs = require('node:fs');

const Sitemap = async () => {
    let videoData = [];
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');

    const getVideos = async () => {
        const resp = await fetch(`/api/video/`);
        const videosResp = await resp.json();
        videoData = videosResp;
    };

    getVideos();

    const sitemap = `
            <?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://cherry-coaching.com/</loc>
                <lastmod>2024-12-19T20:55:29+01:00</lastmod>
                <priority>0.6</priority>
            </url>
            <url>
                <loc>https://cherry-coaching.com/about</loc>
                <lastmod>2024-12-19T20:55:29+01:00</lastmod>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>https://cherry-coaching.com/articles/</loc>
                <lastmod>2024-12-19T20:55:29+01:00</lastmod>
                <priority>0.8</priority>
            </url>
            <url>
                <loc>https://cherry-coaching.com/articles</loc>
                <lastmod>2024-12-19T20:55:29+01:00</lastmod>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>https://cherry-coaching.com/video/</loc>
                <lastmod>2024-12-19T20:55:29+01:00</lastmod>
                <priority>0.8</priority>
            </url>
            <url>
                <loc>https://cherry-coaching.com/videos</loc>
                <lastmod>2024-12-19T20:55:29+01:00</lastmod>
                <priority>1.0</priority>
            </url>
            ${videoData.map(video => {
                return `
                <url>
                    <loc>${`https://cherry-coaching.com/video/${video.id}`}</loc>
                    <changefreq>daily</changefreq>
                    <priority>0.8</priority>
                </url>
                `;
            })}
            </urlset>`;

    try {
        const formatted = await prettier.format(sitemap, {
            ...prettierConfig,
            parser: 'html',
        });
    
        fs.writeFileSync('public/sitemap.xml', formatted);
        console.log('Sitemap generated successfully.');
        } catch (error) {
        console.error('Error generating sitemap:', error);
        }
}

Sitemap();
