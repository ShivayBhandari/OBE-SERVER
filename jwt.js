const jwt = require('jsonwebtoken')
const Users = require('./models/user')

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESSTOKENSECRET || "secret", { expiresIn: '2m', });
  const refreshToken = jwt.sign(payload, process.env.ACCESSTOKENSECRET || "secret", { expiresIn: '4m' });

  return { accessToken, refreshToken };
}

const verifyToken = (token) => new Promise((resolve, reject) => {
    var { response, error } = jwt.verify(token, process.env.ACCESSTOKENSECRET || "secret");
    if (error) reject(false);
    if (response) resolve(true);

});

const tokenVerify = async (req, res, next) => {
    let refreshToken, accessToken;
    const getValue = (value, key) => value !== undefined ? value.replace(key, "") : null;
    try {
        const list = req.headers.cookie.split('; ').filter(x => x.includes("Token"));
        accessToken = getValue(list.filter(x => x.includes('access'))[0], 'accessToken=')
        refreshToken = getValue(list.filter(x => x.includes('refresh'))[0], 'refreshToken=')
        console.log('access', accessToken, refreshToken)

        if (!accessToken) throw new Error();
        const userData = await jwt.verify(accessToken, process.env.ACCESSTOKENSECRET || "secret");
        if(!userData) throw new Error()
        // req.user = userData;
        next();
    } catch (error) {
        if (error.message === "jwt expired") {
            console.log("in jwt expired")
            let refreshVerify
            try {
                refreshVerify = jwt.verify(refreshToken, process.env.ACCESSTOKENSECRET || "secret")
                const { id } = jwt.decode(refreshToken);
                const { accessToken: access, refreshToken: refresh } = generateTokens({ id });
                 req.user = {
                    userData: id,
                    accessToken: access,
                    refreshToken: refresh
                }
                console.log(req.user);
                next();  
            } catch (err) {
                console.log(err.message)
                res.status(401).json({ message: 'Invalid Token' }).end()
                // return null
            }
            console.log(refreshVerify);
            // if (refreshVerify) {
            //     const { id } = jwt.decode(refreshToken);
            //     const { accessToken: access, refreshToken: refresh } = generateTokens({ id });
            //      req.user = {
            //         userData: id,
            //         accessToken: access,
            //         refreshToken: refresh
            //     }
            //     console.log(req.user);
            //     next();   
            // } else {
            //     res.status(401).json({ message: 'Invalid Token' }).end()
            // }
        } else {
            res.status(401).json({ message: 'unauthorized' }).end();
        }
        // if(err.includes(jwt expired)) then refresh the token
    }
}

// const refresh = async (refreshTokenCookie, req, res) => {
//     try {
//         let userData = await jwt.verify(refreshTokenCookie, process.env.ACCESSTOKENSECRET || "secret")
//         let { accessToken, refreshToken } = await generateTokens(userData);
        
//         res.status(200).json({
//             userData: userData,
//             accessToken: accessToken,
//             refreshToken: refreshToken
//         }).end();
//     } catch (error) {
//         console.log("TokenRefreshError: ", error);
//         res.status(401).json({ message: 'Invalid Token' })
//     }
// }

module.exports = { generateTokens, tokenVerify }