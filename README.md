---

# 🚀 Server Pulse: The Ultimate Coolify PaaS Demo

![SvelteKit](https://img.shields.io/badge/SvelteKit-5-ff3e00?style=for-the-badge&logo=svelte)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Managed-336791?style=for-the-badge&logo=postgresql)
![Coolify](https://img.shields.io/badge/Coolify-PaaS-6366f1?style=for-the-badge&logo=docker)

**Server Pulse** is a high-visibility diagnostic ecosystem built to demonstrate the power of self-hosted PaaS solutions. While typical "Hello World" apps only verify static delivery, Server Pulse stress-tests the entire infrastructure stack: from **stateful database persistence** to **internal container networking**.



## **🎯 The "Why"**
This project was engineered to test and where possible solve the **Infrastructure Sanity Check** problem. When moving from Vercel or Heroku to a self-hosted solution like **Coolify**, developers need to verify that:
1.  **Networking:** The App can talk to the DB securely over a private network.
2.  **Persistence:** Data survives container restarts and redeployments.
3.  **CI/CD:** Git webhooks and Nixpacks builders are injecting the correct metadata.
4.  **Resources:** The container has access to the expected system resources (RAM/CPU).

## **🛠️ Tech Stack**
- **Frontend/Backend:** SvelteKit 5 (utilizing Runes for high-performance reactivity)
- **Styling:** Tailwind CSS (Modern, dark-mode first UI)
- **Database:** PostgreSQL (Relational persistence)
- **Infrastructure:** Coolify PaaS + Nixpacks (Auto-detecting runtime)

## **📊 Monitored Metrics**
Server Pulse exposes real-time environment data that traditional static apps can't reach:
- **Resource Consumption:** Resident Set Size (RSS) Memory, System Uptime, and Load Averages.
- **Connectivity:** Visitor IP tracking, Protocol (HTTP/2) detection, and platform identification.
- **DevOps Metadata:** Automatic injection of **Git Commit Hashes** and **Docker Container IDs** to verify deployment versions.

## **🚀 Quick Deployment (Coolify)**

### 1. **Provision Database:**
   - New Resource > Database > PostgreSQL.
   - Note the `Internal Connection String`.

---
### 2. **Create Table:** - Open the Coolify Terminal for your DB and run:
   ```sql
   CREATE TABLE pulses (id SERIAL PRIMARY KEY, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, user_agent TEXT, ip_address TEXT, server_info TEXT);
```
---

### 3. **Deploy App:**
* New Resource > Public Repository > `[Your-Repo-URL]`.
* Add Env Var: `DATABASE_URL` = `[Your-Internal-Connection-String]`.
* Set FQDN (e.g., `https://pulse.yourdomain.com`).
* **Deploy.**

---

## 👤 Author

**[Your Name]** *Lead Software Engineer & Solutions Architect & Embedded Engineer & Blockchain Enthusiast*

---

*Built to prove that self-hosting doesn't have to be hard.*


---

### **```Now, it's your turn to show me what you have got```**

After you, I will add the containerization with docker, which again **Coolify** greatly excels at

---