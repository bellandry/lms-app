import { getProgress } from "@/actions/get-progress"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import CourseNavbar from "./_components/course-navbar"
import { CourseSidebar } from "./_components/course-sidebar"

const CourseLayout = async ({
  children,
  params }: {
    children: React.ReactNode
    params: { courseId: string }
  }) => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId
    },
    include: {
      chapters: {
        where: {
          isPublished: true
        },
        include: {
          userProgress: {
            where: {
              userId
            }
          }
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  })

  if (!course) {
    return redirect("/")
  }

  const progressCount = await getProgress(userId, course.id)

  return (
    <div className="h-full">
      <div className="h-[57px] w-full md:w-[calc(100vw-20rem)] px-2 md:px-4 md:ml-80 fixed inset-y-0 bg-white z-50">
        <CourseNavbar
          course={course}
          progressCount={progressCount}
        />
      </div>
      <div className="hidden md:flex h-hull w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
        />
      </div>
      <div className="md:pl-80 h-full pt-[58px]">
        {children}
      </div>
    </div>
  )
}

export default CourseLayout