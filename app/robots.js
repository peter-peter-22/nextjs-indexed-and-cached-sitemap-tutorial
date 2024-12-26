import { baseUrl } from "./constants";

export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: [
                "/",
                "/articles/"
            ],
            disallow: [
                "/articles$",
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}