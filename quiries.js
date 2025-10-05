// Basic Queries
db.books.find({ genre: "Fiction" })
db.books.find({ published_year: { $gt: 1950 } })
db.books.find({ author: "George Orwell" })
db.books.updateOne({ title: "1984" }, { $set: { price: 12.99 } })
db.books.deleteOne({ title: "Brave New World" })

// Advanced Queries
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })
db.books.find().sort({ price: 1 }) // Ascending
db.books.find().sort({ price: -1 }) // Descending
db.books.find().limit(5).skip(0) // Page 1
db.books.find().limit(5).skip(5) // Page 2

// Aggregation Pipelines
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $concat: [{ $toString: { $multiply: ["$_id", 10] } }, "s"] },
      count: 1,
      _id: 0
    }
  }
])

// Indexing
db.books.createIndex({ title: 1 })
db.books.createIndex({ author: 1, published_year: -1 })
db.books.find({ title: "1984" }).explain("executionStats")
