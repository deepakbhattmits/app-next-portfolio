export default async (req, res) => {
  const { method } = req;
  // Allow requests from your specific origin
  res.setHeader('Access-Control-Allow-Origin', 'https://app-next-portfolio.vercel.app');
  // Specify allowed HTTP methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  // Specify allowed headers
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // This will allow OPTIONS request
  if (method === "OPTIONS") {
    return res.status(200).send("ok");
  }
};
