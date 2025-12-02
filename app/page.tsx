import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to /demo where the app is working
  redirect('/demo');
  
  // This return is needed to satisfy TypeScript, but won't be reached due to the redirect
  return null;
}
