// Authentication utility functions
export const auth = {
    // Check if user is authenticated
    isAuthenticated: () => {
      return !!localStorage.getItem('authToken');
    },
  
    // Get current user
    getUser: () => {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    },
  
    // Login user
    login: async (email, password) => {
      try {
        // In production, call your backend API
        // const response = await fetch('/api/auth/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email, password })
        // });
        // const data = await response.json();
        
        // For demo - simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful login
        const mockUser = {
          id: '1',
          name: email.split('@')[0],
          email: email,
          university: 'Demo University'
        };
        
        const mockToken = 'demo_token_' + Date.now();
        
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        return { success: true, user: mockUser };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  
    // Signup user
    signup: async (name, email, password, university) => {
      try {
        // In production, call your backend API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful signup
        const mockUser = {
          id: '1',
          name: name,
          email: email,
          university: university || 'Not specified'
        };
        
        const mockToken = 'demo_token_' + Date.now();
        
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        return { success: true, user: mockUser };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  
    // Social login
    socialLogin: async (provider) => {
      try {
        // In production, redirect to OAuth provider
        // window.location.href = `/api/auth/${provider}`;
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser = {
          id: '1',
          name: `${provider} User`,
          email: `user@${provider}.com`,
          university: 'Demo University'
        };
        
        const mockToken = 'demo_token_' + Date.now();
        
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        return { success: true, user: mockUser };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  
    // Logout user
    logout: () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  };
  
  // Export shorthand functions
  export const isAuthenticated = auth.isAuthenticated;
  export const getUser = auth.getUser;
  export const login = auth.login;
  export const signup = auth.signup;
  export const socialLogin = auth.socialLogin;
  export const logout = auth.logout;