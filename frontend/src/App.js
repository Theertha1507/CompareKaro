import { useState } from "react";

const mono = "'DM Mono', monospace";
const serif = "'DM Serif Display', serif";

const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f5efe0; font-family: 'DM Mono', monospace; }
`;

const API = "https://comparekaro-backend.onrender.com";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("ck_token") || "");
  const [username, setUsername] = useState(localStorage.getItem("ck_user") || "");
  const [page, setPage] = useState(token ? "search" : "login");

  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authError, setAuthError] = useState("");
  const [authMode, setAuthMode] = useState("login");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleAuth = async () => {
    setAuthError("");
    const url = `${API}/api/auth/${authMode}`;
    const body = authMode === "register"
      ? { username: authUsername, password: authPassword, email: authEmail }
      : { username: authUsername, password: authPassword };
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("ck_token", data.token);
        localStorage.setItem("ck_user", authUsername);
        setToken(data.token);
        setUsername(authUsername);
        setPage("search");
      } else {
        setAuthError(data.error || "Something went wrong");
      }
    } catch (e) {
      setAuthError("Could not connect to server");
    }
  };

  const logout = () => {
    localStorage.removeItem("ck_token");
    localStorage.removeItem("ck_user");
    setToken("");
    setUsername("");
    setPage("login");
    setResults([]);
  };

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    const res = await fetch(`${API}/api/products/search?name=${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  if (page === "login" || page === "register") {
    return (
      <>
        <style>{globalStyle}</style>
        <div style={{ background: "#f5efe0", minHeight: "100vh", fontFamily: mono }}>
          <div style={{ background: "#3d2b1f", color: "#f5efe0", padding: "8px 2rem", fontSize: 12, display: "flex", gap: "2rem" }}>
            <b style={{ color: "#e8c547" }}>★ COMPAREKARO</b>
            <span style={{ opacity: 0.6 }}>zepto vs blinkit — who's cheaper?</span>
          </div>

          <div style={{ background: "#c84b2f", borderBottom: "4px solid #3d2b1f", padding: "2rem" }}>
            <h1 style={{ fontFamily: serif, fontSize: 40, color: "#f5efe0", letterSpacing: -1 }}>CompareKaro</h1>
            <p style={{ color: "#f5efe0", opacity: 0.85, fontSize: 13, marginTop: 4 }}>grocery price comparison — zepto & blinkit</p>
          </div>

          <div style={{ maxWidth: 420, margin: "3rem auto", padding: "0 1rem" }}>
            <div style={{ border: "3px solid #3d2b1f", background: "#fff9f0" }}>
              <div style={{ display: "flex", borderBottom: "3px solid #3d2b1f" }}>
                {["login", "register"].map(m => (
                  <button key={m} onClick={() => setAuthMode(m)} style={{
                    flex: 1, padding: "12px", border: "none", borderRight: m === "login" ? "3px solid #3d2b1f" : "none",
                    background: authMode === m ? "#e8c547" : "#fff9f0",
                    fontFamily: mono, fontSize: 13, cursor: "pointer", color: "#3d2b1f", fontWeight: authMode === m ? 500 : 400
                  }}>{m}</button>
                ))}
              </div>

              <div style={{ padding: "1.5rem" }}>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, color: "#8a7a65", display: "block", marginBottom: 4 }}>username</label>
                  <input value={authUsername} onChange={e => setAuthUsername(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", border: "2px solid #3d2b1f", background: "#f5efe0", fontFamily: mono, fontSize: 13, outline: "none" }} />
                </div>

                {authMode === "register" && (
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 11, color: "#8a7a65", display: "block", marginBottom: 4 }}>email</label>
                    <input value={authEmail} onChange={e => setAuthEmail(e.target.value)}
                      style={{ width: "100%", padding: "8px 12px", border: "2px solid #3d2b1f", background: "#f5efe0", fontFamily: mono, fontSize: 13, outline: "none" }} />
                  </div>
                )}

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, color: "#8a7a65", display: "block", marginBottom: 4 }}>password</label>
                  <input type="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleAuth()}
                    style={{ width: "100%", padding: "8px 12px", border: "2px solid #3d2b1f", background: "#f5efe0", fontFamily: mono, fontSize: 13, outline: "none" }} />
                </div>

                {authError && <p style={{ color: "#c84b2f", fontSize: 12, marginBottom: 12 }}>✕ {authError}</p>}

                <button onClick={handleAuth} style={{
                  width: "100%", padding: "10px", background: "#c84b2f", border: "2px solid #3d2b1f",
                  color: "#f5efe0", fontFamily: mono, fontSize: 14, cursor: "pointer", fontWeight: 500
                }}>{authMode} →</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{globalStyle}</style>
      <div style={{ background: "#f5efe0", minHeight: "100vh", fontFamily: mono }}>
        <div style={{ background: "#3d2b1f", color: "#f5efe0", padding: "8px 2rem", fontSize: 12, display: "flex", gap: "2rem", alignItems: "center" }}>
          <b style={{ color: "#e8c547" }}>★ COMPAREKARO</b>
          <span style={{ opacity: 0.6 }}>zepto vs blinkit — who's cheaper?</span>
          <span style={{ marginLeft: "auto", opacity: 0.6 }}>logged in as <b style={{ color: "#e8c547" }}>{username}</b></span>
          <button onClick={logout} style={{ background: "none", border: "1px solid #f5efe0", color: "#f5efe0", padding: "2px 10px", cursor: "pointer", fontFamily: mono, fontSize: 11 }}>logout</button>
        </div>

        <div style={{ background: "#c84b2f", borderBottom: "4px solid #3d2b1f", padding: "2rem 2rem 1.5rem" }}>
          <h1 style={{ fontFamily: serif, fontSize: 40, color: "#f5efe0", letterSpacing: -1 }}>CompareKaro</h1>
          <p style={{ color: "#f5efe0", opacity: 0.85, fontSize: 13, marginTop: 4 }}>grocery price comparison — zepto & blinkit</p>
          <div style={{ display: "flex", maxWidth: 600, marginTop: "1.2rem" }}>
            <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && search()}
              placeholder="search a product... try maggi, amul, tata"
              style={{ flex: 1, padding: "10px 16px", border: "3px solid #3d2b1f", borderRight: "none", background: "#f5efe0", fontFamily: mono, fontSize: 14, outline: "none" }} />
            <button onClick={search}
              style={{ padding: "10px 20px", background: "#e8c547", border: "3px solid #3d2b1f", fontFamily: mono, fontWeight: 500, cursor: "pointer", fontSize: 14, color: "#3d2b1f" }}>
              search →
            </button>
          </div>
        </div>

        <div style={{ padding: "1.5rem 2rem" }}>
          <div style={{ display: "flex", gap: 12, marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ border: "2px solid #3d2b1f", padding: "4px 12px", fontSize: 12, background: "#a8c5a0", color: "#1a3a18" }}>● zepto</span>
            <span style={{ border: "2px solid #3d2b1f", padding: "4px 12px", fontSize: 12, background: "#e8c547", color: "#3d2b1f" }}>● blinkit</span>
            <span style={{ border: "2px solid #3d2b1f", padding: "4px 12px", fontSize: 12, background: "#c84b2f", color: "#f5efe0" }}>↓ savings</span>
            <span style={{ fontSize: 12, color: "#8a7a65" }}>bold = cheaper store</span>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: mono }}>
            <thead>
              <tr style={{ background: "#3d2b1f", color: "#f5efe0" }}>
                {["product", "category", "zepto ₹", "blinkit ₹", "winner", "you save"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 500, fontSize: 12, letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={6} style={empty}>[ searching... ]</td></tr>}
              {!loading && searched && results.length === 0 && <tr><td colSpan={6} style={empty}>[ no products found ]</td></tr>}
              {!loading && !searched && <tr><td colSpan={6} style={empty}>[ search for a product to compare prices ]</td></tr>}
              {!loading && results.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: "2px solid #3d2b1f", background: i % 2 === 0 ? "#f5efe0" : "#ede3cf" }}>
                  <td style={td}>{p.name}</td>
                  <td style={{ ...td, color: "#8a7a65" }}>{p.category}</td>
                  <td style={{ ...td, color: p.cheaperStore === "zepto" ? "#2d6a2d" : "#3d2b1f", fontWeight: p.cheaperStore === "zepto" ? 500 : 400 }}>₹{p.zeptoPrice}</td>
                  <td style={{ ...td, color: p.cheaperStore === "blinkit" ? "#8a6800" : "#3d2b1f", fontWeight: p.cheaperStore === "blinkit" ? 500 : 400 }}>₹{p.blinkitPrice}</td>
                  <td style={td}>
                    <span style={{
                      background: p.cheaperStore === "zepto" ? "#a8c5a0" : "#e8c547",
                      color: p.cheaperStore === "zepto" ? "#1a3a18" : "#7a5800",
                      border: p.cheaperStore === "zepto" ? "2px solid #2d6a2d" : "2px solid #8a6800",
                      padding: "2px 10px", fontSize: 11
                    }}>{p.cheaperStore}</span>
                  </td>
                  <td style={{ ...td, color: "#c84b2f", fontWeight: 500 }}>{p.savings > 0 ? `₹${p.savings}` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const td = { padding: "10px 14px", color: "#3d2b1f" };
const empty = { textAlign: "center", padding: "3rem", color: "#8a7a65", fontSize: 13 };