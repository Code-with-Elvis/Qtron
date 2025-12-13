import AddUserButton from "@/components/admin-customers/AddUserButton";
import DeleteProductButton from "@/components/admin-customers/DeleteProductButton";
import EditUserButton from "@/components/admin-customers/EditUserButton";
import SearchForm from "@/components/admin-customers/SearchForm";
import Pagination from "@/components/global/Pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ResultsProps, User } from "@/lib/types/data";
import { formatDate, trimProductId } from "@/lib/utils";
import { IconMoodEmptyFilled } from "@tabler/icons-react";
import { AlertTriangle } from "lucide-react";
import { headers } from "next/headers";

const Customers = async ({ searchParams }: ResultsProps) => {
  try {
    const resolvedParams = await searchParams;
    const search = resolvedParams.q || "";
    const page = resolvedParams.page
      ? Math.max(1, parseInt(resolvedParams.page, 10))
      : 1;
    const limit = resolvedParams.limit
      ? Math.max(1, parseInt(resolvedParams.limit, 10))
      : 15;
    const query = `q=${encodeURIComponent(search)}&page=${page}&limit=${limit}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const headersList = await headers();
    const cookie = headersList.get("cookie") || "";

    const res = await fetch(`${baseUrl}/api/admin/users?${query}`, {
      cache: "no-store",
      credentials: "include",
      headers: {
        Cookie: cookie,
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        return (
          <div className="text-center text-red-500 mt-16">
            <AlertTriangle className="inline size-9 animate-pulse text-yellow-400  mb-4" />
            <p>Unauthorized. Admin access required.</p>
          </div>
        );
      }
      throw new Error("Failed to fetch customers");
    }

    const data = await res.json();

    if (data.users.length === 0) {
      return (
        <>
          <header className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <SearchForm />
              <p className="hidden sm:block">
                Total: {data?.pagination?.totalCount} items
              </p>
            </div>
            <AddUserButton />
          </header>
          <div className="text-center mt-16">
            <IconMoodEmptyFilled className="inline size-10 mb-2 text-yellow-400 animate-pulse" />
            <p className="text-muted-foreground">
              No customers found matching your criteria.
            </p>
          </div>
        </>
      );
    }

    return (
      <>
        <header className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <SearchForm />
            <p className="hidden sm:block">
              Total: {data?.pagination?.totalCount} item(s)
            </p>
          </div>
          <AddUserButton />
        </header>
        <div className=" overflow-x-auto pb-3">
          <table className="border w-full min-w-2xl">
            <thead>
              <tr>
                <th className="border text-start py-.5 px-1.5 text-sm">
                  Photo
                </th>
                <th className="border text-start py-.5 px-1.5 text-sm">Id</th>
                <th className="border text-start py-.5 px-1.5 text-sm">Name</th>
                <th className="border text-start py-.5 px-1.5 text-sm">
                  Email
                </th>
                <th className="border text-start py-.5 px-1.5 text-sm">Role</th>
                <th className="border text-start py-.5 px-1.5 text-sm">
                  Phone
                </th>
                <th className="border text-start py-.5 px-1.5 text-sm">
                  Active
                </th>
                <th className="border text-start py-.5 px-1.5 text-sm">
                  Verified
                </th>
                <th className="border text-start py-.5 px-1.5 text-sm">
                  Last Updated
                </th>
                <th className="border text-start py-.5 px-1.5 text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.users.map((user: User) => (
                <tr key={user._id}>
                  <td className="border py-.5 px-1.5 text-sm">
                    <Avatar>
                      <AvatarImage
                        src={user?.photo || "https://github.com/shadcn.png"}
                        alt="User Avatar"
                        className="object-cover"
                      />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </td>
                  <td className="border py-.5 px-1.5 text-sm">
                    {trimProductId(user._id)}
                  </td>
                  <td className="border py-.5 px-1.5 text-sm">{user.name}</td>
                  <td className="border py-.5 px-1.5 text-sm">{user.email}</td>
                  <td className="border py-.5 px-1.5 text-sm">{user.role}</td>
                  <td className="border py-.5 px-1.5 text-sm">
                    {user?.phone || "N/A"}
                  </td>
                  <td className="border py-.5 px-1.5 text-sm">
                    {user.active ? "Yes" : "No"}
                  </td>
                  <td className="border py-.5 px-1.5 text-sm">
                    {user.isVerified ? "Yes" : "No"}
                  </td>
                  <td className="border py-.5 px-1.5 text-sm">
                    {formatDate(user.updatedAt)}
                  </td>
                  <td className="border py-.5 px-1.5 text-sm">
                    {/* Actions buttons or links can be added here */}
                    <div className="flex items-center gap-2 py-1">
                      <EditUserButton user={user} />
                      <DeleteProductButton userId={user._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.pagination.totalPages > 1 && (
          <Pagination pages={data.pagination.totalPages} />
        )}
      </>
    );
  } catch (error) {
    console.error("Error fetching customers:", error);
    return (
      <div className="text-center text-red-500 mt-16">
        <AlertTriangle className="inline size-9 animate-pulse text-yellow-400  mb-4" />
        <p>An error occurred while fetching customers.</p>
      </div>
    );
  }
};
export default Customers;
