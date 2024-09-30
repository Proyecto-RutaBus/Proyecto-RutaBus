import React from "react";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "../context/AuthContext";
import "./style.css";

function App() {
  return (
<AuthProvider>

  <AppRouter />;

</AuthProvider>
  );
}
export default App;