import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ScrollReset } from "./components/ScrollReset";
import { AppProvider } from "./contexts/AppContext";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Reports, ReportForm } from "./pages/Reports";
import { Appointments } from "./pages/Appointments";
import { Resources, ResourceDetail } from "./pages/Resources";
import { Insights } from "./pages/Insights";
import { NotFound } from "./pages/NotFound";
import "./styles/index.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <HashRouter>
          <ScrollReset />
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="reports" element={<Reports />} />
              <Route path="reports/new" element={<ReportForm />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="resources" element={<Resources />} />
              <Route path="resources/:id" element={<ResourceDetail />} />
              <Route path="insights" element={<Insights />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </HashRouter>
      </AppProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
