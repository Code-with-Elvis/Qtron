const Loading = () => {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      <article className="h-48 skeleton"></article>
      <article className="h-48 skeleton"></article>
      <article className="h-48 skeleton hidden sm:block"></article>
      <article className="h-48 skeleton hidden md:block"></article>
      <article className="h-48 skeleton hidden lg:block"></article>
    </div>
  );
};
export default Loading;
