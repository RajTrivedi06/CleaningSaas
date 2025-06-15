import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { RouterProvider } from "@tanstack/react-router";

import { router } from "@/router"; // new central router

const App = () => (
  <Theme
    appearance="light" // todo: swap to “system” for auto-dark
    accentColor="grass"
    grayColor="sage"
    radius="large"
  >
    <RouterProvider router={router} />
  </Theme>
);

export default App;
