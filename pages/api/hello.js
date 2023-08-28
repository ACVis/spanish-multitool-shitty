// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handlerHello(req, res) {
  // console.log("req: ", req);
  res.status(200).json({ name: "Hello" });
}
