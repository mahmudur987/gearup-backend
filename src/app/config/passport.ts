/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import passport, { Profile } from "passport";
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import { envVariables } from "./env.config";
import { User } from "../modules/user/user.model";
import { IsActive, IUSER, Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import {
  UserValidationResult,
  validateUserStatus,
} from "../middleware/validateUserStatus";
// credential
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const isUserExist = await User.findOne({ email });

        if (!isUserExist) {
          return done(null, false, { message: "user not exist" });
        }
        if (
          isUserExist.isActive === IsActive.BLOCKED ||
          isUserExist.isActive === IsActive.INACTIVE
        ) {
          return done(null, false, { message: "user blocked" });
        }
        if (isUserExist.isDeleted) {
          return done(null, false, { message: "user deleted" });
        }
        if (isUserExist.isVerified === false) {
          return done(null, false, { message: "user not verified" });
        }
        const hasGoogle = isUserExist.auths?.some(
          (providerObject) => providerObject.provider === "google"
        );

        const hasCredential = isUserExist.auths?.some(
          (providerObject) => providerObject.provider === "credential"
        );

        if (hasGoogle && !hasCredential) {
          return done(null, false, {
            message:
              "You should login using Google and set a password for credential login.",
          });
        }

        const isPasswordMatch = await bcrypt.compare(
          password as string,
          isUserExist.password as string
        );

        if (!isPasswordMatch) {
          return done(null, false, { message: "password not match" });
        }

        return done(null, isUserExist);
      } catch (err) {
        done(err);
      }
    }
  )
);
// google

passport.use(
  new GoogleStrategy(
    {
      clientID: envVariables.GOOGLE_CLIENT_ID,
      clientSecret: envVariables.GOOGLE_CLIENT_SECRET,
      callbackURL: envVariables.GOOGLE_CALLBACK_URL, // <- use env
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
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
            name: profile.displayName,
            picture: profile.photos?.[0]?.value,
            role: Role.USER,
            isVerified: true,
            isActive: IsActive.ACTIVE,
            auths: [
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
        const hasGoogle = user.auths?.some((a) => a.provider === "google");
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
            }
          );
          user = await User.findById(user._id); // refresh
        }

        return done(null, user as IUSER); // return your app user, not the Google profile
      } catch (err) {
        console.error("Google strategy error:", err);
        return done(err as Error);
      }
    }
  )
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
