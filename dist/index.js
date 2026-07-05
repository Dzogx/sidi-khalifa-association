// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/db.ts
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

// drizzle/schema.ts
import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
  boolean,
  json
} from "drizzle-orm/mysql-core";
var users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "president", "vice_president", "secretary"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
});
var news = mysqlTable("news", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 512 }),
  author: varchar("author", { length: 255 }),
  published: boolean("published").default(false),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  details: text("details"),
  category: varchar("category", { length: 100 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 512 }),
  progress: int("progress").default(0),
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  budget: decimal("budget", { precision: 12, scale: 2 }),
  status: mysqlEnum("status", ["planned", "ongoing", "completed", "paused"]).default("planned"),
  published: boolean("published").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  details: text("details"),
  category: varchar("category", { length: 100 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 512 }),
  location: varchar("location", { length: 255 }).notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate"),
  time: varchar("time", { length: 50 }),
  expectedAttendees: int("expectedAttendees"),
  actualAttendees: int("actualAttendees"),
  published: boolean("published").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var boardMembers = mysqlTable("board_members", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  bio: text("bio"),
  imageUrl: varchar("imageUrl", { length: 512 }),
  order: int("order").default(0),
  published: boolean("published").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var galleryImages = mysqlTable("gallery_images", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("imageUrl", { length: 512 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  order: int("order").default(0),
  published: boolean("published").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var documents = mysqlTable("documents", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(),
  fileUrl: varchar("fileUrl", { length: 512 }).notNull(),
  fileType: varchar("fileType", { length: 50 }),
  fileSize: int("fileSize"),
  published: boolean("published").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var memberships = mysqlTable("memberships", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  address: text("address"),
  occupation: varchar("occupation", { length: 255 }),
  status: mysqlEnum("status", ["pending", "approved", "rejected", "inactive"]).default("pending"),
  membershipNumber: varchar("membershipNumber", { length: 50 }).unique(),
  joinDate: timestamp("joinDate"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var volunteerApplications = mysqlTable("volunteer_applications", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  skills: text("skills"),
  availability: varchar("availability", { length: 100 }),
  interests: json("interests").$type(),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending"),
  notes: text("notes"),
  referenceNumber: varchar("referenceNumber", { length: 50 }).unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var complaints = mysqlTable("complaints", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  complaintType: varchar("complaintType", { length: 100 }).notNull(),
  description: text("description").notNull(),
  additionalNotes: text("additionalNotes"),
  status: mysqlEnum("status", ["new", "reviewed", "in_progress", "resolved", "closed"]).default("new"),
  referenceNumber: varchar("referenceNumber", { length: 50 }).unique(),
  priority: mysqlEnum("priority", ["low", "medium", "high", "urgent"]).default("medium"),
  assignedTo: int("assignedTo"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  resolvedAt: timestamp("resolvedAt")
});
var contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "replied"]).default("new"),
  reply: text("reply"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var statistics = mysqlTable("statistics", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: int("value").default(0),
  description: text("description"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});

// server/_core/env.ts
var ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
};

// server/db.ts
var _db = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    let sessionToken = cookies.get(COOKIE_NAME);
    if (!sessionToken) {
      const authHeader = req.headers.authorization;
      if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        sessionToken = authHeader.slice(7);
      }
    }
    const session = await this.verifySession(sessionToken);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    if (session.openId.startsWith(CRON_OPEN_ID_PREFIX)) {
      const userInfo = await this.getUserInfoWithJwt(sessionToken ?? "");
      const taskUid = userInfo.taskUid ?? null;
      if (!taskUid) {
        throw ForbiddenError("Cron session missing task_uid");
      }
      return buildCronUser(userInfo);
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionToken ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var CRON_OPEN_ID_PREFIX = "cron_";
function buildCronUser(userInfo) {
  const now = /* @__PURE__ */ new Date();
  return {
    id: -1,
    openId: userInfo.openId,
    name: userInfo.name || "Manus Scheduled Task",
    email: null,
    loginMethod: null,
    role: "user",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
    taskUid: userInfo.taskUid ?? void 0,
    isCron: true
  };
}
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/storageProxy.ts
function registerStorageProxy(app) {
  app.get("/manus-storage/*", async (req, res) => {
    const key = req.params[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }
    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage proxy not configured");
      return;
    }
    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/"
      );
      forgeUrl.searchParams.set("path", key);
      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` }
      });
      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }
      const { url } = await forgeResp.json();
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }
      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers/cms.ts
import { z as z2 } from "zod";

// server/cms.ts
import { eq as eq2, desc, and } from "drizzle-orm";
async function getPublishedNews(limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(news).where(eq2(news.published, true)).orderBy(desc(news.publishedAt)).limit(limit);
}
async function getNewsBySlug(slug) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(news).where(eq2(news.slug, slug)).limit(1);
  return result[0] || null;
}
async function createNews(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(news).values(data);
}
async function updateNews(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(news).set(data).where(eq2(news.id, id));
}
async function deleteNews(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(news).where(eq2(news.id, id));
}
async function getPublishedProjects(limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects).where(eq2(projects.published, true)).orderBy(desc(projects.createdAt)).limit(limit);
}
async function getProjectBySlug(slug) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(projects).where(eq2(projects.slug, slug)).limit(1);
  return result[0] || null;
}
async function createProject(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(projects).values(data);
}
async function updateProject(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(projects).set(data).where(eq2(projects.id, id));
}
async function getPublishedEvents(limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(events).where(eq2(events.published, true)).orderBy(desc(events.startDate)).limit(limit);
}
async function getEventBySlug(slug) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(events).where(eq2(events.slug, slug)).limit(1);
  return result[0] || null;
}
async function createEvent(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(events).values(data);
}
async function updateEvent(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(events).set(data).where(eq2(events.id, id));
}
async function getPublishedBoardMembers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(boardMembers).where(eq2(boardMembers.published, true)).orderBy(boardMembers.order);
}
async function createBoardMember(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(boardMembers).values(data);
}
async function updateBoardMember(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(boardMembers).set(data).where(eq2(boardMembers.id, id));
}
async function getPublishedGalleryImages(category) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq2(galleryImages.published, true)];
  if (category) {
    conditions.push(eq2(galleryImages.category, category));
  }
  return db.select().from(galleryImages).where(and(...conditions)).orderBy(galleryImages.order);
}
async function createGalleryImage(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(galleryImages).values(data);
}
async function updateGalleryImage(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(galleryImages).set(data).where(eq2(galleryImages.id, id));
}
async function getPublishedDocuments(category) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq2(documents.published, true)];
  if (category) {
    conditions.push(eq2(documents.category, category));
  }
  return db.select().from(documents).where(and(...conditions)).orderBy(desc(documents.createdAt));
}
async function createDocument(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(documents).values(data);
}
async function updateDocument(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(documents).set(data).where(eq2(documents.id, id));
}
async function createMembership(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(memberships).values(data);
}
async function getPendingMemberships() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(memberships).where(eq2(memberships.status, "pending")).orderBy(desc(memberships.createdAt));
}
async function updateMembershipStatus(id, status) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(memberships).set({ status }).where(eq2(memberships.id, id));
}
async function createVolunteerApplication(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(volunteerApplications).values(data);
}
async function getPendingVolunteerApplications() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(volunteerApplications).where(eq2(volunteerApplications.status, "pending")).orderBy(desc(volunteerApplications.createdAt));
}
async function updateVolunteerApplicationStatus(id, status) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(volunteerApplications).set({ status }).where(eq2(volunteerApplications.id, id));
}
async function createComplaint(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(complaints).values(data);
}
async function getComplaintByReferenceNumber(refNumber) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(complaints).where(eq2(complaints.referenceNumber, refNumber)).limit(1);
  return result[0] || null;
}
async function getNewComplaints() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(complaints).where(eq2(complaints.status, "new")).orderBy(desc(complaints.createdAt));
}
async function updateComplaintStatus(id, status) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(complaints).set({ status }).where(eq2(complaints.id, id));
}
async function createContactSubmission(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(contactSubmissions).values(data);
}
async function getNewContactSubmissions() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactSubmissions).where(eq2(contactSubmissions.status, "new")).orderBy(desc(contactSubmissions.createdAt));
}
async function updateContactSubmissionStatus(id, status) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contactSubmissions).set({ status }).where(eq2(contactSubmissions.id, id));
}
async function getStatistic(key) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(statistics).where(eq2(statistics.key, key)).limit(1);
  return result[0] || null;
}
async function updateStatistic(key, value) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getStatistic(key);
  if (existing) {
    await db.update(statistics).set({ value }).where(eq2(statistics.key, key));
  } else {
    await db.insert(statistics).values({ key, value });
  }
}
async function getAllStatistics() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(statistics);
}

// server/routers/cms.ts
var cmsRouter = router({
  /**
   * NEWS ENDPOINTS
   */
  news: router({
    list: publicProcedure.query(() => getPublishedNews(20)),
    getBySlug: publicProcedure.input(z2.object({ slug: z2.string() })).query(({ input }) => getNewsBySlug(input.slug)),
    create: protectedProcedure.input(
      z2.object({
        title: z2.string(),
        slug: z2.string(),
        excerpt: z2.string().optional(),
        content: z2.string(),
        category: z2.string(),
        imageUrl: z2.string().optional(),
        author: z2.string().optional(),
        published: z2.boolean().optional()
      })
    ).mutation(({ input }) => createNews(input)),
    update: protectedProcedure.input(
      z2.object({
        id: z2.number(),
        data: z2.object({
          title: z2.string().optional(),
          slug: z2.string().optional(),
          excerpt: z2.string().optional(),
          content: z2.string().optional(),
          category: z2.string().optional(),
          imageUrl: z2.string().optional(),
          author: z2.string().optional(),
          published: z2.boolean().optional()
        })
      })
    ).mutation(({ input }) => updateNews(input.id, input.data)),
    delete: protectedProcedure.input(z2.object({ id: z2.number() })).mutation(({ input }) => deleteNews(input.id))
  }),
  /**
   * PROJECTS ENDPOINTS
   */
  projects: router({
    list: publicProcedure.query(() => getPublishedProjects(20)),
    getBySlug: publicProcedure.input(z2.object({ slug: z2.string() })).query(({ input }) => getProjectBySlug(input.slug)),
    create: protectedProcedure.input(
      z2.object({
        title: z2.string(),
        slug: z2.string(),
        description: z2.string(),
        details: z2.string().optional(),
        category: z2.string(),
        imageUrl: z2.string().optional(),
        progress: z2.number().optional(),
        startDate: z2.date().optional(),
        endDate: z2.date().optional(),
        budget: z2.string().optional(),
        status: z2.enum(["planned", "ongoing", "completed", "paused"]).optional(),
        published: z2.boolean().optional()
      })
    ).mutation(({ input }) => createProject(input)),
    update: protectedProcedure.input(
      z2.object({
        id: z2.number(),
        data: z2.object({
          title: z2.string().optional(),
          description: z2.string().optional(),
          progress: z2.number().optional(),
          status: z2.enum(["planned", "ongoing", "completed", "paused"]).optional(),
          published: z2.boolean().optional()
        })
      })
    ).mutation(({ input }) => updateProject(input.id, input.data))
  }),
  /**
   * EVENTS ENDPOINTS
   */
  events: router({
    list: publicProcedure.query(() => getPublishedEvents(20)),
    getBySlug: publicProcedure.input(z2.object({ slug: z2.string() })).query(({ input }) => getEventBySlug(input.slug)),
    create: protectedProcedure.input(
      z2.object({
        title: z2.string(),
        slug: z2.string(),
        description: z2.string(),
        details: z2.string().optional(),
        category: z2.string(),
        imageUrl: z2.string().optional(),
        location: z2.string(),
        startDate: z2.date(),
        endDate: z2.date().optional(),
        time: z2.string().optional(),
        expectedAttendees: z2.number().optional(),
        published: z2.boolean().optional()
      })
    ).mutation(({ input }) => createEvent(input)),
    update: protectedProcedure.input(
      z2.object({
        id: z2.number(),
        data: z2.object({
          title: z2.string().optional(),
          description: z2.string().optional(),
          actualAttendees: z2.number().optional(),
          published: z2.boolean().optional()
        })
      })
    ).mutation(({ input }) => updateEvent(input.id, input.data))
  }),
  /**
   * BOARD MEMBERS ENDPOINTS
   */
  boardMembers: router({
    list: publicProcedure.query(() => getPublishedBoardMembers()),
    create: protectedProcedure.input(
      z2.object({
        name: z2.string(),
        position: z2.string(),
        email: z2.string().optional(),
        phone: z2.string().optional(),
        bio: z2.string().optional(),
        imageUrl: z2.string().optional(),
        order: z2.number().optional(),
        published: z2.boolean().optional()
      })
    ).mutation(({ input }) => createBoardMember(input)),
    update: protectedProcedure.input(
      z2.object({
        id: z2.number(),
        data: z2.object({
          name: z2.string().optional(),
          position: z2.string().optional(),
          bio: z2.string().optional(),
          order: z2.number().optional(),
          published: z2.boolean().optional()
        })
      })
    ).mutation(({ input }) => updateBoardMember(input.id, input.data))
  }),
  /**
   * GALLERY ENDPOINTS
   */
  gallery: router({
    list: publicProcedure.input(z2.object({ category: z2.string().optional() })).query(({ input }) => getPublishedGalleryImages(input.category)),
    create: protectedProcedure.input(
      z2.object({
        title: z2.string(),
        description: z2.string().optional(),
        imageUrl: z2.string(),
        category: z2.string(),
        order: z2.number().optional(),
        published: z2.boolean().optional()
      })
    ).mutation(({ input }) => createGalleryImage(input)),
    update: protectedProcedure.input(
      z2.object({
        id: z2.number(),
        data: z2.object({
          title: z2.string().optional(),
          order: z2.number().optional(),
          published: z2.boolean().optional()
        })
      })
    ).mutation(({ input }) => updateGalleryImage(input.id, input.data))
  }),
  /**
   * DOCUMENTS ENDPOINTS
   */
  documents: router({
    list: publicProcedure.input(z2.object({ category: z2.string().optional() })).query(({ input }) => getPublishedDocuments(input.category)),
    create: protectedProcedure.input(
      z2.object({
        title: z2.string(),
        description: z2.string().optional(),
        category: z2.string(),
        fileUrl: z2.string(),
        fileType: z2.string().optional(),
        fileSize: z2.number().optional(),
        published: z2.boolean().optional()
      })
    ).mutation(({ input }) => createDocument(input)),
    update: protectedProcedure.input(
      z2.object({
        id: z2.number(),
        data: z2.object({
          title: z2.string().optional(),
          published: z2.boolean().optional()
        })
      })
    ).mutation(({ input }) => updateDocument(input.id, input.data))
  }),
  /**
   * MEMBERSHIPS ENDPOINTS
   */
  memberships: router({
    create: publicProcedure.input(
      z2.object({
        fullName: z2.string(),
        email: z2.string().email(),
        phone: z2.string(),
        address: z2.string().optional(),
        occupation: z2.string().optional()
      })
    ).mutation(({ input }) => createMembership(input)),
    getPending: protectedProcedure.query(() => getPendingMemberships()),
    updateStatus: protectedProcedure.input(z2.object({ id: z2.number(), status: z2.string() })).mutation(({ input }) => updateMembershipStatus(input.id, input.status))
  }),
  /**
   * VOLUNTEER APPLICATIONS ENDPOINTS
   */
  volunteers: router({
    create: publicProcedure.input(
      z2.object({
        fullName: z2.string(),
        email: z2.string().email(),
        phone: z2.string(),
        skills: z2.string().optional(),
        availability: z2.string().optional(),
        interests: z2.array(z2.string()).optional()
      })
    ).mutation(({ input }) => createVolunteerApplication(input)),
    getPending: protectedProcedure.query(() => getPendingVolunteerApplications()),
    updateStatus: protectedProcedure.input(z2.object({ id: z2.number(), status: z2.string() })).mutation(({ input }) => updateVolunteerApplicationStatus(input.id, input.status))
  }),
  /**
   * COMPLAINTS ENDPOINTS
   */
  complaints: router({
    create: publicProcedure.input(
      z2.object({
        fullName: z2.string(),
        email: z2.string().email(),
        phone: z2.string(),
        complaintType: z2.string(),
        description: z2.string(),
        additionalNotes: z2.string().optional()
      })
    ).mutation(({ input }) => createComplaint(input)),
    getNew: protectedProcedure.query(() => getNewComplaints()),
    updateStatus: protectedProcedure.input(z2.object({ id: z2.number(), status: z2.string() })).mutation(({ input }) => updateComplaintStatus(input.id, input.status))
  }),
  /**
   * CONTACT SUBMISSIONS ENDPOINTS
   */
  contact: router({
    create: publicProcedure.input(
      z2.object({
        fullName: z2.string(),
        email: z2.string().email(),
        phone: z2.string().optional(),
        subject: z2.string(),
        message: z2.string()
      })
    ).mutation(({ input }) => createContactSubmission(input)),
    getNew: protectedProcedure.query(() => getNewContactSubmissions()),
    updateStatus: protectedProcedure.input(z2.object({ id: z2.number(), status: z2.string() })).mutation(({ input }) => updateContactSubmissionStatus(input.id, input.status))
  }),
  /**
   * STATISTICS ENDPOINTS
   */
  statistics: router({
    getAll: publicProcedure.query(() => getAllStatistics()),
    get: publicProcedure.input(z2.object({ key: z2.string() })).query(({ input }) => getStatistic(input.key)),
    update: protectedProcedure.input(z2.object({ key: z2.string(), value: z2.number() })).mutation(({ input }) => updateStatistic(input.key, input.value))
  })
});

// server/routers/forms.ts
import { z as z3 } from "zod";

// server/email.ts
async function sendAdminNotification(data) {
  try {
    const result = await notifyOwner({
      title: data.subject,
      content: data.content
    });
    return result;
  } catch (error) {
    console.error("[Email Service] Failed to send notification:", error);
    return false;
  }
}
async function sendMembershipConfirmation(name, email, membershipNumber) {
  const content = `
\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0637\u0644\u0628 \u0639\u0636\u0648\u064A\u062A\u0643 \u0641\u064A \u062C\u0645\u0639\u064A\u0629 \u062D\u064A \u0633\u064A\u062F\u064A \u062E\u0644\u064A\u0641\u0629 \u0627\u0644\u0642\u0627\u062F\u0631\u064A
\u0627\u0644\u0627\u0633\u0645: ${name}
\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A: ${email}
${membershipNumber ? `\u0631\u0642\u0645 \u0627\u0644\u0639\u0636\u0648\u064A\u0629: ${membershipNumber}` : ""}

\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0642\u0631\u064A\u0628\u0627\u064B \u0644\u062A\u0623\u0643\u064A\u062F \u0637\u0644\u0628\u0643.
  `;
  return sendAdminNotification({
    subject: `\u0637\u0644\u0628 \u0639\u0636\u0648\u064A\u0629 \u062C\u062F\u064A\u062F \u0645\u0646 ${name}`,
    content
  });
}
async function sendVolunteerConfirmation(name, email, referenceNumber) {
  const content = `
\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0637\u0644\u0628 \u0627\u0644\u062A\u0637\u0648\u0639 \u0627\u0644\u062E\u0627\u0635 \u0628\u0643
\u0627\u0644\u0627\u0633\u0645: ${name}
\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A: ${email}
${referenceNumber ? `\u0631\u0642\u0645 \u0627\u0644\u0645\u0631\u062C\u0639: ${referenceNumber}` : ""}

\u0634\u0643\u0631\u0627\u064B \u0644\u0627\u0647\u062A\u0645\u0627\u0645\u0643 \u0628\u0627\u0644\u062A\u0637\u0648\u0639 \u0645\u0639\u0646\u0627. \u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0642\u0631\u064A\u0628\u0627\u064B.
  `;
  return sendAdminNotification({
    subject: `\u0637\u0644\u0628 \u062A\u0637\u0648\u0639 \u062C\u062F\u064A\u062F \u0645\u0646 ${name}`,
    content
  });
}
async function sendComplaintConfirmation(name, email, complaintType, referenceNumber) {
  const content = `
\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0634\u0643\u0627\u064A\u062A\u0643/\u0627\u0642\u062A\u0631\u0627\u062D\u0643
\u0627\u0644\u0627\u0633\u0645: ${name}
\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A: ${email}
\u0646\u0648\u0639 \u0627\u0644\u0634\u0643\u0648\u0649: ${complaintType}
${referenceNumber ? `\u0631\u0642\u0645 \u0627\u0644\u0645\u0631\u062C\u0639: ${referenceNumber}` : ""}

\u0634\u0643\u0631\u0627\u064B \u0644\u0645\u0633\u0627\u0647\u0645\u062A\u0643 \u0641\u064A \u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u062D\u064A. \u0633\u064A\u062A\u0645 \u0627\u0644\u0646\u0638\u0631 \u0641\u064A \u0637\u0644\u0628\u0643 \u0642\u0631\u064A\u0628\u0627\u064B.
  `;
  return sendAdminNotification({
    subject: `\u0634\u0643\u0648\u0649/\u0627\u0642\u062A\u0631\u0627\u062D \u062C\u062F\u064A\u062F \u0645\u0646 ${name}`,
    content
  });
}
async function sendContactConfirmation(name, email, subject) {
  const content = `
\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0631\u0633\u0627\u0644\u062A\u0643
\u0627\u0644\u0627\u0633\u0645: ${name}
\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A: ${email}
\u0627\u0644\u0645\u0648\u0636\u0648\u0639: ${subject}

\u0634\u0643\u0631\u0627\u064B \u0644\u062A\u0648\u0627\u0635\u0644\u0643 \u0645\u0639\u0646\u0627. \u0633\u0646\u0631\u062F \u0639\u0644\u064A\u0643 \u0641\u064A \u0623\u0642\u0631\u0628 \u0648\u0642\u062A.
  `;
  return sendAdminNotification({
    subject: `\u0631\u0633\u0627\u0644\u0629 \u062C\u062F\u064A\u062F\u0629 \u0645\u0646 ${name}`,
    content
  });
}

// server/utils.ts
function generateReferenceNumber(prefix) {
  const date = /* @__PURE__ */ new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 1e5).toString().padStart(5, "0");
  return `${prefix}-${dateStr}-${random}`;
}

// server/routers/forms.ts
var formsRouter = router({
  /**
   * Membership Application
   */
  submitMembership: publicProcedure.input(
    z3.object({
      fullName: z3.string().min(2, "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 \u0645\u0637\u0644\u0648\u0628"),
      email: z3.string().email("\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u063A\u064A\u0631 \u0635\u062D\u064A\u062D"),
      phone: z3.string().min(7, "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D"),
      address: z3.string().optional(),
      occupation: z3.string().optional()
    })
  ).mutation(async ({ input }) => {
    try {
      await createMembership({
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        address: input.address,
        occupation: input.occupation,
        status: "pending"
      });
      await sendMembershipConfirmation(input.fullName, input.email);
      return {
        success: true,
        message: "\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0637\u0644\u0628 \u0639\u0636\u0648\u064A\u062A\u0643 \u0628\u0646\u062C\u0627\u062D. \u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0642\u0631\u064A\u0628\u0627\u064B."
      };
    } catch (error) {
      console.error("[Forms] Membership submission error:", error);
      return {
        success: false,
        message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0637\u0644\u0628\u0643. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B."
      };
    }
  }),
  /**
   * Volunteer Application
   */
  submitVolunteer: publicProcedure.input(
    z3.object({
      fullName: z3.string().min(2, "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 \u0645\u0637\u0644\u0648\u0628"),
      email: z3.string().email("\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u063A\u064A\u0631 \u0635\u062D\u064A\u062D"),
      phone: z3.string().min(7, "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D"),
      skills: z3.string().optional(),
      availability: z3.string().optional(),
      interests: z3.array(z3.string()).optional()
    })
  ).mutation(async ({ input }) => {
    try {
      const referenceNumber = generateReferenceNumber("VOL");
      await createVolunteerApplication({
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        skills: input.skills,
        availability: input.availability,
        interests: input.interests,
        status: "pending",
        referenceNumber
      });
      await sendVolunteerConfirmation(input.fullName, input.email, referenceNumber);
      return {
        success: true,
        message: `\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0637\u0644\u0628 \u0627\u0644\u062A\u0637\u0648\u0639 \u0628\u0646\u062C\u0627\u062D. \u0631\u0642\u0645 \u0627\u0644\u0645\u0631\u062C\u0639: ${referenceNumber}`,
        referenceNumber
      };
    } catch (error) {
      console.error("[Forms] Volunteer submission error:", error);
      return {
        success: false,
        message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0637\u0644\u0628\u0643. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B."
      };
    }
  }),
  /**
   * Complaint/Suggestion Submission
   */
  submitComplaint: publicProcedure.input(
    z3.object({
      fullName: z3.string().min(2, "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 \u0645\u0637\u0644\u0648\u0628"),
      email: z3.string().email("\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u063A\u064A\u0631 \u0635\u062D\u064A\u062D"),
      phone: z3.string().min(7, "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D"),
      complaintType: z3.string().min(1, "\u0646\u0648\u0639 \u0627\u0644\u0634\u0643\u0648\u0649 \u0645\u0637\u0644\u0648\u0628"),
      description: z3.string().min(10, "\u0627\u0644\u0648\u0635\u0641 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 10 \u0623\u062D\u0631\u0641"),
      additionalNotes: z3.string().optional()
    })
  ).mutation(async ({ input }) => {
    try {
      const referenceNumber = generateReferenceNumber("CMP");
      await createComplaint({
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        complaintType: input.complaintType,
        description: input.description,
        additionalNotes: input.additionalNotes,
        status: "new",
        referenceNumber,
        priority: "medium"
      });
      await sendComplaintConfirmation(
        input.fullName,
        input.email,
        input.complaintType,
        referenceNumber
      );
      return {
        success: true,
        message: `\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0634\u0643\u0627\u064A\u062A\u0643/\u0627\u0642\u062A\u0631\u0627\u062D\u0643 \u0628\u0646\u062C\u0627\u062D. \u0631\u0642\u0645 \u0627\u0644\u0645\u0631\u062C\u0639: ${referenceNumber}`,
        referenceNumber
      };
    } catch (error) {
      console.error("[Forms] Complaint submission error:", error);
      return {
        success: false,
        message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0637\u0644\u0628\u0643. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B."
      };
    }
  }),
  /**
   * Contact Form Submission
   */
  submitContact: publicProcedure.input(
    z3.object({
      fullName: z3.string().min(2, "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 \u0645\u0637\u0644\u0648\u0628"),
      email: z3.string().email("\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u063A\u064A\u0631 \u0635\u062D\u064A\u062D"),
      phone: z3.string().optional(),
      subject: z3.string().min(3, "\u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0645\u0637\u0644\u0648\u0628"),
      message: z3.string().min(10, "\u0627\u0644\u0631\u0633\u0627\u0644\u0629 \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 10 \u0623\u062D\u0631\u0641")
    })
  ).mutation(async ({ input }) => {
    try {
      await createContactSubmission({
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        subject: input.subject,
        message: input.message,
        status: "new"
      });
      await sendContactConfirmation(input.fullName, input.email, input.subject);
      return {
        success: true,
        message: "\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0631\u0633\u0627\u0644\u062A\u0643 \u0628\u0646\u062C\u0627\u062D. \u0633\u0646\u0631\u062F \u0639\u0644\u064A\u0643 \u0642\u0631\u064A\u0628\u0627\u064B."
      };
    } catch (error) {
      console.error("[Forms] Contact submission error:", error);
      return {
        success: false,
        message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0637\u0644\u0628\u0643. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B."
      };
    }
  }),
  /**
   * Track complaint status
   */
  trackComplaint: publicProcedure.input(z3.object({ referenceNumber: z3.string() })).query(async ({ input }) => {
    try {
      const complaint = await getComplaintByReferenceNumber(input.referenceNumber);
      if (!complaint) {
        return {
          found: false,
          message: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0634\u0643\u0648\u0649 \u0628\u0631\u0642\u0645 \u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0645\u062F\u062E\u0644"
        };
      }
      const statusAr = {
        new: "\u062C\u062F\u064A\u062F\u0629",
        reviewed: "\u062A\u0645 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",
        in_progress: "\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629",
        resolved: "\u062A\u0645 \u062D\u0644\u0647\u0627",
        closed: "\u0645\u063A\u0644\u0642\u0629"
      };
      return {
        found: true,
        referenceNumber: complaint.referenceNumber,
        status: statusAr[complaint.status] || complaint.status,
        description: complaint.description,
        createdAt: complaint.createdAt,
        updatedAt: complaint.updatedAt
      };
    } catch (error) {
      console.error("[Forms] Track complaint error:", error);
      return {
        found: false,
        message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u0634\u0643\u0648\u0649"
      };
    }
  })
});

// server/routers.ts
var appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  cms: cmsRouter,
  forms: formsRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true
      };
    })
  })
  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/vite.ts
import express from "express";
import fs2 from "fs";
import { nanoid } from "nanoid";
import path2 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
var PROJECT_ROOT = import.meta.dirname;
var LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
var MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024;
var TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6);
function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}
function trimLogFile(logPath, maxSize) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }
    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines = [];
    let keptBytes = 0;
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}
`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }
    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
  }
}
function writeToLogFile(source, entries) {
  if (entries.length === 0) return;
  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);
  const lines = entries.map((entry) => {
    const ts = (/* @__PURE__ */ new Date()).toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });
  fs.appendFileSync(logPath, `${lines.join("\n")}
`, "utf-8");
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}
function vitePluginManusDebugCollector() {
  return {
    name: "manus-debug-collector",
    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true
            },
            injectTo: "head"
          }
        ]
      };
    },
    configureServer(server) {
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }
        const handlePayload = (payload) => {
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };
        const reqBody = req.body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    }
  };
}
var plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), vitePluginManusDebugCollector()];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path2.resolve(import.meta.dirname, "../..", "dist", "public") : path2.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/_core/index.ts
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const app = express2();
  const server = createServer(app);
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
