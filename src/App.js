import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Departments,
  Products,
  IndividualProduct,
  AddNewProduct,
} from "./pages/index";
import { PageWrapper } from "./components";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Dashboard />
            </PageWrapper>
          }
        />
        <Route
          path="/departments"
          element={
            <PageWrapper>
              <Departments />
            </PageWrapper>
          }
        />
        <Route
          path="/products"
          element={
            <PageWrapper>
              <Products />
            </PageWrapper>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <PageWrapper>
              <IndividualProduct />
            </PageWrapper>
          }
        />
        <Route
          path="/add-product"
          element={
            <PageWrapper>
              <AddNewProduct />
            </PageWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
