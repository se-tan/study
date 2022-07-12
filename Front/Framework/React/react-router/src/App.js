import "./App.css";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";
import Invoice from "./routes/invoice";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <h1 className="text-center title">Hello React Router</h1>
      <div className="container">
        <header>
          <Link class="nav-link" to="/">Home</Link>
          <Link class="nav-link" to="about">About</Link>
          <Link class="nav-link" to="contact">Contact</Link>
          <Link class="nav-link" to="expenses">Expenses</Link>
          <Link class="nav-link" to="invoices">Invoices</Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="invoices" element={<Invoices />}>
            <Route
              index
              element={
                <main
                  style={{
                    padding: "1rem",
                    marginLeft: "11px",
                  }}>
                  <p>Select an invoice</p>
                </main>
              }
            />
            <Route path=":invoiceId" element={<Invoice />} />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Contact() {
  return <h2>Contact</h2>;
}

function NotFound() {
  return <h2>Not Found Page.</h2>;
}
