const Loading = () => {
  return (
    <section className="py-8">
      <div className="qtron-container">
        <div className="skeleton h-5 mb-4 w-70"></div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Array.from({ length: 16 }).map((_, index) => (
            <article key={index} className="skeleton h-48 w-full"></article>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Loading;
