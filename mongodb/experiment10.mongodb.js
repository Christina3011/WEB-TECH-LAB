// Experiment 10: MongoDB Shell operations for the Art Gallery.
// In mongosh, first run: show dbs
// Select the database with: use artGalleryDB
// After running this script, list collections with: show collections
//
// Run this file with:
// mongosh "mongodb://127.0.0.1:27017" --file mongodb/experiment10.mongodb.js
//
// This script never drops a database or collection. Seed artwork IDs are
// checked before insertion, and delete demonstrations only remove documents
// created for that demonstration run.

print("1. Database and collection management");
print("show dbs (database list):");
printjson(db.adminCommand({ listDatabases: 1, nameOnly: true }));

// Script equivalent of the interactive mongosh command: use artGalleryDB
const galleryDb = db.getSiblingDB("artGalleryDB");
const collectionNames = galleryDb.getCollectionNames();

if (!collectionNames.includes("artworks")) {
    galleryDb.createCollection("artworks");
}

if (!collectionNames.includes("contactMessages")) {
    galleryDb.createCollection("contactMessages");
}

print("show collections:");
printjson(galleryDb.getCollectionNames());

const artworks = galleryDb.collection("artworks");

print("2. Indexing");
artworks.createIndex({ artwork_id: 1 }, { unique: true });
print("getIndexes():");
printjson(artworks.getIndexes());

print("3. Insertion with insertOne()");
const firstArtwork = {
    artwork_id: "PNT-001",
    title: "American Gothic",
    artist: "Grant Wood",
    category: "Paintings",
    year: 1930,
    medium: "Oil on beaverboard",
    description: "A carefully composed portrait of rural American life.",
    views: 0,
    tags: ["portrait", "American art"]
};

if (!artworks.findOne({ artwork_id: firstArtwork.artwork_id })) {
    printjson(artworks.insertOne(firstArtwork));
} else {
    print("PNT-001 already exists; leaving existing artwork unchanged.");
}

print("4. Insertion with insertMany()");
const sampleArtworks = [
    {
        artwork_id: "PNT-002",
        title: "The Starry Night",
        artist: "Vincent van Gogh",
        category: "Paintings",
        year: 1889,
        medium: "Oil on canvas",
        description: "A village beneath a swirling, luminous night sky.",
        views: 0,
        tags: ["landscape", "night"]
    },
    {
        artwork_id: "DGT-001",
        title: "Neon City",
        artist: "Art Gallery digital collection",
        category: "Digital Art",
        year: 2024,
        medium: "Digital illustration",
        description: "A glowing cityscape filled with vivid lights.",
        views: 0,
        tags: ["city", "digital"]
    },
    {
        artwork_id: "DGT-002",
        title: "Mandelbulb 3D",
        artist: "Mariagata1959",
        category: "Digital Art",
        year: 2018,
        medium: "Computer-generated fractal",
        description: "A computer-generated fractal with intricate repeating forms.",
        views: 0,
        tags: ["digital", "abstract"]
    },
    {
        artwork_id: "SCT-001",
        title: "David",
        artist: "Michelangelo",
        category: "Sculptures",
        year: 1504,
        medium: "Marble",
        description: "A monumental marble figure representing strength and focus.",
        views: 0,
        tags: ["marble", "figure"]
    },
    {
        artwork_id: "SCT-002",
        title: "Dynamic Mobile",
        artist: "Michal Klajban",
        category: "Sculptures",
        year: 2016,
        medium: "Steel",
        description: "A mobile sculpture balancing movement and form.",
        views: 0,
        tags: ["steel", "outdoor"]
    },
    {
        artwork_id: "PHO-001",
        title: "Afghan Girl",
        artist: "Steve McCurry",
        category: "Photography",
        year: 1984,
        medium: "Colour photograph",
        description: "A portrait remembered for its direct gaze and vivid colour.",
        views: 0,
        tags: ["portrait", "colour"]
    },
    {
        artwork_id: "PHO-002",
        title: "Earthrise",
        artist: "William Anders",
        category: "Photography",
        year: 1968,
        medium: "Space photograph",
        description: "A view of Earth from lunar orbit.",
        views: 0,
        tags: ["space", "landscape"]
    },
    {
        artwork_id: "MOD-001",
        title: "Guernica",
        artist: "Pablo Picasso",
        category: "Modern Art",
        year: 1937,
        medium: "Oil on canvas",
        description: "A monumental anti-war work conveying grief and protest.",
        views: 0,
        tags: ["modern", "anti-war"]
    },
    {
        artwork_id: "MOD-002",
        title: "Color Tale",
        artist: "Fons Heijnsbroek",
        category: "Modern Art",
        year: 2008,
        medium: "Watercolour on paper",
        description: "Green and yellow forms blend into an abstract composition.",
        views: 0,
        tags: ["modern", "abstract"]
    }
];

