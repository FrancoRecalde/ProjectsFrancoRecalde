const notFound = (req, res, next) => {
    res.status(404).json({
        error: (`Not Found [${req.path}]`),
    });

    next();
};

export default notFound;
