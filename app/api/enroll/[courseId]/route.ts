import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  const { userId } = auth()
  const { courseId } = params

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      isPublished: true
    }
  })

  if(!course) {
    return new NextResponse('Course not found', { status: 404 })
  }

  if(!userId) {
    return new NextResponse('Unauthoried ', { status: 401 })
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: userId,
        courseId: courseId,
      }
    }
  })

  if(purchase) {
    return new NextResponse('Already purchased', { status: 400 })
  }

  const purchaseCourse = await db.purchase.create({
    data: {
      courseId,
      userId
    }
  })

  return NextResponse.json({purchaseCourse})
}
