import { createClient } from '@sanity/client'

const client = createClient({
    projectId: '30ojlbz1',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-01',
})

export default client
