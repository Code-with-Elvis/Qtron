import DeactivationBtn from "./DeactivationBtn";
import DeleteAccountBtn from "./DeleteAccountBtn";

const DangerZone = () => {
  return (
    <div className="py-12">
      <h2 className="text-xl font-bold">Deletion & Deactivation</h2>

      <article className="mt-6 border border-yellow-600/40 rounded p-6 bg-yellow-600/10">
        <h4 className="text-lg font-semibold mb-1">Deactivate account</h4>
        <p className="mb-3">
          Temporarily hide your profile and remove your presence from the
          platform.
        </p>
        <DeactivationBtn />
      </article>
      <article className="mt-6 border border-red-600/40 rounded p-6 bg-red-600/10">
        <h4 className="text-lg font-semibold mb-1">Delete data and account</h4>
        <p className="mb-3">
          Permanently delete your account and all associated data. This action
          is irreversible.
        </p>
        <DeleteAccountBtn />
      </article>
    </div>
  );
};
export default DangerZone;
