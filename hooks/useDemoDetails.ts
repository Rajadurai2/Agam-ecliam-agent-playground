import { useCallback, useEffect, useState } from 'react';
import { demoDetails } from '@/app/api/demo/route';

export default function usedemoDetails() {
  // Generate room connection details, including:
  //   - A random Room name
  //   - A random Participant name
  //   - An Access Token to permit the participant to join the room
  //   - The URL of the LiveKit server to connect to
  //
  // In real-world application, you would likely allow the user to specify their
  // own participant name, and possibly to choose from existing rooms to join.

  const [demoDetails, setdemoDetails] = useState<demoDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fetchdemoDetails = useCallback(() => {
    setdemoDetails(null);
    const url = new URL(
      process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ?? '/api/demo',
      window.location.origin
    );
    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => {
        setdemoDetails(data);
        console.log(data,"==================================")
      })
      .catch((error) => {
        console.error('Error fetching connection details:', error);
        setError(error);
      });
  }, []);

  useEffect(() => {
    fetchdemoDetails();
  }, [fetchdemoDetails]);

  return { error, demoDetails, refreshdemoDetails: fetchdemoDetails };
}
