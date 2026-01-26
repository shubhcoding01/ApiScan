# ApiScan – Security Model

Security is a first-class concern in ApiScan.

---

## 🔑 Authentication
- JWT-based authentication
- Tokens validated on every request
- Backend enforces user-scoped access

---

## 🧪 Test Execution Safety
- Tests run inside Docker containers
- No direct access to host system
- No persistent secrets inside containers

---

## 🔒 Secrets Handling
- Secrets are optional
- Encrypted before storage
- Injected only at runtime
- Never returned in plaintext

---

## 🤖 AI Safety
- AI only generates blueprints (not code execution)
- Human approval required before execution
- No blind autonomous execution

---

## 🚫 Attack Surface Reduction
- No eval-based execution
- No shell access from runner
- Rate limits planned

---

## ✅ Compliance Ready
- Audit-friendly logs
- Immutable test runs
- Clear execution history
