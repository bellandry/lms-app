import { db } from "@/lib/db"
import { Category, Chapter, Course } from "@prisma/client"
import { getProgress } from "./get-progress"

type CourseWithProgressWithCategories = Course & {
  category: Category
  chapters: Chapter[]
  progress: number | null
}

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategories[]
  coursesInProgress: CourseWithProgressWithCategories[]
  allCourses: CourseWithProgressWithCategories[]
}

export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
  try {
    const purchaseCourses = await db.purchase.findMany({
      where: {
        userId
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true
              }
            }
          }
        }
      }
    })

    const courses = purchaseCourses.map((purchase) => purchase.course) as CourseWithProgressWithCategories[]

    for(let course of courses) {
      const progress = await getProgress(userId, course.id)
      course['progress'] = progress
    }

    const completedCourses = courses.filter((course) => course.progress === 100) 
    const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100)
    const allCourses = courses

    return {
      completedCourses,
      coursesInProgress,
      allCourses
    }
  } catch(err) {
    console.log('[GET_DASHBOARD_COURSES', err)
    return {
      completedCourses: [],
      coursesInProgress: [],
      allCourses: []
    }
  }
}