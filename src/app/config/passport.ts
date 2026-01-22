/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import passport, { Profile } from "passport";
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import { envVariables } from "./env.config";
import { User } from "../modules/user/user.model";
import { IUser, Role, Status } from "../modules/user/user.interface";

import bcrypt from "bcryptjs";
import {
  UserValidationResult,
  validateUserStatus,
} from "../middleware/validateUserStatus";

// google

passport.use(
  new GoogleStrategy(
    {
      clientID: envVariables.GOOGLE_CLIENT_ID,
      clientSecret: envVariables.GOOGLE_CLIENT_SECRET,
      callbackURL: envVariables.GOOGLE_CALLBACK_URL,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: VerifyCallback,
    ) => {
      try {
        console.log(envVariables.GOOGLE_CALLBACK_URL);
        const email = profile.emails?.[0]?.value?.toLowerCase();
        if (!email) {
          return done(null, false, { message: "No email found from Google" });
        }

        // Try to find the user
        let user = await User.findOne({ email });

        // If user does not exist, create one
        if (!user) {
          user = await User.create({
            email,
            fullName: profile.displayName,
            profileImage: profile.photos?.[0]?.value,
            role: Role.USER,
            isEmailVerified: true,
            status: Status.ACTIVE,
            auth: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });

          return done(null, user);
        }

        const validation: UserValidationResult = validateUserStatus(user);

        if (!validation.isValid) {
          return done(null, false, { message: validation.message });
        }

        // Ensure google auth is attached (if they registered via credential before)
        const hasGoogle = user.auth?.some((a) => a.provider === "google");
        if (!hasGoogle) {
          await User.updateOne(
            { _id: user._id },
            {
              $addToSet: {
                auths: {
                  provider: "google",
                  providerId: profile.id,
                },
              },
            },
          );
          user = await User.findById(user._id); // refresh
        }

        return done(null, user as IUser); // return your app user, not the Google profile
      } catch (err) {
        console.error("Google strategy error:", err);
        return done(err as Error);
      }
    },
  ),
);

passport.serializeUser((user: any, done: any) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = User.findById(id);
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error);
  }
});
