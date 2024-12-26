import { sitemapList } from "../sitemaps/articles/sitemap";
import { generalSitemapIndex } from "../sitemaps/general/sitemap";

export async function GET() {
    console.log("the index sitemap is generated");

    //this includes the url and last modified date of each sitemap
    const sitemaps = [
        generalSitemapIndex,
        ...(await sitemapList())
    ]

    //convert the objects to a valid XML text
    const sitemapXML = buildSitemapIndex(sitemaps);

    //return the XML
    return new Response(sitemapXML, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}

// Function to construct the XML structure of the sitemap index.
function buildSitemapIndex(sitemaps) {
    // XML declaration and opening tag for the sitemap index.
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    // Iterate over each sitemap URL and add it to the sitemap index.
    sitemaps.forEach(sitemap => {
        xml += "<sitemap>";
        xml += `<loc>${sitemap.url}</loc>`; // Location tag specifying the URL of a sitemap file.
        xml += `<lastmod>${sitemap.lastModified.toISOString()}</lastmod>`
        xml += "</sitemap>";
    });

    // Closing tag for the sitemap index.
    xml += "</sitemapindex>";
    return xml;
}

//set a short cache time to see when the sitemap is revalidated
export const revalidate = 60;