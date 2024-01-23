import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Article = () => {
    const [article, setArticle] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const getArticle = async () => {
            const resp = await fetch(`/api/article/${id}`);
            const articleResp = await resp.json();
            setArticle(articleResp);
        };

        getArticle();
    }, [id]);

    if (!Object.keys(article).length) return <div />;

    return (
        <div>
            <h1>{article.title}</h1>
            <p>{article.text}</p>
            <p>
                <em>Published {new Date(article.published_at).toLocaleString()}</em>
            </p>
            <p>
                <Link to="/">Go back</Link>
            </p>
        </div>
    );
};

export default Article;
