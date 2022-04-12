import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(404).json({ message: 'Espcify search query' });
}