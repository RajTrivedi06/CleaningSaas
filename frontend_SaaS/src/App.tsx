import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Shell from "@/layout/Shell";
import Dashboard from "@/pages/dashboard";

// ---- stub screens you’ll flesh out later ----
import Events from "@/pages/events";
import Tasks from "@/pages/tasks";
import Team from "@/pages/team";
import Documents from "@/pages/documents";
import Reports from "@/pages/reports";
import Settings from "@/pages/settings";

const App = () => (
  <Theme
    appearance="light" // later: “system” for auto-dark-mode
    accentColor="grass" // matches emerald palette
    grayColor="sage"
    radius="large"
  >
    <BrowserRouter>
      <Routes>
        {/* everything inside Shell gets TopBar + SideNav */}
        <Route element={<Shell />}>
          <Route index element={<Dashboard />} />
          <Route path="events" element={<Events />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="team" element={<Team />} />
          <Route path="documents" element={<Documents />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* catch-all → dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </Theme>
);

export default App;
