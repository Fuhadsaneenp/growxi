import { Helmet } from "react-helmet-async"

const SITE = "https://growxi.com"

export function SEO({
	title,
	description,
	path = "/",
}: {
	title: string
	description: string
	path?: string
}) {
	const url = SITE + path
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={SITE + "/og-image.png"} />
			<meta name="twitter:card" content="summary_large_image" />
			<link rel="canonical" href={url} />
		</Helmet>
	)
}
