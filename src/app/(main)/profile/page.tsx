import AccountForm from "@/components/profile/AccountForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilePage = () => {
  return (
    <section className="py-8">
      <div className="qtron-container">
        <Tabs defaultValue="account">
          <TabsList className="rounded">
            <TabsTrigger value="account" className="rounded">
              Account
            </TabsTrigger>
            <TabsTrigger value="password" className="rounded">
              Password
            </TabsTrigger>
            <TabsTrigger value="danger-zone" className="rounded">
              Danger Zone
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <AccountForm />
          </TabsContent>
          <TabsContent value="password"></TabsContent>
          <TabsContent value="danger-zone"></TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
export default ProfilePage;
