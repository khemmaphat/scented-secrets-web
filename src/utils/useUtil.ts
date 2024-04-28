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

    public static genEnglishCharacterArray() {
        const characters: string[] = []
        for (let i = 65; i <= 90; i++) {
            characters.push(String.fromCharCode(i))
        }
        return characters
    }

    public static LoginCheck() {
        if (
            sessionStorage.getItem('id') == null &&
            localStorage.getItem('id') == null
        ) {
            return false
        }

        return true
    }
}
