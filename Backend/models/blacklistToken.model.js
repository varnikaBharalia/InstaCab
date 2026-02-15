import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required:true,
        unique:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400,
    }
})


const blackListToken = mongoose.model('BlackListToken' , blackListTokenSchema);
export default blackListToken;





// We will set a "TTL" (Time To Live) so these tokens automatically delete themselves from the database after 24 hours






/**
 * 
 * 
 * 
 * However, for an app like Uber (which handles payments, real-time location, and personal safety), just clearing the cookie is a major security hole.Here is why res.clearCookie() is not enough:1. The "Photocopied Key" ProblemJWTs (JSON Web Tokens) are like hotel key cards.Clearing the Cookie: This is like throwing your key card in the trash. You can't use it anymore.The Problem: If someone (a hacker, a malicious browser extension, or a virus) made a "photocopy" of that key card before you threw it away, they can still use it to open your door.Because JWTs are "stateless," your server normally just checks: "Is this signature valid?" It doesn't check "Is this user logged in?"So, even after you log out, that stolen token remains valid until it expires (usually 24 hours).2. The Blacklist SolutionBy implementing the Blacklist, you are effectively telling the hotel reception:"Hey, key card #12345 is lost. If anyone tries to use it, do not let them in."Now, even if a hacker has the stolen token, your server checks the Blacklist, sees the token is there, and rejects the request.This way, you can immediately invalidate a token upon logout, enhancing security significantly.3. Real-World ImplicationsFor an app like Uber, where users' safety and financial information are at stake, relying solely on cookie clearing is risky. If a user's token is stolen and they log out without a blacklist, the thief could continue to access their account until the token expires. By using a blacklist, Uber can ensure that once a user logs out, their session is truly terminated, providing an extra layer of security against unauthorized access.
 */