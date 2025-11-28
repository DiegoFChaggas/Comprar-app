// app/(panel)/_layout.tsx
import { Tabs } from "expo-router";
import { HomeIcon } from "@/components/HomeIcon";
import { ReceiptIcon } from "@/components/ReceiptIcon";
import { PayamentIcon } from "@/components/PayamentIcon";

export default function PanelTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Home/index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => <HomeIcon />
        }}
      />

      <Tabs.Screen
        name="Coupon/index"
        options={{
          title: "Cupons",
          tabBarIcon: ({ color, size }) => <ReceiptIcon />
        }}
      />

      <Tabs.Screen
        name="Premium/cardRegister"
        options={{
          title: "Premium",
          tabBarIcon: ({ color, size }) => <PayamentIcon />
        }}
      />
    </Tabs>
  );
}
