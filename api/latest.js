export default async (req, res) => {
    try {
        const data = await kv.get('latestData');
        return res.status(200).json(JSON.parse(data || '{}'));
    } catch (error) {
        return res.status(500).json({ error: 'Data retrieval failed' });
    }
};
