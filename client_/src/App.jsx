import React from "react";
import AppRouter from "./routes/AppRouter.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import "./style.css";
import "leaflet/dist/leaflet.css";

function App() {
  return (
  <>
    
<AuthProvider>
  <AppRouter />
</AuthProvider>
  </>
  );
}
export default App;
