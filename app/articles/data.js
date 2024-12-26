const count = 100;//this much articles will be generated

const day = 1000 * 60 * 60 * 24;//1 day in milliseconds

const articles = Array.from({ length: count }).map((_, id) => ({
    id,
    title: `Title of article ${id}`,
    body: `This is the body of article ${id}`,
    //each article has a differend date. The first one is the oldest. 
    lastModified: new Date(Date.now() - (count - id) * day)
}))

//these are marked as async to simulate how a real database works
export async function getAllArticles() {
    return articles;
}

export async function getArticleById(id) {
    return articles[id];
}

export async function getArticleRange({ start, end }) {
    return articles.slice(start, end);
}