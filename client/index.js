import React, {StrictMode} from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './app';
//const App = lazy(() => import('./app'));

const root = createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
