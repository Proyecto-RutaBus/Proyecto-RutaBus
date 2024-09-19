import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./style.css";
import Landing from "./views/Landing";
import { ReclamosPeticiones } from "./views/ReclamosPeticiones";

const App = () => {
  return (
    <div>
      <Landing />
    </div>
  );
};
// function App() {
//   return (
//     <>
//       <ReclamosPeticiones></ReclamosPeticiones>
//     </>
//   );
// }

export default App;
