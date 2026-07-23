export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    service: 'Danscents API',
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL ? 'Vercel Serverless' : 'Local Node'
  });
}
