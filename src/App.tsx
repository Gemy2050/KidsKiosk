import "./App.css";
import { store } from "./auth/store";
import { Toaster } from "./components/ui/toaster";
import RestoreScroll from "./components/RestoreScroll";
import AppRoutes from "./router/AppRoutes";
import AuthProvider from "react-auth-kit";

function App() {
  return (
    <>
      <AuthProvider store={store}>
        <AppRoutes />
      </AuthProvider>

      <RestoreScroll />
      <Toaster />
    </>
  );
}

export default App;
