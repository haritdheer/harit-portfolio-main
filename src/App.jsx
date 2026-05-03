import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import BootSequence from "./components/boot_sequence";

const App = () => {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      {booted && <RouterProvider router={router} />}
    </>
  );
};

export default App;