const missingArtworks = sampleArtworks.filter(function (artwork) {
    return !artworks.findOne({ artwork_id: artwork.artwork_id });
});

if (missingArtworks.length > 0) {
    printjson(artworks.insertMany(missingArtworks));
} else {
    print("All insertMany sample artworks already exist; leaving them unchanged.");
}

print("5. Read operations");
print("find():");
printjson(artworks.find().toArray());
print("findOne():");
printjson(artworks.findOne({ artwork_id: "PNT-001" }));
print("countDocuments():");
print(artworks.countDocuments());

print("6. Query operators");
print("Comparison operators $gte and $lt (artworks from 1900 through 1999):");
printjson(artworks.find({ year: { $gte: 1900, $lt: 2000 } }).toArray());
print("$or (Paintings or Modern Art):");
printjson(artworks.find({
    $or: [
        { category: "Paintings" },
        { category: "Modern Art" }
    ]
}).toArray());
print("Array matching (artworks tagged portrait):");
printjson(artworks.find({ tags: "portrait" }).toArray());

print("7. Projection");
printjson(artworks.find(
    {},
    { projection: { _id: 0, title: 1, artist: 1, category: 1 } }
).toArray());

print("8. Update operations");
print("updateOne() with $set and $inc:");
printjson(artworks.updateOne(
    { artwork_id: "PNT-001" },
    { $set: { medium: "Oil on board" }, $inc: { views: 1 } }
));
print("updateMany() with $set and $push:");
printjson(artworks.updateMany(
    { artwork_id: { $in: sampleArtworks.map(function (artwork) { return artwork.artwork_id; }) }, tags: { $ne: "experiment10" } },
    { $set: { experiment10Updated: true }, $push: { tags: "experiment10" } }
));

print("9. Delete operations (temporary demonstration documents only)");
const demoRunId = "experiment10-" + new Date().toISOString() + "-" + Math.random().toString(36).slice(2);
const deleteOneId = demoRunId + "-delete-one";
const deleteManyIds = [demoRunId + "-delete-many-1", demoRunId + "-delete-many-2"];

artworks.insertOne({
    artwork_id: deleteOneId,
    title: "Temporary deleteOne example",
    artist: "Experiment 10",
    category: "Modern Art",
    year: 2026,
    medium: "Demonstration record",
    description: "Temporary record created and removed by this script.",
    views: 0,
    tags: ["temporary"],
    experiment10DemoRun: demoRunId
});
printjson(artworks.deleteOne({ artwork_id: deleteOneId, experiment10DemoRun: demoRunId }));

artworks.insertMany(deleteManyIds.map(function (artworkId) {
    return {
        artwork_id: artworkId,
        title: "Temporary deleteMany example",
        artist: "Experiment 10",
        category: "Digital Art",
        year: 2026,
        medium: "Demonstration record",
        description: "Temporary record created and removed by this script.",
        views: 0,
        tags: ["temporary"],
        experiment10DemoRun: demoRunId
    };
}));
printjson(artworks.deleteMany({ experiment10DemoRun: demoRunId }));
