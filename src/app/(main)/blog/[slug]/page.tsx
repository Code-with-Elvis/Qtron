import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import blogData from "@/lib/data/blog-data.json";
import { Input } from "@/components/ui/input";

interface SingleBlogProps {
  params: {
    slug: string;
  };
}

const SingleBlog = ({ params }: SingleBlogProps) => {
  const post = blogData.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pb-12 bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="qtron-container">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6 rounded mt-6" size="sm">
              <ArrowLeft className="size-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <div className="max-w-4xl mt-4 mx-auto text-center">
            <Badge className="mb-4 rounded py-1">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>

            {/* Author & Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-3">
                <div className="relative size-12 rounded-full overflow-hidden">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">
                    {post.author.name}
                  </div>
                  <div className="text-sm">{post.author.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1 ">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="qtron-container">
          <div className="max-w-5xl mx-auto">
            <div className="relative h-[300px] md:h-[350px]  overflow-hidden shadow-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pt-3 pb-12">
        <div className="qtron-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_250px] gap-12">
              {/* Main Content */}
              <article className="prose prose-lg max-w-none blog-article">
                {/* Dynamic Content Based on Layout */}
                <div
                  className={`blog-content ${post.content.layout}`}
                  dangerouslySetInnerHTML={{ __html: post.content.html }}
                />
              </article>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Share */}
                <Card className="rounded z-50 lg:sticky lg:top-4">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Share2 className="size-4" />
                      Share Article
                    </h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full rounded"
                        size="sm"
                      >
                        Share on Twitter
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full rounded"
                        size="sm"
                      >
                        Share on Facebook
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full rounded"
                        size="sm"
                      >
                        Copy Link
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Author Card */}
                <Card className="rounded">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="relative size-20 rounded-full overflow-hidden mx-auto mb-4">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-bold mb-1">{post.author.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {post.author.role}
                      </p>
                      <Button variant="outline" size="sm" className="rounded">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="qtron-container">
          <Card className="rounded-none bg-linear-to-r from-primary/10 to-secondary/10 border-none">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Enjoyed this article?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Subscribe to get more tech insights, reviews, and exclusive
                content delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className=" sm:flex-1 border-neutral-300 rounded shrink-0"
                />
                <Button size="lg" className="rounded">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Add custom styles for blog content */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .blog-article .blog-content h1,
        .blog-article .blog-content h2,
        .blog-article .blog-content h3,
        .blog-article .blog-content h4 {
          font-weight: bold;
          margin-bottom: 1rem;
        }
        
        .blog-article .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
        
        .blog-article .blog-content ul,
        .blog-article .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .blog-article .blog-content li {
          margin-bottom: 0.5rem;
        }
        
        .blog-article .blog-content blockquote {
          margin: 2rem 0;
        }
        
        .blog-article .blog-content code {
          background: hsl(var(--muted));
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }
        
        .blog-article .blog-content img {
          border-radius: 0.5rem;
          margin: 2rem 0;
        }
      `,
        }}
      />
    </>
  );
};

export default SingleBlog;
