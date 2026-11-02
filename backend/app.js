const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;
const frontendDirectory = path.join(__dirname, "..", "frontend");
const mongoUri = process.env.MONGODB_URI;
const mongoClient = mongoUri
    ? new MongoClient(mongoUri, { serverSelectionTimeoutMS: 3000 })
    : null;
let mongoConnection;

async function getGalleryDatabase() {
    if (!mongoClient) {
        return null;
    }

    if (!mongoConnection) {
        mongoConnection = mongoClient.connect().catch(function (error) {
            mongoConnection = null;
            throw error;
        });
    }

    await mongoConnection;
    return mongoClient.db("artGalleryDB");
}

const collections = [
    {
        name: "Paintings",
        description: "Stories, colour, and craft on canvas."
    },
    {
        name: "Digital Art",
        description: "Imagination shaped by new tools."
    },
    {
        name: "Sculptures",
        description: "Art that brings form into space."
    },
    {
        name: "Photography",
        description: "Remarkable moments, held in time."
    },
    {
        name: "Modern Art",
        description: "Fresh perspectives and fearless ideas."
    }
];

app.use(express.json());

function servePage(fileName) {
    return function (request, response, next) {
        response.sendFile(path.join(frontendDirectory, fileName), function (error) {
            if (error) {
                next(error);
            }
        });
    };
}

app.get("/", servePage("EX 1.html"));
app.get("/EX 1.html", servePage("EX 1.html"));
app.get("/EX%201.html", servePage("EX 1.html"));
app.get("/paintings.html", servePage("EX 1.html"));
app.get("/digital-art.html", servePage("EX 1.html"));
app.get("/sculptures.html", servePage("EX 1.html"));
app.get("/photography.html", servePage("EX 1.html"));
app.get("/modern-art.html", servePage("EX 1.html"));

app.get("/api/collections", function (request, response) {
    response.status(200).json(collections);
});

app.get("/api/artworks", async function (request, response, next) {
    try {
        const galleryDb = await getGalleryDatabase();

        if (!galleryDb) {
            return response.status(503).json({
                message: "Artwork storage is unavailable. Set MONGODB_URI to connect MongoDB."
            });
        }

        const query = {};
        if (typeof request.query.category === "string" && request.query.category.trim()) {
            query.category = request.query.category.trim();
        }

        const artworks = await galleryDb.collection("artworks")
            .find(query, { projection: { _id: 0 } })
            .toArray();
        response.status(200).json(artworks);
    } catch (error) {
        next(error);
    }
});

app.post("/api/contact", async function (request, response, next) {
    const body = request.body && typeof request.body === "object" ? request.body : {};
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const errors = {};

    if (name.length < 2) {
        errors.name = "Name must be at least 2 characters long.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please enter a valid email address.";
    }

    if (message.length < 10) {
        errors.message = "Message must be at least 10 characters long.";
    }

    if (Object.keys(errors).length > 0) {
        return response.status(400).json({
            message: "Please correct the contact details and try again.",
            errors: errors
        });
    }

    try {
        const galleryDb = await getGalleryDatabase();

        if (!galleryDb) {
            return response.status(503).json({
                message: "MongoDB is not configured, so your message was not saved."
            });
        }

        await galleryDb.collection("contactMessages").insertOne({
            name: name,
            email: email,
            message: message,
            submittedAt: new Date()
        });

        response.status(201).json({
            message: "Thank you! Your message has been received."
        });
    } catch (error) {
        next(error);
    }
});

app.use(express.static(frontendDirectory));

app.use(function (request, response) {
    response.status(404).send("Page not found.");
});

app.use(function (error, request, response, next) {
    if (response.headersSent) {
        return next(error);
    }

    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return response.status(400).json({
            message: "The request body must contain valid JSON."
        });
    }

    console.error(error);
    if (error.name === "MongoServerSelectionError" || error.name === "MongoNetworkError") {
        return response.status(503).json({
            message: "MongoDB is unavailable. Check the database server and MONGODB_URI."
        });
    }

    response.status(500).json({
        message: "An unexpected server error occurred."
    });
});

app.listen(port, function () {
    console.log("Art Gallery server is running at http://localhost:" + port);
});
