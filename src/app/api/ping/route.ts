import { NextResponse } from 'next/server';
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();
  const { data: information, error: errorInformation } = await supabase
    .from("profile")
    .select("email")
    .single();
  console.log({information})
  // Your logic here
  console.log('Cron hit at', new Date().toISOString());
  
  return NextResponse.json({ message: 'Pinged successfully!' });
}