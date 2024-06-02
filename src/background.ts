import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = 'https://ksjtradbrxveppxtjsqy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzanRyYWRicnh2ZXBweHRqc3F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5MTc2ODUsImV4cCI6MjAzMjQ5MzY4NX0.1zJyYVXzEYbWGWLrkVa9CSENkJX2LZaE1DzP-Rbb6Ak';
const supabase = createClient(supabaseUrl, supabaseKey);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'LOGIN_WITH_GOOGLE') {
    console.log('LOGIN_WITH_GOOGLE message received');
    // Open a new tab with the login page URL
    chrome.tabs.create({ url: 'login.html' });
  }
});

// Get the redirect URL
chrome.identity.getAuthToken({ interactive: false }, (token) => {
  if (!token) {
    console.error('Failed to get authentication token');
    return;
  }
  // Extract redirect URL from the token
  const redirectUrl = `https://<YOUR_EXTENSION_ID>.chromiumapp.org/`;
  
  // Construct the authorization URL with the redirect URL
  const authUrl = `https://ksjtradbrxveppxtjsqy.supabase.co/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectUrl)}`;

  // Listen for the OAuth redirect callback
  chrome.identity.launchWebAuthFlow(
    {
      url: authUrl,
      interactive: true
    },
    (redirectResponse) => {
      if (chrome.runtime.lastError || !redirectResponse) {
        console.error(chrome.runtime.lastError);
        return;
      }
      // Process the response, for example by extracting the token
      const accessToken = new URL(redirectResponse).hash.split('&')[0].split('=')[1];
      console.log('Access Token:', accessToken);
    }
  );
});
