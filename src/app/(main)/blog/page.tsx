import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Search, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import blogData from "@/lib/data/blog-data.json";

const Blogs = () => {
  const featuredPosts = blogData.filter((post) => post.featured);
  const recentPosts = blogData
    .slice()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  const categories = Array.from(new Set(blogData.map((post) => post.category)));

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 via-secondary/5 to-accent/5 py-12">
        <div className="qtron-container">
          <div className="max-w-3xl">
            <Badge className="mb-4 rounded py-1">Tech Blog</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Latest Insights & Reviews
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Stay updated with the latest technology trends, product reviews,
              buying guides, and expert tips from our team of tech enthusiasts.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-12 h-12 rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12">
          <div className="qtron-container">
            <h2 className="text-3xl font-bold mb-6">Featured Articles</h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.id}>
                  <Card className="rounded overflow-hidden hover:shadow-xl transition-all duration-300 h-full group p-0 gap-2">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 rounded">
                        {post.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="relative size-8 rounded-full overflow-hidden">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span>{post.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="size-4" />
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-12 bg-muted/30">
        <div className="qtron-container">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button key={category} variant="outline" className="">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="py-12">
        <div className="qtron-container">
          <h2 className="text-3xl font-bold mb-8">Recent Articles</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id}>
                <Card className="rounded overflow-hidden hover:shadow-lg transition-all duration-300 h-full group p-0 gap-0">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-3 rounded" variant="secondary">
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <User className="size-3" />
                        <span>{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="size-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-linear-to-r from-primary/10 to-secondary/10">
        <div className="qtron-container text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss an Update</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest tech news, reviews,
            and exclusive deals delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded h-10 sm:flex-1"
            />
            <Button size="lg" className="rounded">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
export default Blogs;
