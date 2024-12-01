import Head from "next/head";

export default function PagesMetaData({metadata}) {

    return (
        <Head>
            {/* Basic */}
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />

            {/* Open Graph */}
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:image" content={metadata.image} />
            <meta property="og:url" content={metadata.siteURL} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={metadata.siteName} />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metadata.title} />
            <meta name="twitter:description" content={metadata.description} />
            <meta name="twitter:image" content={metadata.image} />
        </Head>
    )
}

