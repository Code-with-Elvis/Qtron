"use client";

import {
  IconShoppingCart,
  IconUsers,
  IconTrendingUp,
  IconPackage,
} from "@tabler/icons-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cards = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: IconTrendingUp,
  },
  {
    title: "Orders",
    value: "+2350",
    change: "+180.1% from last month",
    icon: IconShoppingCart,
  },
  {
    title: "Products",
    value: "+12,234",
    change: "+19% from last month",
    icon: IconPackage,
  },
  {
    title: "Active Customers",
    value: "+573",
    change: "+201 since last hour",
    icon: IconUsers,
  },
];

export function SectionCards() {
  return (
    <div className="grid gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.change}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
