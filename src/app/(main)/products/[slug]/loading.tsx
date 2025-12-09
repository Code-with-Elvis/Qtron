export default function Loading() {
  return (
    <section>
      <div className="qtron-container py-4">
        <header className="skeleton h-5 mb-4"></header>
        <div className="grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_2fr_250px] gap-3">
          <div className="skeleton h-[400px] w-full"></div>
          <div className="skeleton h-[400px] w-full"></div>
          <div className="skeleton h-[400px] w-full hidden lg:block"></div>
        </div>
        <div className=" grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 my-5">
          <article className="h-48 skeleton"></article>
          <article className="h-48 skeleton"></article>
          <article className="h-48 skeleton hidden sm:block"></article>
          <article className="h-48 skeleton hidden md:block"></article>
          <article className="h-48 skeleton hidden lg:block"></article>
        </div>
      </div>
    </section>
  );
}
