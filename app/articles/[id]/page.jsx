import { notFound } from "next/navigation";
import { getArticleById } from "../data";

export default async function Page({ params }) {
    const { id } = await params;
    const article = await getArticleById(id);

    if (!article)
        notFound();

    return (
        <div style={{ margin: 50 }}>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
        </div>
    )
}