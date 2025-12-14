import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Package, ShieldCheck, Truck, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

const AboutPage = async () => {
  const t = await getTranslations("about");

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 to-primary/5 py-12">
        <div className="qtron-container">
          <Badge className="mb-4 rounded py-1">{t("title")}</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("heroTitle")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {t("heroDescription")}
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12">
        <div className="qtron-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t("ourStory")}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{t("storyParagraph1")}</p>

                <p>{t("storyParagraph2")}</p>

                <p>{t("storyParagraph3")}</p>
              </div>
            </div>
            <div
              style={{ backgroundImage: "url('/delivery.png')" }}
              className=" h-50 md:h-100 bg-muted bg-cover bg-center bg-no-repeat "
            ></div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-12 bg-muted/30">
        <div className="qtron-container">
          <h2 className=" text-2xl md:text-3xl font-bold mb-6">
            {t("whatWeStandFor")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {t("customerFirst")}
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  {t("customerFirstDesc")}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <ShieldCheck className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {t("trustSecurity")}
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  {t("trustSecurityDesc")}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Package className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {t("qualityProducts")}
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  {t("qualityProductsDesc")}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Truck className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {t("fastDelivery")}
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  {t("fastDeliveryDesc")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="qtron-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl  md:text-4xl font-bold text-primary mb-2">
                10M+
              </p>
              <p className="text-muted-foreground">{t("happyCustomers")}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl  md:text-4xl font-bold text-primary mb-2">
                50K+
              </p>
              <p className="text-muted-foreground">{t("productsAvailable")}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl  md:text-4xl font-bold text-primary mb-2">
                100+
              </p>
              <p className="text-muted-foreground">{t("countriesServed")}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl  md:text-4xl font-bold text-primary mb-2">
                24/7
              </p>
              <p className="text-muted-foreground">{t("customerSupport")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted/30">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t("ourMission")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t("missionStatement")}
          </p>
          <p className="text-muted-foreground">{t("joinUs")}</p>
        </div>
      </section>
    </>
  );
};
export default AboutPage;
