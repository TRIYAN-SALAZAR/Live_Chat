function errorByUser(res, {err = null}) {
    return res.status(400).json({ message: err.message });
}

module.exports = errorByUser;