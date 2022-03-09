
import { useState, useCallback } from "react";
const useHttpRequest = (applyData = null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig) => {
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url, {
            method: requestConfig.method ? requestConfig.method : 'GET',
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.body? JSON.stringify(requestConfig.body) : null
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setIsLoading(true);
      setError(err.message);
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  },[applyData]);
  return {
      isLoading,
      error,
      sendRequest
  }
}
export default useHttpRequest;