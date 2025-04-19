export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const data = {
                ...req.body,
                timestamp: Date.now()
            };
            // Store data in Vercel KV (Key-Value store)
            await kv.set('latestData', JSON.stringify(data));
            return res.status(200).json({ status: 'success' });
        } catch (error) {
            return res.status(500).json({ error: 'Storage failed' });
        }
    }
    return res.status(405).end();
};
