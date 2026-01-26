# 🚀 ApiScan – User Onboarding Guide

Welcome to **ApiScan**, an AI-powered platform that automatically tests your APIs using your OpenAPI specification — without writing test scripts.

This guide walks you through ApiScan **step by step**, from login to test execution.

---

## 🔐 Step 1: Login

- Open the ApiScan web app
- Login using your credentials
- On success, ApiScan stores a secure JWT token
- This token is used to authorize all future actions

✅ You are now authenticated.

---

## 📁 Step 2: Create a Project

A **Project** represents one API system.

Examples:
- Payment API
- User Authentication API
- Order Management API

What happens:
- Project metadata is stored
- All future actions (specs, tests, runs) belong to this project

---

## 📄 Step 3: Upload API Specification

Upload your **OpenAPI / Swagger** file (`.json` or `.yaml`).

What ApiScan does:
- Parses endpoints, methods, schemas, parameters
- Creates a versioned API snapshot
- Uses this as the source of truth for testing

💡 This step tells ApiScan *what your API looks like*.

---

## 🧪 Step 4: (Optional) Add Test Secrets

Only required **if your API needs authentication**.

Examples:
- Bearer token
- Sandbox API key
- Test credentials

What happens:
- Secrets are encrypted before storage
- Never exposed again in plain text
- Injected only at test runtime

🔐 Public APIs can skip this step.

---

## 🤖 Step 5: Generate Test Blueprint (AI)

Click **“Generate Test Plan”**.

What happens:
- AI reads your API spec
- Thinks like a QA engineer
- Generates a **Test Blueprint**, including:
  - Functional tests
  - Edge cases
  - Failure scenarios
  - Auth flow checks

Blueprint status starts as:
