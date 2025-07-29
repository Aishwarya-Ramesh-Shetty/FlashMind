import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_Secret);
    req.user = decoded; 
    console.log("Decoded user:", req.user);

  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
