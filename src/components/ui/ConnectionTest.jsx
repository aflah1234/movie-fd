import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosInstance';

const ConnectionTest = () => {
  const [status, setStatus] = useState('testing');
  const [error, setError] = useState('');
  const [backendUrl, setBackendUrl] = useState('');

  useEffect(() => {
    setBackendUrl(import.meta.env.VITE_API_URL);
    testConnection();
  }, []);

  const testConnection = async () => {
    setStatus('testing');
    try {
      setStatus('testing');
      setError('');
      
      console.log('🧪 Testing backend connection...');
      console.log('Backend URL:', import.meta.env.VITE_API_URL);
      
      // Test basic connection
      const response = await axiosInstance.get('/movie/movies');
      
      if (response.status === 200) {
        setStatus('connected');
        console.log('✅ Backend connection successful!');
      }
    } catch (err) {
      setStatus('failed');
      setError(err.message);
      console.error('❌ Backend connection failed:', err);
      
      // Additional debugging info
      if (err.code === 'ECONNREFUSED') {
        console.log('🔍 Server might not be running on port 8001');
      } else if (err.response?.status === 404) {
        console.log('🔍 API endpoint not found');
      } else {
        console.log('🔍 API endpoint not found');
      }
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'failed': return 'text-error';
      case 'testing': return 'text-warning';
      default: return 'text-base-content';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'connected': return '✅';
      case 'failed': return '❌';
      case 'testing': return '🔄';
      default: return '❓';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-base-200 p-4 rounded-lg shadow-lg border border-base-300 max-w-sm">
      <h3 className="font-bold text-sm mb-2">🔗 Backend Connection</h3>
      
      <div className="space-y-2 text-xs">
        <div className={`flex items-center gap-2 ${getStatusColor()}`}>
          <span>{getStatusIcon()}</span>
          <span className="capitalize font-medium">{status}</span>
        </div>
        
        <div className="text-base-content/70">
          <div>URL: {backendUrl}</div>
        </div>
        
        {error && (
          <div className="text-error text-xs bg-error/10 p-2 rounded">
            {error}
          </div>
        )}
        
        <button 
          onClick={testConnection}
          className="btn btn-xs btn-primary w-full mt-2"
          disabled={status === 'testing'}
        >
          {status === 'testing' ? 'Testing...' : 'Test Again'}
        </button>
      </div>
    </div>
  );
};

export default ConnectionTest;