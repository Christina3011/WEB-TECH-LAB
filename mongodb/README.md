# Experiment 10: MongoDB Shell

The experiment script creates and uses the `artGalleryDB` database. It creates
the `artworks` and `contactMessages` collections without dropping existing
data, and demonstrates the MongoDB operations with Art Gallery examples.

## Run the shell experiment

Start a local MongoDB server, then run this from the project directory:

```powershell
mongosh "mongodb://127.0.0.1:27017" --file mongodb/experiment10.mongodb.js
```

For the interactive shell concepts, enter `show dbs`, then `use artGalleryDB`,
and `show collections`. The script uses `db.getSiblingDB("artGalleryDB")`, the
equivalent database selection that works in a mongosh script file.

The sample artwork IDs are checked before insertion, so rerunning the script
does not add duplicate sample documents. Its delete examples only remove
temporary records created for that particular run.

## Connect the Express website

Set `MONGODB_URI` in the same PowerShell window used to start the site:

```powershell
$env:MONGODB_URI = "mongodb://127.0.0.1:27017"
npm start
```

The backend uses the `artGalleryDB` database. `GET /api/artworks` reads artwork
documents and optionally accepts a category, for example
`/api/artworks?category=Paintings`. Valid contact form submissions are saved
to `contactMessages`. If the URI is not set or MongoDB cannot be reached, the
site still starts, while those database endpoints return an explicit service
unavailable response.
