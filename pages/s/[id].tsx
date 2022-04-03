import { useRouter } from 'next/router'

export function SharedTimetable() {
    const router = useRouter()
    const { id } = router.query
    return (
        <div>
            Timetable ID: {id}
        </div>
    )
}

export default SharedTimetable