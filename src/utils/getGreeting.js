export default function getGreeting() {
    let time = new Date()
    let hour = time.getHours()

    if (hour < 11) {
        return 'Good morning'
    } else if (hour >= 11 && hour <= 16) {
        return 'Good afternoon'
    } else {
        return 'Good evening'
    }
}