// app/(tabs)/home.tsx
import { useEffect } from "react";
import { router } from "expo-router";

export default function HomeRedirect() {
  useEffect(() => {
    router.replace("/mainpage"); // navigates to the landing tabs
  }, []);

  return null; // or a loading spinner
}