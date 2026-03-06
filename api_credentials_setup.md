# PanelMind AI API Credentials Guide

Here is a step-by-step guide on how to get all the necessary credentials and API keys for your PanelMind AI `.env` file. These are third-party services, and most have free tiers to start with.

## 1. Google Cloud Platform (GCP) & Vertex AI
You need this for your LLM (Gemini), Vector Search, and the service account that gives your backend permission to access them.

*   **`GCP_PROJECT_ID`**: 
    1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
    2. Create a new Project (e.g., "PanelMind AI").
    3. The "Project ID" (usually a lowercase string with some numbers at the end, like `panelmind-prod-1234`) will be displayed on your project dashboard.
*   **`GOOGLE_APPLICATION_CREDENTIALS`** (The `service-account.json` file):
    1. In the GCP Console, search for **"Service Accounts"** (under IAM & Admin).
    2. Click **Create Service Account**, name it (e.g., "panelmind-backend"), and click Next.
    3. Grant it roles: **Vertex AI User** (for Gemini and Vector db) and **Storage Object Admin** (if you use GCS for file uploads).
    4. Click on your newly created service account -> go to the **Keys** tab -> click **Add Key** -> **Create New Key** -> Choose **JSON**. 
    5. This downloads a `.json` file to your computer. That file is your credentials! The `.env` variable should just be the absolute file path to where you saved that JSON file on your machine.
*   **`VECTOR_SEARCH_INDEX_ID` & `VECTOR_SEARCH_ENDPOINT_ID`**:
    1. In the GCP Console, search for **Vertex AI Vector Search**.
    2. You will need to create an "Index" (where the data lives) and an "Index Endpoint" (the server that queries the index).
    3. Once created, click on them to find their Resource IDs (which look like `projects/.../locations/.../indexes/...`).

## 2. Speech-to-Text (Deepgram)
Deepgram is used because it has the absolute lowest latency for real-time AI transcription.
1. Go to the [Deepgram Console](https://console.deepgram.com/) and sign up.
2. They give you a generous free credit balance ($200) to start.
3. On the left sidebar, click **API Keys** -> **Create a New API Key**.
4. Give it a name, allocate it to your project, and click Create. 
5. Copy the key (it starts with `dg_...`) – this is your **`DEEPGRAM_API_KEY`**.

## 3. Text-to-Speech (ElevenLabs)
ElevenLabs provides ultra-realistic voice models for your AI.
1. Go to [ElevenLabs](https://elevenlabs.io/) and create an account.
2. Click on your profile icon in the bottom left -> select **Profile + API key**.
3. Under the "API Key" section, click the eye icon to reveal it.
4. Copy the key – this is your **`ELEVENLABS_API_KEY`**.

## 4. Video Avatar (HeyGen)
HeyGen takes the ElevenLabs audio and animates a video avatar in real-time.
1. Go to [HeyGen Interactive Avatar](https://labs.heygen.com/interactive-avatar) (or sign in to your HeyGen account).
2. Go to the **API** section in your dashboard.
3. Generate a new API key.
4. Copy the key – this is your **`HEYGEN_API_KEY`**. *(Note: Real-time avatars usually require a paid tier on HeyGen, though you might be able to get trial minutes).*

## 5. WebRTC Real-time Engine (LiveKit)
LiveKit handles the actual low-latency video and audio streaming between the candidate and your server.
1. Go to [LiveKit Cloud](https://cloud.livekit.io/) and sign up.
2. Create a new "Project".
3. Once the project is created, you will be taken to your dashboard. Under **Project Settings** -> **Keys**, you can generate a new pair.
4. It will give you an **API Key** (e.g., `devkey`) and a **Secret Key** (e.g., `secret`). 
    *   Set **`LIVEKIT_API_KEY`** = your API Key
    *   Set **`LIVEKIT_API_SECRET`** = your Secret Key
5. Above the keys, you will see a WebSocket URL for your project (e.g., `wss://panelmind-xxxx.livekit.cloud`). That is your **`LIVEKIT_URL`**.

---

## Core Databases (PostgreSQL & Redis)
*   **`DATABASE_URL`** & **`REDIS_URL`**: 
    If you use Docker (which we have in our plan), these don't require third-party keys. When you run `docker-compose up`, it will start blank local versions of PostgreSQL and Redis on your machine. The dummy URLs provided in the `.env` example (`postgresql://user:pass@db:5432/panelmind` and `redis://redis:6379/0`) will work perfectly for your local application without you needing to do anything!
