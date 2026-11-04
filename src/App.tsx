import { site, page } from "./content";
import { Header } from "./components/Header";
import { Contact } from "./sections/Contact";
import registry from "./pages/registry.json";
import { components } from "./pages/components";
export function App() {
  const definition = registry.find((item) => item.id === page);
  const Page = definition && components[definition.component];
  if (!Page) throw new Error(`Missing page component: ${page}`);
  return (
    <div id="top">
      <a className="skip-link" href="#main">
        {site.ui.skip}
      </a>
      <Header />
      <main id="main">
        <Page />
        <Contact />
      </main>
    </div>
  );
}
