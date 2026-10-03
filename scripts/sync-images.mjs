import pg from "pg"

const { Client } = pg

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

async function run() {
  await client.connect()
  console.log("Connected to PostgreSQL database...")

  await client.query(
    "UPDATE services SET image_url = $1 WHERE slug = $2",
    ["/assets/office_glass_partition.jpg", "commercial-glass-partitions"]
  )
  await client.query(
    "UPDATE categories SET image_url = $1 WHERE slug = $2",
    ["/assets/office_glass_partition.jpg", "commercial-glass-work"]
  )
  console.log("Updated commercial-glass-partitions & commercial-glass-work in DB!")

  await client.end()
  console.log("Finished!")
}

run().catch((e) => {
  console.error("Error updating DB:", e)
  client.end()
  process.exit(1)
})
