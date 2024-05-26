import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./ui/AppLayout";
//Import de carro de Compras.
import Cart from "./pages/Cart";
//Detalles de transaccion
import TransactionDetails from "./pages/TransactionDetails";
//Se encuentran los Imports de Equipos de Seguridad y Herramientas.
import Products from "./pages/Products";
//Imports de Usuarios, Cuenta y Login.
import Login from "./pages/Login";
import Users from "./pages/Users";
import Account from "./pages/Account";
//Import de pagina no encontrada
import PageNotFound from "./pages/PageNotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="account" element={<Account />} />
            <Route path="cart" element={<Cart />} />

            <Route path="login" element={<Login />} />
          </Route>
          <Route path="transactiondetails" element={<TransactionDetails />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
