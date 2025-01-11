/**
 * Public routes
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/sign-in",
  "/wisata",
  "/umkm",
  "/blogs",
  "/blog/*", // Semua route di bawah /blog/
  "/umkm/*", // Semua route di bawah /umkm/
  "/wisata/*", // Semua route di bawah /wisata/
  "/peta-interaktif",
  "/api/blog",
  "/api/umkm",
  "/api/wisata",
];

export const authRoutes = ["/sign-in"];

export const apiAuthPrefix = "/api/auth";
