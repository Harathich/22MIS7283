const axios = require("axios");

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJoYXJhdGhpLjIybWlzNzI4M0B2aXRhcHN0dWRlbnQuYWMuaW4iLCJleHAiOjE3Nzg5MzIzNjUsImlhdCI6MTc3ODkzMTQ2NSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjgxZmYzZWQ5LWFkMjktNGE5OS1hYTY0LTFiOTA2N2I5YmVjYiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImhhcmF0aGkgY2hhdmFsYSIsInN1YiI6ImI3YTk2OTI3LTUzYzEtNDU2YS1iMDU3LTdlYjdlMjYzNGE5NyJ9LCJlbWFpbCI6ImhhcmF0aGkuMjJtaXM3MjgzQHZpdGFwc3R1ZGVudC5hYy5pbiIsIm5hbWUiOiJoYXJhdGhpIGNoYXZhbGEiLCJyb2xsTm8iOiIyMm1pczcyODMiLCJhY2Nlc3NDb2RlIjoiU2ZGdVdnIiwiY2xpZW50SUQiOiJiN2E5NjkyNy01M2MxLTQ1NmEtYjA1Ny03ZWI3ZTI2MzRhOTciLCJjbGllbnRTZWNyZXQiOiJCeWdzZ0pIempqemRYcEhnIn0.l8WBxRs3aEtuWjJfJAPWsI05YQM8o3TybPNW2_6rLds";

async function Log(stack, level, packageName, message) {

  try {

    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack: stack,
        level: level,
        package: packageName,
        message: message
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Log created successfully");

    console.log(response.data);

    return response.data;

  } catch (error) {

    console.log("Logging failed");

    if (error.response) {
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

module.exports = Log;