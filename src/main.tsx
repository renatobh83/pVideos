import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { App } from "./App";
import { client } from "./lib/apoloClient";
import "./styles/global.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
