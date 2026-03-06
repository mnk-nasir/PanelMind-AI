# How to Get Your Google Cloud Credentials for GitHub Actions

To deploy the PanelMind AI platform to Google Cloud using the automated GitHub Actions pipeline (`deploy.yml`), you need two specific secrets: `GCP_PROJECT_ID` and `GCP_CREDENTIALS`.

Here is the step-by-step guide on how to generate them for free.

## Step 1: Get Your `GCP_PROJECT_ID`

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Log in with your Google account.
3. If you don't have a project yet, click the **Project Dropdown** at the top-left of the screen (next to the Google Cloud logo) and click **"New Project"**.
4. Give your project a name (like `panelmind-prod`).
5. Once created, click on the **Project Info** card on your dashboard or look at the top navigation bar. 
6. Look for the **"Project ID"**. It usually looks like `panelmind-prod-123456`.
7. **Copy this.** This is your `GCP_PROJECT_ID` secret for GitHub.

---

## Step 2: Get Your `GCP_CREDENTIALS` (Service Account JSON)

To allow GitHub to deploy on your behalf without requiring you to log in manually every time, you need to create a Service Account key.

1. In the Google Cloud Console, use the top search bar to search for **"Service Accounts"** (under *IAM & Admin*).
2. Click **"+ CREATE SERVICE ACCOUNT"** at the top.
3. Give it a name like `github-actions-deployer`. Click "Create and Continue".
4. **Grant access to the project:** In the "Role" dropdown, grant it the following roles so it can push Docker images and deploy Cloud Run services:
   - **Cloud Run Admin**
   - **Artifact Registry Administrator**
   - **Service Account User**
   - **Storage Admin** (if you're hosting PDF files in Cloud Storage)
5. Click **"Done"**.
6. You will now see your new service account in the list. Click on the **three dots (Actions)** on the right side of its row and select **"Manage keys"**.
7. Click **"ADD KEY" -> "Create new key"**.
8. Select **JSON** and click **"Create"**.
9. A `.json` file will automatically download to your computer.

---

## Step 3: Add the Secrets to GitHub

1. Open the downloaded JSON file in Notepad or VSCode. **Select everything inside the file and copy it.**
2. Go to your GitHub Repository for PanelMind AI.
3. Click on **Settings** (the gear icon on the top right).
4. On the left sidebar, click **Secrets and variables > Actions**.
5. Click **"New repository secret"**.
6. **Name:** `GCP_CREDENTIALS`
   **Secret:** *(Paste the entire block of JSON you copied in Step 1)*
7. Click "Add Secret".
8. Click **"New repository secret"** again.
9. **Name:** `GCP_PROJECT_ID`
   **Secret:** *(Paste the Project ID you found in Step 1, e.g., `panelmind-prod-123456`)*
10. Click "Add Secret".

## Note on Artifact Registry
Before your next deployment runs, ensure you have enabled the **Artifact Registry API** and **Cloud Run API** in your Google Cloud Project. You will also need to create a Docker repository inside Artifact Registry named `panelmind-repo` located in `us-central1` for the workflow to push to.
