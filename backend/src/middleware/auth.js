const isAuth = (req, res, next) => {
    const isAdmin = 'xyz';
    const checkAdmin = isAdmin === 'xyz';
    if (checkAdmin) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}

module.exports = { isAuth };