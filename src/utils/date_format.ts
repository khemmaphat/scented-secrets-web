export class useUtil {
    public static formatDate(isoDate: Date): {
        day: number
        month: number
        year: number
    } {
        const date = new Date(isoDate)
        const day = date.getDate()
        const month = date.getMonth() + 1 // Adding 1 because JavaScript months are zero-based
        const year = date.getFullYear()

        return { day, month, year }
    }

    public static formatDate_DB(
        day: number,
        month: number,
        year: number
    ): Date {
        const formattedDate = new Date(year, month - 1, day)
        return formattedDate
    }
}
