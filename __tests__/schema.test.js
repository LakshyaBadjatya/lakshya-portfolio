import { buildSchema, schemaJson } from '@/lib/schema'
import { profile } from '@/content/profile'

describe('structured data', () => {
  const [person, org, site] = buildSchema()['@graph']

  test('the person is the CTO of the organization', () => {
    expect(person['@type']).toBe('Person')
    expect(person.jobTitle).toBe('Co-Founder & CTO')
    expect(person.worksFor['@id']).toBe(org['@id'])
    expect(org.name).toBe('Sammed Technosol')
    expect(org['@id']).toBe('https://www.samtechnos.com/#organization')
  })

  test('sameAs matches the profile links', () => {
    expect(person.sameAs).toEqual(profile.links.map((l) => l.href))
  })

  test('the website is published by the person', () => {
    expect(site.publisher['@id']).toBe(person['@id'])
  })

  test('no applicant wording and nothing private', () => {
    expect(schemaJson()).not.toMatch(/applicant|fall 2027|telephone|birthDate/i)
  })

  test('serialisation cannot close the script tag', () => {
    expect(schemaJson({ ...profile, name: '</script><b>x</b>' })).not.toContain('</script>')
  })
})
