async function isAuthor(req, res, next) {
  try {
    if (req.userId == req.params.id) throw new Error("userId");
    next();
  } catch (err) {
    console.log("middleware author");
    console.error(err);
  }
}

export default isAuthor;
