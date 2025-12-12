import DeactivationBtn from "./DeactivationBtn";

const DangerZone = () => {
  return (
    <section className="py-12">
      <div className="qtron-container">
        <h2 className="text-xl font-bold">Deletion & Deactivation</h2>

        <article className="mt-6 border border-yellow-600/40 rounded p-6 bg-yellow-600/10">
          <h4 className="text-lg font-semibold mb-1">Deactivate account</h4>
          <p className="mb-3">
            Temporarily hide your profile and remove your presence from the
            platform.
          </p>
          <DeactivationBtn />
        </article>
      </div>
    </section>
  );
};
export default DangerZone;
