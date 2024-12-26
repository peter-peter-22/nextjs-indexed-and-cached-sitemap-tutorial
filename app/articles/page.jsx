import { getAllArticles } from "./data"
import Link from "next/link"

export default async function Page() {
    const articles = await getAllArticles();
    return (
        <div style={{ margin: 50 }}>
            <h1>Articles</h1>
            <ul >
                {articles.map(article => (
                    <li key={article.id}>
                        <Link href={`/articles/${article.id}`}>
                            Article {article.id}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}