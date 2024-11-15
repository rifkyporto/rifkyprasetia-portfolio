// pages/api/revalidate.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(
  req: NextRequest,
  res: NextApiResponse
) {
  // Verify the request is from Vercel
  // You should set this in your Vercel environment variables
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Fetch all slugs from your Supabase table
    const { data: slugs, error } = await supabase
      .from('projects')
      .select('id')
    
    if (error) throw error

    // Revalidate each path
    for (const { id } of slugs) {
      await res.revalidate(`/${id}`)
    }

    return res.json({ revalidated: true, message: 'Cache warmed successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Error warming cache', error })
  }
}
