# Generative-AI-Thalent-Simelane

# MetaForge Blockchain Product Tracking System

This project presents a lightweight, AI-assisted blockchain application designed for MetaForge Steelworks — a South African SME manufacturer of steel brackets. The system enables end-to-end product traceability across a simplified three-node supply chain: Manufacturer → Distributor → Retailer. Developed using JavaScript, HTML, and CSS with support from Generative AI, the system provides an affordable and user-friendly solution for real-time product tracking, verification, and audit readiness.

## Project Overview

The system simulates a browser-based blockchain that allows MetaForge and its partners to:
- **Register and transfer metal components** with immutable event history
- **Log every transaction in a cryptographically hashed ledger**
- **Generate and scan QR codes for product verification**
- **Export traceability data as CSV files**
- **Monitor node activity with real-time analytics**

The system empowers SMEs like MetaForge to adopt digital traceability without complex backend infrastructure.

## Problem Statement

Small metal manufacturers often lack access to secure, digital traceability tools. Paper-based systems are error-prone and do not provide a tamper-proof record of ownership or location changes. MetaForge needed:
- A **tamper-evident ledger** of product transfers
- A **real-time verification mechanism** using QR codes
- A **simple, browser-based solution** without needing blockchain developers

This project leverages Generative AI to create a low-cost system that solves these problems independently.

## System Architecture
[ Manufacturer ] → [ Distributor ] → [ Retailer ]
| | |
Register Transfer Verify + Export
Products Ownership QR + Analytics
↓ ↓ ↓
Blockchain ← Append ← Append ← Append per Event

Each node performs role-specific tasks through the browser UI. Every event appends a new block containing:
- Product metadata (ID, name, description)
- Timestamp and user details
- SHA-256 hash + previous hash
- Transaction type (REGISTER or TRANSFER)

Blocks are stored in a JavaScript array and rendered in real-time to simulate blockchain immutability.

## Features

- 🌐 **User-friendly browser interface**
- ✅ **Role-neutral login & session interface**
- 🔗 **Blockchain ledger simulation with hash linking**
- 📦 **Product registration & ownership transfer**
- 📄 **QR code generation for product tracking**
- 📈 **Analytics panel for node activity**
- 📤 **Exportable CSV of all transactions**
- 📱 **Mobile-responsive design**

## Technologies Used

| Component         | Technology                      |
|------------------|---------------------------------|
| Frontend         | HTML5, CSS3                     |
| Blockchain Logic | JavaScript (in-memory array)    |
| Hashing          | Web Crypto API (SHA-256)        |
| QR Code          | QRCode.js                       |
| Export CSV       | Blob API & Anchor Element       |
| Hosting          | Firebase Hosting                |
| AI Assistance    | ChatGPT, GitHub Copilot         |

## Testing & Validation

All system functions were tested manually:
- ✔️ Product registration, QR scanning, and transfer logs
- ✔️ Block integrity using cryptographic hash chaining
- ✔️ Cross-browser and responsive UI compatibility
- ✔️ CSV export format validation for audits
- ✔️ Analytics panel accuracy across node types

Testing confirmed that all actions result in correctly hashed, immutable entries with real-time rendering.

## Project Structure

MetaForgeBlockchain/
├── index.html # UI layout and structure
├── style.css # Visual design and layout
├── script.js # Blockchain logic, hashing, QR, analytics
├── assets/ # Icons, fonts, and QR libraries
├── architecture.png # System diagram for academic use
├── README.md # Project documentation

## Node Simulation

- **Manufacturer** logs in to register a new steel component.
- **Distributor** receives and verifies the product, recording ownership transfer.
- **Retailer** finalizes the chain, verifies the QR code, and downloads audit records.

Every step is recorded in the blockchain ledger and shown live in the browser.

## Innovation

- ✅ Built entirely using **client-side** code (no backend dependencies)
- 🤖 Developed with **Generative AI support**
- 🔐 **Tamper-evident** recordkeeping without smart contracts
- 📊 Includes **supply chain analytics** panel for performance insights
- 🔄 Modular design for easy extension to other industries

## How to Use

1. Launch `index.html` in a browser or visit the **Firebase-hosted version**
2. Register or log in as any user role
3. Register a new product as a Manufacturer
4. Transfer to Distributor → Retailer using the Transfer Product function
5. View transactions in the blockchain ledger
6. Generate QR codes and download CSV records

## Deployment

- 🔗 **Live App**: [Hosted on Firebase] https://studio.firebase.google.com/generative-ai-ts-38382556
- 🛠️ **Development Workspace**: Firebase Studio
- 📁 **Source Code**: [View on GitHub] https://thalentgutshwa.github.io/Generative-AI-Thalent-Simelane/


