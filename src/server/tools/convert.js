const TextToJson = (req, res, next)  =>
{
    try {
        const Target = JSON.parse(req.body);
        req.body = Target;
        next();
    } catch (e) {
        res.status(400).json({error: "invalid json"});
        return false;
    }
}
module.exports = TextToJson;