import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const getArticles = async () => {
            const resp = await fetch('/api/articles');
            const articlesResp = await resp.json();
            setArticles(articlesResp);
        };

        getArticles();
    }, []);

    return (
        <div>
            <h1>Articles</h1>
            {articles.map(article => (
                <div key={article.id}>
                    <h2>
                        <Link to={`/articles/${article.id}`}>{article.title}</Link>
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default Articles;
