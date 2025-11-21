import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import sitesData from "../data/sites.json";

export default function Home({ categories }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Theme toggle handler
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    const handleThemeToggle = () => {
      if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        localStorage.setItem("theme", "light");
      }
    };

    if (themeToggle) {
      themeToggle.addEventListener("click", handleThemeToggle);
    }

    return () => {
      if (themeToggle)
        themeToggle.removeEventListener("click", handleThemeToggle);
    };
  }, []);

  return (
    <>
      <Head>
        <title>
          Pirates Treasure - Best Free Games, Movies & Streaming Directory 2025
        </title>
        <meta
          name="title"
          content="Pirates Treasure - Best Free Games, Movies & Streaming Directory 2025"
        />
        <meta
          name="description"
          content="Discover 1000+ curated resources: Top sites, free games, movie streaming, software, books & music. Updated daily with the best free and premium content sites."
        />
        <meta
          name="keywords"
          content="best sites 2025, top adult sites, free games download, movie streaming sites, free software, pirate sites directory"
        />
        <meta name="author" content="Pirates Treasure" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://piratestreasure.dev/" />
        <meta
          property="og:title"
          content="Pirates Treasure - Best Free Content Directory 2025"
        />
        <meta
          property="og:description"
          content="Your ultimate directory for 1000+ top sites, free games, movies, streaming and more. Curated daily."
        />
        <meta
          property="og:image"
          content="https://piratestreasure.dev/logo.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://piratestreasure.dev/" />
        <meta
          property="twitter:title"
          content="Pirates Treasure - Best Free Content Directory 2025"
        />
        <meta
          property="twitter:description"
          content="Your ultimate directory for 1000+ top sites, free games, movies, streaming and more. Curated daily."
        />
        <meta
          property="twitter:image"
          content="https://piratestreasure.dev/logo.png"
        />
        <link rel="canonical" href="https://piratestreasure.dev/" />
      </Head>

      <button
        className="theme-toggle"
        id="themeToggle"
        aria-label="Toggle theme"
      >
        <span className="sun-icon">☀️</span>
        <span className="moon-icon">🌙</span>
      </button>

      <div className="container">
        <header>
          <div className="logo">
            <Link href="/">
              <img
                src="/logo.png"
                alt="Pirates Treasure Logo"
                className="logo-image"
              />
            </Link>
          </div>
        </header>

        <div className="cards-grid" id="cardsGrid">
          {categories.map((category) => (
            <Link href={`/category/${category.slug}`} key={category.slug}>
              <div className="card" data-category={category.slug}>
                <span className="card-count-badge">{category.count} sites</span>
                <div className="card-icon">{category.icon}</div>
                <h2>{category.title}</h2>
                <p>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="seo-footer">
        <div className="footer-keywords">
          <p>
            <strong>Pirates Treasure</strong> - Your ultimate directory for
            movie streaming, game downloads, anime watching, manhwa reading, and
            software downloads. Find the best free adult content, HD movies, PC
            games, mobile apps, ebooks, music streaming, and learning resources.
            Updated daily with 1000+ curated sites including torrent sites,
            streaming platforms, and download portals. Discover top rated adult
            sites, free game sites, movie streaming services, anime platforms,
            manga readers, novel sites, software repositories, and more.
          </p>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2025 Pirates Treasure. All content is user-submitted. We do
            not host any files. <Link href="/about">About</Link> |{" "}
            <Link href="/dmca">DMCA</Link>
          </p>
        </div>
      </footer>
    </>
  );
}

export async function getStaticProps() {
  // Calculate site counts for each category
  const categories = Object.keys(sitesData).map((slug) => {
    const data = sitesData[slug];
    let count = 0;

    if (data.categories) {
      data.categories.forEach((cat) => {
        count += cat.sites.length;
      });
    }

    return {
      slug,
      icon: data.icon,
      title: data.title,
      count,
      description: `Discover amazing ${slug} and ${slug} resources`,
    };
  });

  return {
    props: {
      categories,
    },
  };
}
