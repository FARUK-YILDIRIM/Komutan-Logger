# Komutan-Logger (alpha)
An object is approaching, sir. 🔭
 
## Setup

### 1. Clone the Repo
`https://github.com/FARUK-YILDIRIM/Komutan-Logger.git`

### 2. Install Dependencies
`npm install`

### 3. Jq Setup

Command-line JSON processor
- https://jqlang.github.io/jq/download/
- https://github.com/jqlang/jq

### 4. Run app 
`npm run start`

## Logger API Usage Guide

This API is used to perform various logging operations. The core features provided by the API are as follows:

### 1. Add Log Entry

**Endpoint:** `POST /log`

To add a log entry to this endpoint, use the following parameters:

-   **name** (required): Name of the log entry.
-   **data** (required): Data of the log entry. It can be a string or an object.
-   **level** (optional): Log level. It can be one of the following values: `error`, `warn`, `info`, `debug`, `trace`.

#### Example Usage:
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "SampleLog", "data": "This is sample log data.", "level": "info"}' \
  http://localhost:3000/log
```

### 2. Query Logs

**Endpoint:** `GET /log`

To query logs based on specific criteria, use the following parameters:
 
-   **name** (required): Name of the log entry.
-   **level** (optional): Log level. It can be one of the following values: `error`, `warn`, `info`, `debug`, `trace`.
-   **lines** (optional): Number of log lines requested.
-   **raw** (optional): If set to `true`, log data will be returned raw without processing.

#### Example Usage:
```bash
curl -X GET \
  "http://localhost:3000/log?name=SampleLog&level=info&lines=10&raw=true"
```

### Final
You can find your log files under the **records** folder. 🥳

This application is still in development. Feel free to share any errors, requests, and suggestions. 


