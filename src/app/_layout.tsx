import { router, Stack } from "expo-router";
import { useEffect } from 'react';

import { AuthProvider, useAuth } from '@/contexts/AuthContexts';
import { supabase } from '@/lib/supabase';


 export default function RootLayout(){
   return (
      <AuthProvider>
        <MainLayout/>
      </AuthProvider>
   )
 }


function MainLayout() {

  const { setAuth } = useAuth()
  
    useEffect(()=>{
      supabase.auth.onAuthStateChange((_event, session) => {
        
        if(session){
          setAuth(session.user);
          router.replace('/(panel)/Home');
          return
        }

        setAuth(null);
        router.replace('/(auth)/Signin')
      }) 
    },[])
  return (
    <Stack>
      <Stack.Screen name="index" 
      options={{ headerShown: false }} />

      <Stack.Screen name="(auth)/Signin/index" 
      options={{ headerShown: false }} />

      <Stack.Screen name="(auth)/Signup/index" 
      options={{ headerShown: false }} />

      <Stack.Screen name="(panel)/Home/index" 
      options={{ headerShown: false }} />
    </Stack>
  );
}