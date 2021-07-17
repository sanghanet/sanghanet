import { PORT, CLIENT_ID, CLIENT_SECRET } from '../config';

import passport, { Profile } from 'passport';

import mongoose from 'mongoose';
import Member from '../models/member.model';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import log4js from 'log4js';
const log = log4js.getLogger('controllers/passport.controller.js');

passport.serializeUser((userID, done) => {
    log.info(`serialize ${userID}`);
    done(null, userID);
});

passport.deserializeUser((userID: Express.User, done) => {
    Member.findOne({ _id: mongoose.Types.ObjectId(userID as string) })
        .then((identifiedUserObject: Member) => {
            if (!identifiedUserObject) {
                log.info('deserialization failed');
                done(null, null);
            } else {
                log.info(`deserialized user as: ${identifiedUserObject.email}`);
                done(null, identifiedUserObject);
            }
        })
        .catch((err: Error) => { log.fatal(err); });
});

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: `http://localhost:${PORT}/auth/passport`
}, (identifier, refreshtoken, profile: Profile, done) => {
    if (profile.emails) {
        Member.findOne({ email: profile.emails[0].value })
            .then((userObject: Member) => {
                return userObject
                    ? done(null, userObject._id)
                    : done(null, undefined);
            })
            .catch((err: Error) => { log.fatal(err); });
    } else {
        log.error('Uhh, we should never be here!');
        done(null, undefined);
    }
}));

export default passport;
