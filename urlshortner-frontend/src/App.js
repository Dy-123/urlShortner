import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import AppPage from "./pages/AppPage";
import NotFound from "./pages/NotFound";
import RedirectPage from "./pages/RedirectPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" element={<AppPage />}></Route> */}
          <Route exact path="/app" element={<AppPage />}></Route>
          <Route exact path="/notfound" element={<NotFound />}></Route>
           <Route exact path="/*" element={<RedirectPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );

}

export default App;
