
const BASE_URL = import.meta.env.VITE_BASE_URL;
const USERNAME = import.meta.env.VITE_USERNAME;
const PASSWORD = import.meta.env.VITE_PASSWORD;


export const getValidToken = async () => {
  const cachedToken = localStorage.getItem('bhima_api_token');
  const expiry = localStorage.getItem('bhima_token_expiry');

  if (cachedToken && expiry && Date.now() < parseInt(expiry) - 300000) {
    return cachedToken;
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
      }),
    });

    const data = await response.json();

    if (data.access_token) {
      localStorage.setItem('bhima_api_token', data.access_token);
      const expiresIn = data.expires_in || 3600;
      const expiryTime = Date.now() + (expiresIn * 1000);
      localStorage.setItem('bhima_token_expiry', expiryTime.toString());
      
      return data.access_token;
    }
  } catch (error) {
    console.error("Auth failed:", error);
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjU0MzIxL2F1dGgvdjEiLCJzdWIiOiIxN2Q1NzVhNS05ZjY2LTRlY2QtOGRjNS0yYWU3OTFiYjlmMzciLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzcxOTI5NDQxLCJpYXQiOjE3NzE5MjU4NDEsImVtYWlsIjoic2FwdGhhQGFnaWxlc29mdGxhYnMuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6InNhcHRoYUBhZ2lsZXNvZnRsYWJzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJtb2JpbGUiOiI5OTk5OTk5OTk5IiwibmFtZSI6IlNhcHRoYSIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiMTdkNTc1YTUtOWY2Ni00ZWNkLThkYzUtMmFlNzkxYmI5ZjM3In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMiIsImFtciI6W3sibWV0aG9kIjoidG90cCIsInRpbWVzdGFtcCI6MTc3MTkyNTg0MX0seyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc3MTkyNTgyNH1dLCJzZXNzaW9uX2lkIjoiZWM0Nzg4MzYtNTQwZS00NWU2LThmZjYtNzY4ZDQ2OTU0M2U4IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.IUCPrvGulcsP5ZTR1yB4bv43Um8BFqjweaOCrffkz2g";
  }
};
