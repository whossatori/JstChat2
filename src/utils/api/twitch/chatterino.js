export default {
  async getChatterinoBadges() {
    try {
      const response = await fetch(`https://api.chatterino.com/badges`)
      if (response.ok) {
        const json = await response.json()

        let badges = []

        for (const b of json.badges) {
          badges.push({ name: b.tooltip, url: b.image2, users: b.users })
        }
        return badges
      }
    } catch {
      console.log(`[Chatterino API] Failed to fetch Chatterino Badges`)
    }
    return []
  },

  async getHomiesBadges() {
    let badges = []

    /** Main Homies badge slot - each entry maps to a single userId */
    try {
      const response = await fetch(`https://chatterinohomies.com/api/badges/list`)
      if (response.ok) {
        const json = await response.json()
        for (const b of json.badges) {
          badges.push({ name: b.tooltip, url: b.image2, users: [b.userId] })
        }
      }
    } catch {
      console.log(`[Chatterino API] Failed to fetch Homies Badges (main slot)`)
    }

    /** 2 extra Homies badge slots - each entry maps to a users array */
    for (const slotUrl of [`https://itzalex.github.io/badges`, `https://itzalex.github.io/badges2`]) {
      try {
        const response = await fetch(slotUrl)
        if (response.ok) {
          const json = await response.json()
          for (const b of json.badges) {
            badges.push({ name: b.tooltip, url: b.image2, users: b.users })
          }
        }
      } catch {
        console.log(`[Chatterino API] Failed to fetch Homies Badges (${slotUrl})`)
      }
    }

    return badges
  }
}
