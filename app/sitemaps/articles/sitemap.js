import { getAllArticles, getArticleRange } from "@/app/articles/data"
import { baseUrl } from "@/app/constants";

const articlesPerSitemap = 10;

//determine how much sitemaps are necessary to hold all the articles, and create an array with the sitemap ids
//this function will be called by nextjs on build time to get how much sitemaps it has to generate
export async function generateSitemaps() {
    const articleCount = (await getAllArticles()).length;
    const sitemapCount = Math.ceil(articleCount / articlesPerSitemap);
    return Array.from({ length: sitemapCount }).map((_, id) => ({ id }));
}

//return a sitemap that holds a page articles
export default async function sitemap({ id }) {
    // Google's limit is 50,000 URLs per sitemap, but we use 10 to see multiple sitemaps without generating too much data
    const start = id * articlesPerSitemap;
    const end = start + articlesPerSitemap;

    //get a page of articles
    const articles = await getArticleRange({ start, end });

    return articles.map((article) => ({
        url: `${baseUrl}/articles/${article.id}`,
        priority: 0.5,//0.5 is the default, specifying this is not necessary
        lastModified: article.lastModified,
    }))
}

//this array provides the necessary data about the sitemaps for the index sitemap
export async function sitemapList() {
    const articleCount = (await getAllArticles()).length;
    const sitemapCount = Math.ceil(articleCount / articlesPerSitemap);

    //create an array of promises those get the data of the pages
    const promises = Array.from({ length: sitemapCount }).map((_, id) => getPageIndex(id));

    //complete all promises in parrarel
    const articles = await Promise.all(promises);

    return articles;
}

//get the index data of a sitemap page
//an entry in the index sitemap usually contains: url, last modified date
async function getPageIndex(id) {
    const start = id * articlesPerSitemap;
    const end = start + articlesPerSitemap;
    const articles = await getArticleRange({ start, end });

    const newestData = articles.reduce((newest, current) => {
        return new Date(current.lastModified) > new Date(newest.lastModified) ? current : newest;
    }, articles[0]);

    return {
        url: `${baseUrl}/sitemaps/articles/`,
        lastModified: newestData.lastModified
    }
}

export const revalidate = 3600;