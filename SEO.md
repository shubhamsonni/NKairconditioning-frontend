# SEO deployment and indexing

The public domain was checked during this change. It currently serves WordPress, not this Next.js application. Its homepage returned an empty HTML title. Improvements in this repository affect search engines only after deployment to the public domain.

## Included in the code

- Unique page titles, descriptions, canonical and social URLs; the homepage canonical is no longer inherited by unrelated pages.
- One primary homepage heading, optimized shop hero image and fewer initial slideshow image downloads.
- HVACBusiness, WebSite, service and breadcrumb JSON-LD using the existing address and phone number. No invented review ratings, certifications, prices or business branches were added.
- Category-specific service explanations provided by the backend; category card names remain unchanged.
- Crawlable links to every category and service area.
- A sitemap containing the 27 public canonical pages, without generated modification dates that misrepresent content changes. API responses are excluded from crawling; public media remains accessible.
- Permanent redirects for matching URLs from the existing WordPress page sitemap. Keep these redirects when migrating. Window AC points to the rental page, which contains the existing window AC offering.

## Deployment settings

1. Deploy the backend, including `dist/` and `public/work/`, and restart it so the updated API supplies SEO fields. Configure `API_URL` on the frontend.
2. Set `SITE_URL=https://nkairconditioning.com` for the frontend (the default). All canonical, structured data and sitemap URLs use this origin. Select one HTTPS hostname and redirect the other hostname at the hosting/DNS provider.
3. Deploy this Next.js frontend to the public domain, replacing the old WordPress pages. Retain relevant incoming URLs through the included redirects.
4. If using Google Search Console HTML verification, set `GOOGLE_SITE_VERIFICATION` to the exact token supplied by Google, then rebuild. DNS verification can instead be configured with the domain provider.

## Actions requiring owner access

- Verify the domain in Google Search Console, submit `/sitemap.xml` and inspect the homepage and key service URLs. Review actual indexing exclusions, manual actions, search impressions and queries there; a web search alone cannot establish the indexing diagnosis.
- Maintain a verified Google Business Profile with the same business name, phone, real shop address, correct category, actual hours and this website URL. Add authentic project/shop photos and seek genuine customer reviews.
- Validate the deployed structured data with Google's Rich Results Test and inspect mobile performance with PageSpeed Insights. No ranking or rich-result placement is guaranteed.
- Monitor crawl errors and impressions after deployment. Google needs to recrawl before changes can affect results.

## Validation

Build both applications and run backend tests. With a frontend listening on port 3100 and the matching backend running, execute `node --test tests/seo.test.cjs` from `Frontend/`. Use `SEO_TEST_URL` to test another deployment. The tests check rendered metadata, one H1, JSON-LD, canonical uniqueness, sitemap/robots, legacy redirects and genuine 404 responses.
