// Store user credentials
let users = {};
let currentUser = null;

// Product and block (ledger) arrays
let components = [];
let blocks = [];

// Use SHA-256 to hash data (Generative AI-assisted security step)
async function sha256(msg) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(msg));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

// Register a new user
function register() {
  const u = document.getElementById("regName").value;
  const p = document.getElementById("regPass").value;
  if (!u || !p || users[u]) return alert("Invalid or duplicate user");
  users[u] = p;
  alert("Registration complete.");
}

// Login functionality
function login() {
  const u = document.getElementById("logName").value;
  const p = document.getElementById("logPass").value;
  if (users[u] !== p) return alert("Login failed");
  currentUser = u;

  // Show blockchain system, hide auth form
  document.getElementById("authSection").classList.add("hidden");
  document.getElementById("appSection").classList.remove("hidden");

  updateSelect();
  updateLedger();
  updateStats();
}

// Logout and return to auth screen
function logout() {
  currentUser = null;
  document.getElementById("authSection").classList.remove("hidden");
  document.getElementById("appSection").classList.add("hidden");
}

// Register a new product/component
async function addProduct() {
  const name = document.getElementById("metalName").value;
  const desc = document.getElementById("metalDesc").value;
  const location = document.getElementById("originNode").value;
  const id = Date.now().toString(); // Use timestamp as unique ID

  components.push({ id, name, desc, owner: currentUser, location });

  // Log creation as a block on the blockchain
  await logBlock({ action: "CREATED", id, name, desc, from: "SYSTEM", to: currentUser, location });

  updateSelect();
  updateLedger();
  showQR(id);
  updateStats();
}

// Transfer product ownership
async function transfer() {
  const id = document.getElementById("metalSelect").value;
  const to = document.getElementById("receiver").value;
  const comp = components.find(c => c.id === id);

  if (!comp || comp.owner !== currentUser) return alert("Unauthorized transfer.");

  const from = comp.owner;
  comp.owner = to;

  // Record the transfer on blockchain
  await logBlock({ action: "TRANSFERRED", id, from, to });

  updateSelect();
  updateLedger();
  showQR(id);
  updateStats();
}

// Append block to blockchain ledger
async function logBlock(data) {
  const prev = blocks.length ? blocks[blocks.length - 1].hash : "GENESIS";
  const full = JSON.stringify(data) + prev;
  const hash = await sha256(full);

  blocks.push({ ...data, time: new Date().toISOString(), prev, hash });
}

// Update dropdown of owned products
function updateSelect() {
  const sel = document.getElementById("metalSelect");
  sel.innerHTML = "";
  components.filter(c => c.owner === currentUser).forEach(c => {
    const o = document.createElement("option");
    o.value = c.id;
    o.textContent = `${c.name} (${c.location})`;
    sel.appendChild(o);
  });
}

// Render the blockchain ledger
function updateLedger() {
  const view = document.getElementById("ledgerView");
  view.innerHTML = blocks.slice().reverse().map(b => `
    <div class="blockCard">
      <strong>${b.action}</strong> | ${b.id}<br>
      From: ${b.from} → To: ${b.to}<br>
      Time: ${b.time}<br>
      Node: ${b.location || "N/A"}<br>
      <small>Hash: ${b.hash.slice(0, 20)}...</small>
    </div>
  `).join("");
}

// Generate a QR code for product traceability
function showQR(id) {
  const comp = components.find(c => c.id === id);
  const qr = document.getElementById("qrSection");
  qr.innerHTML = "";
  if (comp) {
    QRCode.toCanvas(document.createElement('canvas'), JSON.stringify(comp), (err, canvas) => {
      if (!err) qr.appendChild(canvas);
    });
  }
}

// Show basic ownership statistics
function updateStats() {
  const stats = {};
  components.forEach(c => {
    stats[c.owner] = (stats[c.owner] || 0) + 1;
  });
  const panel = document.getElementById("statsPanel");
  panel.innerHTML = Object.entries(stats).map(([o, n]) => `<p><strong>${o}</strong>: ${n} items</p>`).join("");
}

// Export blockchain as CSV file
function downloadCSV() {
  const csv = ["Action,ID,From,To,Time,Hash"];
  blocks.forEach(b => {
    csv.push(`${b.action},${b.id},${b.from},${b.to},${b.time},${b.hash}`);
  });
  const blob = new Blob([csv.join("\n")], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "metaltrace_blockchain_log.csv";
  a.click();
}
