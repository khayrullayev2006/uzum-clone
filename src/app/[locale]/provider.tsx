"use client";
import React from "react";
import { Client, HydrationProvider } from "react-hydration-provider";
import GlobalContext from "@/context";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/nextjs";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <HydrationProvider>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          <GlobalContext>
            <Client>{children}</Client>
          </GlobalContext>
        </ClerkProvider>
      </HydrationProvider>
    </Provider>
  );
};

export default Providers;
