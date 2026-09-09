process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";

const admin = require("firebase-admin");

admin.initializeApp({
  projectId: "globalsped-next",
});

async function main() {
  const email = "as@fair-it.net";

  const user = await admin.auth().getUserByEmail(email);

  await admin.auth().setCustomUserClaims(user.uid, {
    admin: true,
    role: "admin",
  });

  console.log("Admin-Rechte gesetzt:", {
    uid: user.uid,
    email: user.email,
    claims: {
      admin: true,
      role: "admin",
    },
  });
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fehler:", error);

    process.exit(1);
  });
