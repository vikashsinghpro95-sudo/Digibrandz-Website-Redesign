import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { turso, fetchAll } from '../lib/turso'
import {
  FALLBACK_CONTENT,
  normalizeAbout,
  normalizeCareers,
  normalizeCaseStudies,
  normalizeIndustries,
  normalizeNav,
  normalizeServices,
  normalizeTeam,
  normalizeTestimonials,
} from '../api/content'

const ContentContext = createContext(FALLBACK_CONTENT)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(FALLBACK_CONTENT)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const results = await Promise.allSettled([
        fetchAll('SELECT setting_key, setting_value FROM settings'),
        fetchAll('SELECT * FROM services ORDER BY display_order ASC, id ASC'),
        fetchAll('SELECT * FROM case_studies ORDER BY display_order ASC, id ASC'),
        fetchAll('SELECT * FROM team_members ORDER BY display_order ASC, id ASC'),
        fetchAll('SELECT * FROM testimonials ORDER BY id ASC'),
        fetchAll('SELECT * FROM industries ORDER BY display_order ASC, id ASC'),
        fetchAll('SELECT * FROM jobs ORDER BY display_order ASC, created_at DESC'),
        fetchAll('SELECT * FROM nav_links ORDER BY display_order ASC, id ASC'),
      ])

      const value = (index) => (results[index].status === 'fulfilled' ? results[index].value : null)

      if (cancelled) return
      
      const settingsRows = value(0) || [];
      const settingsObj = {};
      settingsRows.forEach(r => settingsObj[r.setting_key] = r.setting_value);

      setContent({
        about: normalizeAbout(settingsObj),
        services: normalizeServices(value(1)),
        caseStudies: normalizeCaseStudies(value(2)),
        team: normalizeTeam(value(3)),
        testimonials: normalizeTestimonials(value(4)),
        industries: normalizeIndustries(value(5)),
        careers: normalizeCareers(value(6)),
        navLinks: normalizeNav(value(7)),
      })
    }

    load().catch(() => {
      if (!cancelled) setContent(FALLBACK_CONTENT)
    })

    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => content, [content])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  return useContext(ContentContext)
}
