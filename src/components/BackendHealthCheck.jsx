import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';

/**
 * BackendHealthCheck Component
 * Tests connectivity to the backend health endpoint
 * Logs results to browser console and displays status
 */
export function BackendHealthCheck() {
  const [status, setStatus] = useState('idle'); // idle, checking, connected, failed
  const [message, setMessage] = useState('');

  const testConnection = async () => {
    setStatus('checking');
    const startTime = performance.now();

    try {
      console.log(`[Backend Health Check] Testing connection to: ${API_BASE_URL}/api/health/`);

      const response = await fetch(`${API_BASE_URL}/api/health/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      console.log(`✅ [Backend Health Check] SUCCESS - Connected in ${duration}ms`);
      console.log(`[Backend Response]`, data);
      
      setStatus('connected');
      setMessage(`✅ Backend connected (${duration}ms) - ${JSON.stringify(data)}`);
    } catch (error) {
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);
      
      console.error(`❌ [Backend Health Check] FAILED after ${duration}ms`);
      console.error(`[Error Details]`, error.message);
      console.error(`[Backend URL]`, `${API_BASE_URL}/api/health/`);
      
      setStatus('failed');
      setMessage(`❌ Backend connection failed: ${error.message}`);
    }
  };

  // Auto-check on component mount
  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-200">
            Backend Status: {status === 'connected' && <span className="text-green-400">✓ Connected</span>}
            {status === 'failed' && <span className="text-red-400">✗ Disconnected</span>}
            {status === 'checking' && <span className="text-yellow-400">⟳ Checking...</span>}
            {status === 'idle' && <span className="text-slate-400">○ Not tested</span>}
          </p>
          {message && <p className="text-xs mt-1 text-slate-400">{message}</p>}
        </div>
        <button
          onClick={testConnection}
          disabled={status === 'checking'}
          className="px-3 py-1 text-xs rounded bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white whitespace-nowrap ml-3"
        >
          {status === 'checking' ? 'Testing...' : 'Test Backend'}
        </button>
      </div>
    </div>
  );
}

/**
 * Utility function to test backend connectivity
 * Can be called from anywhere in the app
 * Results are logged to console
 */
export async function testBackendConnection() {
  console.log('🔍 [Backend Connectivity Test] Starting...');
  console.log(`[Backend URL] ${API_BASE_URL}/api/health/`);

  try {
    const response = await fetch(`${API_BASE_URL}/api/health/`);
    const data = await response.json();

    if (response.ok) {
      console.log('✅ Backend is accessible!');
      console.log('📊 Response:', data);
      return { success: true, data, status: response.status };
    } else {
      console.error('❌ Backend returned an error:', response.status);
      return { success: false, status: response.status };
    }
  } catch (error) {
    console.error('❌ Cannot reach backend:', error.message);
    return { success: false, error: error.message };
  }
}
