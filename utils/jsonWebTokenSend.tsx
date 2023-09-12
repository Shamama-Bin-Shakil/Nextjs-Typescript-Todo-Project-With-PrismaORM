import JWT from "jsonwebtoken"

 const JWTToken = (payload: {id: string}) => {
    return JWT.sign(payload, process.env.SECRET_KEY);
}

export default JWTToken