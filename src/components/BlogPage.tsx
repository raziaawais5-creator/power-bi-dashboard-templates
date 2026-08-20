import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
} from 'lucide-react';
import { SEO } from './SEO';

const SITE_URL = 'https://power-bi-dashboard-templates.vercel.app';

const articles = [
  {
    slug: 'how-to-create-a-sales-dashboard-in-power-bi',
    title: 'How to Create a Sales Dashboard in Power BI',
    description:
      'Learn how to build a professional Power BI sales dashboard with KPIs, revenue analysis, sales targets, pipeline metrics and interactive filters.',
    category: 'Power BI Sales',
  },
  {
    slug: 'best-power-bi-dashboard-templates',
    title: 'Best Power BI Dashboard Templates',
    description:
      'Compare the most useful Power BI dashboard templates for sales, finance, HR and e-commerce analytics.',
    category: 'Power BI Templates',
  },
  {
    slug: 'power-bi-finance-dashboard-guide',
    title: 'Power BI Finance Dashboard Guide',
    description:
      'Learn how to build a finance dashboard in Power BI for revenue, expenses, EBITDA, cash flow, budgets and financial KPIs.',
    category: 'Power BI Finance',
  },
  {
    slug: 'power-bi-dax-measures',
    title: 'Power BI DAX Measures: Complete Guide',
    description:
      'Understand essential DAX measures for Power BI including CALCULATE, SUM, DIVIDE, time intelligence and variance analysis.',
    category: 'Power BI DAX',
  },
  {
    slug: 'power-bi-hr-dashboard-guide',
    title: 'Power BI HR Dashboard Guide',
    description:
      'Build an HR analytics dashboard in Power BI to track headcount, turnover, hiring, employee performance and workforce trends.',
    category: 'Power BI HR',
  },
  {
    slug: 'power-bi-ecommerce-dashboard',
    title: 'Power BI E-commerce Dashboard Guide',
    description:
      'Create an e-commerce analytics dashboard using Power BI to monitor revenue, orders, conversion rate, ROAS, CAC and customer metrics.',
    category: 'Power BI E-commerce',
  },
];

export const BlogPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Power BI Dashboard Guides & Tutorials | Power BI Dashboard Templates"
        description="Learn Power BI with practical dashboard tutorials covering sales, finance, HR, e-commerce, DAX measures and professional Power BI dashboard templates."
        canonical={`${SITE_URL}/blog`}
        type="website"
      />

      <main className="min-h-screen bg-slate-950 text-white">

        {/* HERO */}
        <section className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-sm font-semibold mb-6">
                <BookOpen className="w-4 h-4" />
                Power BI Resources
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                Power BI Dashboard Guides & Tutorials
              </h1>

              <p className="mt-6 text-lg text-slate-400 leading-8">
                Practical Power BI tutorials covering dashboard design,
                DAX measures, sales analytics, finance reporting, HR
                analytics and e-commerce performance.
              </p>

              <p className="mt-4 text-sm text-slate-500">
                Expert resources from Power BI Dashboard Templates.
              </p>

            </div>
          </div>
        </section>

        {/* BLOG ARTICLES */}
        <section className="max-w-7xl mx-auto px-6 py-14">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {articles.map((article) => (

              <article
                key={article.slug}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-amber-400/40 transition-all"
              >

                <div className="w-11 h-11 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-5">
                  <BarChart3 className="w-5 h-5" />
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {article.category}
                </span>

                <h2 className="text-xl font-bold mt-3 leading-snug">
                  {article.title}
                </h2>

                <p className="text-sm text-slate-400 mt-4 leading-7">
                  {article.description}
                </p>

                <Link
                  to={`/blog/${article.slug}`}
                  aria-label={`Read ${article.title}`}
                  className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-white hover:text-amber-400"
                >
                  Read Guide

                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

              </article>

            ))}

          </div>

        </section>

        {/* SEO FOOTER CONTENT */}
        <section className="border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-6 py-14">

            <h2 className="text-2xl font-bold">
              Power BI Dashboard Templates & Resources
            </h2>

            <p className="mt-4 text-slate-400 leading-8">
              Explore professional Power BI dashboard templates for
              sales, finance, human resources and e-commerce analytics.
              Learn how to use DAX measures, build interactive reports,
              create KPI dashboards and design professional business
              intelligence solutions with Microsoft Power BI.
            </p>

          </div>
        </section>

      </main>
    </>
  );
};
