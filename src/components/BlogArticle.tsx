export const BlogArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = slug ? articles[slug] : undefined;

  if (!article) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-black">
            Article Not Found
          </h1>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 mt-6 text-amber-400 font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  // Your real website URL
  const canonical =
    `https://power-bi-dashboard-templates.vercel.app/blog/${slug}`;

  return (
    <>
      <SEO
        title={`${article.title} | Power BI Dashboard Templates`}
        description={article.description}
        canonical={canonical}
        type="article"
      />

      <main className="min-h-screen bg-slate-950 text-white">
        <article className="max-w-4xl mx-auto px-6 py-16">

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Power BI Blog
          </Link>

          <div className="mb-10">

            <span className="text-sm font-bold text-amber-400 uppercase tracking-wider">
              {article.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-black leading-tight mt-4">
              {article.title}
            </h1>

            <p className="text-lg text-slate-400 leading-8 mt-6">
              {article.description}
            </p>

          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            {article.content}
          </div>

          <div className="mt-14 pt-8 border-t border-slate-800">

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300"
            >
              Explore Power BI Dashboard Templates
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

        </article>
      </main>
    </>
  );
};
